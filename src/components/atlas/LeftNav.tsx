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
  type?: string;
}

const NAV: NavItem[] = [
  { label: "Explore", icon: Compass, type: "all" },
  { label: "Geography", icon: Globe2, type: "geography" },
  { label: "Mountains", icon: Mountain, type: "mountain" },
  { label: "Rivers & Lakes", icon: Waves, type: "river" },
  { label: "Glaciers", icon: Snowflake, type: "glacier" },
  { label: "Geology", icon: Layers3, type: "geology" },
  { label: "Biodiversity", icon: Leaf, type: "biodiversity" },
  { label: "Climate", icon: CloudSun, type: "climate" },
  { label: "History & Culture", icon: Landmark, type: "culture" },
];

interface LeftNavProps {
  onNavigate: (feature: AtlasFeature) => void;
}

export default function LeftNav({ onNavigate }: LeftNavProps) {
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
        <div className="atlas-label mb-2 px-3 text-muted-foreground/70">Modules</div>
        <ul className="space-y-0.5">
          {NAV.map((item, i) => {
            const active = i === 0;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-current={active ? "page" : undefined}
                  onClick={() => {
                    // Trigger navigation - show first feature of this type
                    // For now, just trigger a dummy feature to show markers
                    onNavigate({
                      id: `nav-${item.type}`,
                      name: item.label,
                      type: item.type || 'all',
                      lat: 28.0,
                      lng: 80.0,
                      description: `Exploring ${item.label}`,
                      pin: false,
                    });
                  }}
                  className={`relative flex w-full items-center gap-3 border-l-2 px-3 py-2 text-left text-[13px] transition-colors ${
                    active
                      ? "border-accent bg-muted/50 text-foreground"
                      : "border-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                  }`}
                >
                  <item.icon size={15} strokeWidth={1.5} aria-hidden />
                  {item.label}
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
