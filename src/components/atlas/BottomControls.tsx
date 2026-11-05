import type { GlobeLayers } from "@/components/globe/GlobeScene";

interface BottomControlsProps {
  style: "terrain" | "satellite";
  onStyle: (style: "terrain" | "satellite") => void;
  layers: GlobeLayers;
  onToggle: (key: keyof Omit<GlobeLayers, never>) => void;
}

type Control =
  | { type: "style"; key: "terrain" | "satellite"; label: string }
  | { type: "layer"; key: keyof GlobeLayers; label: string }
  | { type: "divider"; key: string };

const CONTROLS: Control[] = [
  { type: "style", key: "terrain", label: "Terrain" },
  { type: "style", key: "satellite", label: "Satellite" },
  { type: "divider", key: "d1" },
  { type: "layer", key: "borders", label: "Borders" },
  { type: "layer", key: "elevation", label: "Elevation" },
  { type: "layer", key: "grid", label: "Layers" },
];

export default function BottomControls({
  style,
  onStyle,
  layers,
  onToggle,
}: BottomControlsProps) {
  return (
    <div className="atlas-panel absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-stretch divide-x divide-border overflow-hidden rounded-md">
      {CONTROLS.map((c) => {
        if (c.type === "divider") {
          return <div key={c.key} className="w-px bg-foreground/10" aria-hidden />;
        }
        const active = c.type === "style" ? style === c.key : layers[c.key];
        return (
          <button
            key={c.key}
            type="button"
            aria-pressed={active}
            onClick={() => (c.type === "style" ? onStyle(c.key) : onToggle(c.key))}
            className={`atlas-label relative px-5 py-3 transition-colors ${
              active
                ? "text-accent"
                : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
            }`}
          >
            {c.label}
            <span
              className={`absolute inset-x-5 bottom-2 h-px transition-opacity ${
                active ? "bg-accent opacity-80" : "opacity-0"
              }`}
              aria-hidden
            />
          </button>
        );
      })}
    </div>
  );
}
