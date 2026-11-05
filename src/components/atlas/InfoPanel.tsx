import { ArrowRight } from "lucide-react";
import { FEATURES, KIND_LABEL, type AtlasFeature } from "@/data/features";

export default function InfoPanel({
  feature,
  onSelect,
}: {
  feature: AtlasFeature;
  onSelect: (f: AtlasFeature) => void;
}) {
  const elevation = feature.elevation ? `${feature.elevation} m` : '—'
  const coords = `${feature.lat.toFixed(4)}°N, ${feature.lng.toFixed(4)}°E`
  
  const rows: Array<[string, string]> = [
    ["Elevation", elevation],
    ["Coordinates", coords],
    ["Type", KIND_LABEL[feature.type] || feature.type],
  ];

  return (
    <aside className="atlas-panel atlas-scroll absolute bottom-28 right-6 top-6 z-20 w-[348px] overflow-y-auto rounded-md">
      {/* Header */}
      <header className="px-6 pb-5 pt-6">
        <div className="flex items-center justify-between">
          <span className="atlas-label text-accent">{KIND_LABEL[feature.type] || 'Feature'}</span>
          <span className="atlas-label text-muted-foreground">Profile</span>
        </div>
        <h2 className="font-display mt-3 text-[28px] font-medium leading-[1.15] text-foreground">
          {feature.name}
        </h2>
        {feature.description && (
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
            {feature.description}
          </p>
        )}
      </header>

      {/* Structured data */}
      <dl className="divide-y divide-border border-y border-border">
        {rows.map(([key, value]) => (
          <div key={key} className="flex items-baseline justify-between gap-5 px-6 py-3">
            <dt className="atlas-label shrink-0 pt-0.5 text-muted-foreground">{key}</dt>
            <dd className="text-right font-mono text-[11.5px] leading-relaxed text-foreground/90">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Overview */}
      {feature.description && (
        <section className="border-b border-border px-6 py-5">
          <h3 className="atlas-label text-muted-foreground">Overview</h3>
          <div className="mt-3">
            <p className="text-[13px] leading-[1.7] text-foreground/85">
              {feature.description}
            </p>
          </div>
        </section>
      )}

      {/* Related features */}
      {FEATURES.length > 0 && (
        <section className="border-b border-border px-6 py-5">
          <h3 className="atlas-label text-muted-foreground">Nearby features</h3>
          <div className="mt-2">
            {FEATURES.filter(f => f.id !== feature.id).slice(0, 5).map((rel) => (
              <button
                key={rel.id}
                type="button"
                onClick={() => onSelect(rel)}
                className="group flex w-full items-center justify-between gap-4 border-b border-border/60 py-2.5 text-left last:border-0 cursor-pointer"
              >
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-[13px] text-foreground group-hover:text-accent">
                    {rel.name}
                  </span>
                  <span className="mt-0.5 text-[11px] text-muted-foreground">
                    {KIND_LABEL[rel.type] || rel.type}
                  </span>
                </span>
                <ArrowRight
                  size={13}
                  strokeWidth={1.5}
                  className="shrink-0 text-muted-foreground transition-colors group-hover:text-accent"
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </section>
      )}

      <footer className="px-6 py-3">
        <span className="atlas-label text-muted-foreground/70">
          ATLAS Geographic Database · Verified Sources
        </span>
      </footer>
    </aside>
  );
}
