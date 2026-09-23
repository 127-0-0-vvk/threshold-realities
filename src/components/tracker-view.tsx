"use client";

import { useMemo, useState } from "react";
import { ChartMap } from "@/components/chart-map";
import { SeverityDot, SeverityTag, TrendTag } from "@/components/ui";
import { LEVELS, levelMeta, type Level } from "@/lib/severity";
import { regions, tracker } from "@/lib/tracker";

type Sort = "severity" | "updated" | "theatre";

export function TrackerView() {
  const [region, setRegion] = useState<string>("All");
  const [level, setLevel] = useState<Level | "All">("All");
  const [sort, setSort] = useState<Sort>("severity");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const rows = tracker.filter(
      (t) =>
        (region === "All" || t.region === region) &&
        (level === "All" || t.level === level),
    );
    return rows.sort((a, b) => {
      if (sort === "severity")
        return levelMeta[b.level].rank - levelMeta[a.level].rank;
      if (sort === "updated") return a.updated < b.updated ? 1 : -1;
      return a.theatre.localeCompare(b.theatre);
    });
  }, [region, level, sort]);

  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    LEVELS.forEach((l) => {
      out[l] = tracker.filter((t) => t.level === l).length;
    });
    return out;
  }, []);

  const active = filtered.find((f) => f.id === selected) ?? null;

  return (
    <div>
      {/* Level summary — the scale as a live readout */}
      <div className="grid gap-px border-y border-[var(--rule)] sm:grid-cols-5">
        {LEVELS.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLevel((v) => (v === l ? "All" : l))}
            aria-pressed={level === l}
            className={`group bg-[var(--surface-raised)] p-5 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--color-watch)_8%,var(--surface-raised))] ${
              level === l ? "bg-[color-mix(in_srgb,var(--color-watch)_12%,var(--surface-raised))]" : ""
            }`}
          >
            <div
              className="h-0.5 w-full transition-all duration-300"
              style={{
                background: `var(--color-${l})`,
                opacity: level === "All" || level === l ? 1 : 0.25,
              }}
            />
            <p className="display mt-4 text-4xl" style={{ color: `var(--color-${l})` }}>
              {counts[l]}
            </p>
            <p
              className="mono mt-1 text-[0.625rem] tracking-[0.16em] uppercase"
              style={{ color: `var(--color-${l})` }}
            >
              {levelMeta[l].label}
            </p>
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="border-b border-[var(--rule)] bg-[var(--surface-raised)] p-4 sm:p-8">
        <ChartMap
          entries={filtered}
          interactive
          selectedId={selected}
          onSelect={(id) => setSelected((v) => (v === id ? null : id))}
          className="mx-auto w-full max-w-[1200px]"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-[var(--rule)] py-5">
        <Filter
          label="Region"
          value={region}
          options={["All", ...regions]}
          onChange={setRegion}
        />
        <Filter
          label="Sort"
          value={sort}
          options={["severity", "updated", "theatre"]}
          onChange={(v) => setSort(v as Sort)}
        />
        {(region !== "All" || level !== "All") && (
          <button
            type="button"
            onClick={() => {
              setRegion("All");
              setLevel("All");
            }}
            className="mono text-[0.625rem] tracking-[0.16em] uppercase text-[var(--color-watch)] hover:underline"
          >
            Reset
          </button>
        )}
        <span className="mono ml-auto text-[0.625rem] tracking-[0.16em] uppercase text-[var(--text-faint)]">
          {filtered.length} of {tracker.length} theatres
        </span>
      </div>

      {/* Table */}
      <div className="divide-y divide-[var(--rule)]">
        {filtered.map((t) => {
          const isOpen = selected === t.id;
          return (
            <article key={t.id} id={t.id} className="scroll-mt-24">
              <button
                type="button"
                onClick={() => setSelected((v) => (v === t.id ? null : t.id))}
                aria-expanded={isOpen}
                className="grid w-full grid-cols-[auto_1fr] items-center gap-x-5 gap-y-2 py-5 text-left transition-colors hover:bg-[var(--surface-raised)] lg:grid-cols-[auto_2fr_1fr_1.2fr_auto] lg:gap-x-8"
              >
                <SeverityDot level={t.level} />
                <div>
                  <p className="text-[var(--text)]">{t.theatre}</p>
                  <p className="mono mt-0.5 text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)] lg:hidden">
                    {t.region} &middot; {levelMeta[t.level].label}
                  </p>
                </div>
                <span className="mono hidden text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)] lg:block">
                  {t.region}
                </span>
                <span className="col-start-2 hidden lg:col-start-auto lg:block">
                  <TrendTag trend={t.trend} />
                </span>
                <span className="mono hidden text-[0.625rem] tracking-[0.14em] text-[var(--text-faint)] lg:block">
                  {t.updated}
                </span>
              </button>

              <div
                className={`grid overflow-hidden transition-[grid-template-rows] duration-400 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-6 border-l-2 pb-8 pl-6 lg:grid-cols-[2fr_1fr]"
                    style={{ borderColor: `var(--color-${t.level})` }}
                  >
                    <div>
                      <SeverityTag level={t.level} />
                      <p className="mt-4 text-lg leading-relaxed text-[var(--text)]">
                        {t.headline}
                      </p>
                    </div>
                    <div>
                      <h3 className="eyebrow">Exposure</h3>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {t.exposure.map((e) => (
                          <li
                            key={e}
                            className="mono border border-[var(--rule)] px-2.5 py-1 text-[0.625rem] tracking-[0.12em] uppercase text-[var(--text-dim)]"
                          >
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-[var(--text-faint)]">
            No theatres match these filters.
          </p>
        ) : null}
      </div>

      <span className="sr-only" aria-live="polite">
        {active ? `${active.theatre} selected` : ""}
      </span>
    </div>
  );
}

function Filter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-3">
      <span className="eyebrow">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mono border border-[var(--rule)] bg-transparent px-3 py-1.5 text-[0.6875rem] tracking-[0.12em] uppercase text-[var(--text)] outline-none hover:border-[var(--color-watch)]"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[var(--surface-raised)]">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
