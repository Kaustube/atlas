import {
  CloudSun,
  Compass,
  Globe2,
  Landmark,
  Layers3,
  Leaf,
  Mountain,
  Snowflake,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { AtlasFeature } from "@/data/features";

interface NavItem {
  label: string;
  icon: LucideIcon;
  type: string;
  description: string;
}

const NAV: NavItem[] = [
  { label: "All Places", icon: Compass, type: "all", description: "Explore everything" },
  { label: "Mountains", icon: Mountain, type: "mountain_peak", description: "Peaks and summits" },
  { label: "Rivers", icon: Waves, type: "river", description: "Major river systems" },
  { label: "Cities & Towns", icon: Landmark, type: "settlement", description: "Urban centers" },
  { label: "Glaciers", icon: Snowflake, type: "glacier", description: "Ice formations" },
  { label: "Protected Areas", icon: Leaf, type: "protected_area", description: "National parks" },
];

interface LeftNavProps {
  onNavigate: (feature: AtlasFeature) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function LeftNav({ onNavigate, activeCategory, onCategoryChange }: LeftNavProps) {
  return (
    <aside className="absolute inset-y-0 left-0 z-20 flex w-[264px] flex-col border-r border-border bg-background/80 backdrop-blur-md">
      {/* Branding */}
      <div className="px-6 pb-7 pt-8">
        <div className="font-display text-[27px] font-semibold leading-none tracking-[0.14em]">
          ATLAS
        </div>
        <div className="atlas-label mt-3 text-muted-foreground">
          Himalayan Geography
          <br />
          Visual Concept
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <div className="atlas-label mb-2 px-3 text-muted-foreground/70">Categories</div>
        <ul className="space-y-0.5">
          {NAV.map((item) => {
            const active = activeCategory === item.type;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-current={active ? "page" : undefined}
                  onClick={() => {
                    onCategoryChange(item.type);
                  }}
                  className={`group relative flex w-full items-center gap-3 border-l-2 px-3 py-2.5 text-left text-[13px] transition-all duration-200 ${
                    active
                      ? "border-accent bg-muted/50 text-foreground"
                      : "border-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground hover:border-muted-foreground/30"
                  }`}
                >
                  <item.icon size={16} strokeWidth={active ? 2 : 1.5} aria-hidden className="transition-all" />
                  <div className="flex-1">
                    <div className={active ? "font-medium" : ""}>{item.label}</div>
                    <div className="text-[10px] text-muted-foreground/60 mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Status readout */}
      <div className="border-t border-border px-6 py-4">
        <div className="atlas-label text-muted-foreground">View centre</div>
        <div className="mt-1.5 font-mono text-[10.5px] leading-relaxed text-glacier">
          28.0°N, 80.0°E
        </div>
        <div className="mt-3 atlas-label text-muted-foreground/70">
          Prototype 0.1 · Sample data
        </div>
      </div>
    </aside>
  );
}
