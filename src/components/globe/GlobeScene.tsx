import { Suspense, useEffect, useMemo, useRef } from "react";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  type ThreeEvent,
} from "@react-three/fiber";
import { Billboard, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import earthImg from "@/assets/earth-blue-marble.jpg";
import topoImg from "@/assets/earth-topology.png";
import { BORDERS } from "@/data/borders";
import { FEATURES, type AtlasFeature } from "@/data/features";
import { clamp, damp, latLngToVec3 } from "./geo";

export interface GlobeLayers {
  borders: boolean;
  elevation: boolean;
  grid: boolean;
}

interface GlobeSceneProps {
  selected: AtlasFeature;
  onSelect: (feature: AtlasFeature) => void;
  layers: GlobeLayers;
  style: "terrain" | "satellite";
  showMarkers?: boolean;
}

const GLOBE_R = 2;
const MIN_DIST = 4.1;
const MAX_DIST = 9.5;

/* ---------------- Camera rig: drag, wheel-zoom, animated targeting ---------------- */

function CameraRig({ target }: { target: AtlasFeature }) {
  const { camera, gl } = useThree();
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const state = useRef({ lat: target.lat, lng: target.lng, dist: 7.4 });
  const goal = useRef({ lat: target.lat, lng: target.lng, dist: 7.4 });

  // Pointer drag + wheel zoom on the canvas element.
  useEffect(() => {
    const el = gl.domElement;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const s = goal.current;
      const k = 0.16 * (s.dist / 7.4);
      s.lng = clamp(s.lng - (e.clientX - lastX) * k, -180, 180);
      s.lat = clamp(s.lat + (e.clientY - lastY) * k * 0.9, -85, 85);
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const up = () => {
      dragging = false;
    };
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      goal.current.dist = clamp(
        goal.current.dist * Math.exp(dy * 0.0012),
        MIN_DIST,
        MAX_DIST,
      );
    };

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("wheel", wheel, { passive: false });
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("wheel", wheel);
    };
  }, [gl]);

  // Animate toward the selected feature.
  useEffect(() => {
    goal.current.lat = target.lat;
    goal.current.lng = target.lng;
  }, [target.id, target.lat, target.lng]);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const s = state.current;
    const g = goal.current;
    const k = damp(dt);
    s.lat += (g.lat - s.lat) * k;
    s.lng += (g.lng - s.lng) * k;
    s.dist += (g.dist - s.dist) * k;

    camera.position.copy(latLngToVec3(s.lat, s.lng, s.dist));
    camera.lookAt(0, 0, 0);

    // Key light rides with the camera so the visible face is always lit.
    if (lightRef.current) {
      lightRef.current.position.copy(camera.position).multiplyScalar(1.3);
    }
  });

  return <directionalLight ref={lightRef} intensity={1.35} color="#fff3e4" />;
}

/* ---------------- Earth ---------------- */

function Earth({ layers, style }: { layers: GlobeLayers; style: "terrain" | "satellite" }) {
  const map = useLoader(THREE.TextureLoader, earthImg);
  const bump = useLoader(THREE.TextureLoader, topoImg);

  useMemo(() => {
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 16;
    bump.anisotropy = 16;
  }, [map, bump]);

  // Enhanced bump scale for better 3D effect
  const bumpScale = layers.elevation ? 0.12 : style === "terrain" ? 0.05 : 0.03;
  const tone =
    style === "terrain" ? new THREE.Color("#a8adb5") : new THREE.Color("#ffffff");

  return (
    <mesh>
      <sphereGeometry args={[GLOBE_R, 128, 128]} />
      <meshStandardMaterial
        map={map}
        bumpMap={bump}
        bumpScale={bumpScale}
        roughness={0.85}
        metalness={0.1}
        color={tone}
      />
    </mesh>
  );
}

/* ---------------- Atmosphere ---------------- */

