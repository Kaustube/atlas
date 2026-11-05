import * as THREE from "three";

/**
 * Convert geographic latitude/longitude to a position on a three.js sphere
 * whose equirectangular texture is applied the way THREE.SphereGeometry maps
 * UVs (image left edge = -180°). Matches NASA Blue Marble imagery.
 */
export function latLngToVec3(lat: number, lng: number, r = 1): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

/** Damped approach factor, frame-rate independent. */
export function damp(dt: number, speed = 3.2): number {
  return 1 - Math.exp(-speed * dt);
}
