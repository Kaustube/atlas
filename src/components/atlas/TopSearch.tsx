import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { FEATURES, KIND_LABEL, type AtlasFeature } from "@/data/features";

export default function TopSearch({ onSelect }: { onSelect: (f: AtlasFeature) => void }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return FEATURES.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.type.toLowerCase().includes(q) ||
        (f.description && f.description.toLowerCase().includes(q)),
    ).slice(0, 6);
  }, [query]);

  // ⌘K / Ctrl+K focuses search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const select = (f: AtlasFeature) => {
    onSelect(f);
    setQuery("");
    inputRef.current?.blur();
  };

  const open = focused && results.length > 0;

  return (
    <div className="absolute left-1/2 top-6 z-30 w-[520px] -translate-x-1/2">
      <div className="atlas-input relative flex items-center gap-3 rounded-md px-4 py-2.5">
        <Search size={14} strokeWidth={1.5} className="shrink-0 text-muted-foreground" aria-hidden />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results[0]) select(results[0]);
            if (e.key === "Escape") inputRef.current?.blur();
          }}
          placeholder="Search peaks, rivers, glaciers, ranges — Kailash, Everest, Himalayas…"
          className="w-full bg-transparent text-[13px] outline-none"
          aria-label="Search geographical features"
        />
        <kbd className="atlas-label shrink-0 rounded-sm border border-border px-1.5 py-0.5 text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      {open && (
        <div className="atlas-panel mt-2 overflow-hidden rounded-md py-1">
          {results.map((f) => (
            <button
              key={f.id}
              type="button"
              // mouse-down so selection wins over the input blur
              onMouseDown={(e) => {
                e.preventDefault();
                select(f);
              }}
              className="flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors hover:bg-muted/60"
            >
              <span className="min-w-0">
                <span className="text-[13px] text-foreground">{f.name}</span>
                <span className="atlas-label ml-3 text-muted-foreground">
                  {KIND_LABEL[f.type] || f.type}
                </span>
              </span>
              <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                {f.lat.toFixed(2)}°, {f.lng.toFixed(2)}°
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