function Atmosphere() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: {
          uColor: { value: new THREE.Color("#5a8fbb") },
        },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.5);
            gl_FragColor = vec4(uColor * intensity, intensity * 1.2);
          }
        `,
      }),
    [],
  );

  return (
    <mesh scale={1.18}>
      <sphereGeometry args={[GLOBE_R, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

/* ---------------- Country borders ---------------- */

function Borders({ visible }: { visible: boolean }) {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (const rings of Object.values(BORDERS)) {
      for (const ring of rings) {
        for (let i = 0; i < ring.length; i++) {
          const a = ring[i]!;
          const b = ring[(i + 1) % ring.length]!;
          points.push(latLngToVec3(a[1], a[0], GLOBE_R * 1.002));
          points.push(latLngToVec3(b[1], b[0], GLOBE_R * 1.002));
        }
      }
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  if (!visible) return null;
  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#93a8bb" transparent opacity={0.32} />
    </lineSegments>
  );
}

/* ---------------- Graticule ---------------- */

function graticuleCircle(lat: number, r: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let lng = -180; lng <= 180; lng += 4) pts.push(latLngToVec3(lat, lng, r));
  return pts;
}
function meridianCircle(lng: number, r: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let lat = -88; lat <= 88; lat += 4) pts.push(latLngToVec3(lat, lng, r));
  return pts;
}

function Graticule({ visible }: { visible: boolean }) {
  const { base, tropic } = useMemo(() => {
    const base: THREE.Vector3[] = [];
    for (const lat of [-60, -30, 0, 30, 60]) base.push(...graticuleCircle(lat, GLOBE_R * 1.001));
    for (let lng = -150; lng <= 180; lng += 30) base.push(...meridianCircle(lng, GLOBE_R * 1.001));
    const tropic = graticuleCircle(23.4366, GLOBE_R * 1.001);
    return { base: new THREE.BufferGeometry().setFromPoints(base), tropic: new THREE.BufferGeometry().setFromPoints(tropic) };
  }, []);

  if (!visible) return null;
  return (
    <group>
      <lineSegments geometry={base}>
        <lineBasicMaterial color="#7d90a3" transparent opacity={0.12} />
      </lineSegments>
      <lineSegments geometry={tropic}>
        <lineBasicMaterial color="#b3a179" transparent opacity={0.28} />
      </lineSegments>
    </group>
  );
}

/* ---------------- Feature markers ---------------- */

function Markers({
  selected,
  onSelect,
}: {
  selected: AtlasFeature;
  onSelect: (f: AtlasFeature) => void;
}) {
  const { camera } = useThree();
  const groupRefs = useRef<Record<string, THREE.Group | null>>({});
  const dir = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    // Hide markers on the far side of the globe.
    dir.copy(camera.position).normalize();
    for (const g of Object.values(groupRefs.current)) {
      if (!g) continue;
      const p = g.getWorldPosition(new THREE.Vector3()).normalize();
      g.visible = p.dot(dir) > 0.2;
    }
  });

  const pinned = FEATURES.filter((f) => f.pin);
  return (
    <group>
      {pinned.map((f) => {
        const pos = latLngToVec3(f.lat, f.lng, GLOBE_R * 1.008);
        const active = f.id === selected.id;
        return (
          <group key={f.id} position={pos} ref={(g) => (groupRefs.current[f.id] = g)}>
            <Billboard>
              <mesh
                onClick={(e: ThreeEvent<MouseEvent>) => {
                  e.stopPropagation();
                  onSelect(f);
                }}
              >
                <circleGeometry args={[0.03, 24]} />
                <meshBasicMaterial
                  color={active ? "#c9a35c" : "#e8ecf1"}
                  transparent
                  opacity={active ? 1 : 0.85}
                />
              </mesh>
              {active && (
                <mesh>
                  <ringGeometry args={[0.052, 0.062, 40]} />
                  <meshBasicMaterial color="#c9a35c" transparent opacity={0.9} />
                </mesh>
              )}
              {/* generous invisible hit target */}
              <mesh
                onClick={(e: ThreeEvent<MouseEvent>) => {
                  e.stopPropagation();
                  onSelect(f);
                }}
              >
                <circleGeometry args={[0.09, 16]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>
            </Billboard>
            <Html center style={{ transform: "translate(14px, -18px)" }}>
              <div
                className="atlas-globe-label"
                data-active={active}
                onClick={() => onSelect(f)}
              >
                {f.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

/* ---------------- Scene ---------------- */

export default function GlobeScene({ selected, onSelect, layers, style, showMarkers = false }: GlobeSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 z-0"
      data-scene-ready="false"
      aria-label="Interactive globe"
    >
      <Canvas
        camera={{ fov: 38, near: 0.1, far: 100, position: [0, 0, 7.4] }}
        dpr={[1, 2.5]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000814', 1);
          wrapperRef.current?.setAttribute("data-scene-ready", "true");
        }}
      >
        <CameraRig target={selected} />
        <ambientLight intensity={0.35} color="#8fa3b8" />
        <directionalLight position={[5, 3, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -3, -5]} intensity={0.3} color="#6d8296" />
        <Suspense fallback={null}>
          <Earth layers={layers} style={style} />
          <Atmosphere />
          <Borders visible={layers.borders} />
          <Graticule visible={layers.grid} />
          {showMarkers && <Markers selected={selected} onSelect={onSelect} />}
        </Suspense>
        <Stars
          radius={100}
          depth={50}
          count={1500}
          factor={2}
          saturation={0}
          fade
          speed={0.3}
        />
      </Canvas>
    </div>
  );
}

