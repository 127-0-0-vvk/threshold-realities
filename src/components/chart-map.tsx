"use client";

import { useMemo, useState } from "react";
import { levelMeta } from "@/lib/severity";
import { tracker, type TrackerEntry } from "@/lib/tracker";

const W = 1000;
const H = 500;

/** Equirectangular projection. Honest about being a chart, not a globe. */
function project(lat: number, lon: number) {
  return {
    x: ((lon + 180) / 360) * W,
    y: ((90 - lat) / 180) * H,
  };
}

function Graticule() {
  const lines = [];
  for (let lon = -180; lon <= 180; lon += 20) {
    const { x } = project(0, lon);
    lines.push(
      <line
        key={`m${lon}`}
        x1={x}
        y1={0}
        x2={x}
        y2={H}
        stroke="currentColor"
        strokeWidth={lon === 0 ? 1 : 0.6}
        opacity={lon === 0 ? 0.95 : 0.45}
      />,
    );
  }
  for (let lat = -80; lat <= 80; lat += 20) {
    const { y } = project(lat, 0);
    lines.push(
      <line
        key={`p${lat}`}
        x1={0}
        y1={y}
        x2={W}
        y2={y}
        stroke="currentColor"
        strokeWidth={lat === 0 ? 1 : 0.6}
        opacity={lat === 0 ? 0.95 : 0.45}
      />,
    );
  }
  // Tropics + polar circles, dashed, as on a real chart
  [23.4, -23.4, 66.5, -66.5].forEach((lat) => {
    const { y } = project(lat, 0);
    lines.push(
      <line
        key={`t${lat}`}
        x1={0}
        y1={y}
        x2={W}
        y2={y}
        stroke="currentColor"
        strokeWidth={0.5}
        strokeDasharray="3 5"
        opacity={0.6}
      />,
    );
  });
  return <g style={{ color: "var(--color-graticule)" }}>{lines}</g>;
}

export function ChartMap({
  entries = tracker,
  interactive = false,
  onSelect,
  selectedId,
  className = "",
}: {
  entries?: TrackerEntry[];
  interactive?: boolean;
  onSelect?: (id: string) => void;
  selectedId?: string | null;
  className?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  const points = useMemo(
    () => entries.map((e) => ({ ...e, ...project(e.lat, e.lon) })),
    [entries],
  );

  const active = hovered ?? selectedId ?? null;
  const activeEntry = points.find((p) => p.id === active);

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full"
        role="img"
        aria-label="Chart of monitored theatres by severity"
      >
        <Graticule />

        {points.map((p, i) => {
          const c = `var(--color-${p.level})`;
          const isActive = active === p.id;
          return (
            <g
              key={p.id}
              transform={`translate(${p.x} ${p.y})`}
              className={interactive ? "cursor-pointer" : undefined}
              onMouseEnter={() => interactive && setHovered(p.id)}
              onMouseLeave={() => interactive && setHovered(null)}
              onClick={() => interactive && onSelect?.(p.id)}
              tabIndex={interactive ? 0 : undefined}
              role={interactive ? "button" : undefined}
              aria-label={interactive ? `${p.theatre} — ${levelMeta[p.level].label}` : undefined}
              onKeyDown={(e) => {
                if (interactive && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  onSelect?.(p.id);
                }
              }}
            >
              {/* generous invisible hit area */}
              {interactive ? <circle r={14} fill="transparent" /> : null}
              <circle
                className="pulse-ring"
                r={4}
                fill={c}
                style={{ animationDelay: `${(i % 7) * 0.45}s` }}
              />
              <circle r={isActive ? 5 : 3} fill={c} className="transition-all duration-200" />
              <circle
                r={isActive ? 10 : 7}
                fill="none"
                stroke={c}
                strokeWidth={0.7}
                opacity={isActive ? 0.9 : 0.35}
                className="transition-all duration-200"
              />
            </g>
          );
        })}
      </svg>

      {interactive && activeEntry ? (
        <div
          className="pointer-events-none absolute z-10 w-64 border bg-[var(--surface)]/95 p-3 backdrop-blur-sm"
          style={{
            left: `${(activeEntry.x / W) * 100}%`,
            top: `${(activeEntry.y / H) * 100}%`,
            transform: "translate(-50%, calc(-100% - 16px))",
            borderColor: `var(--color-${activeEntry.level})`,
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
              {activeEntry.region}
            </span>
            <span
              className="mono text-[0.625rem] tracking-[0.14em] uppercase"
              style={{ color: `var(--color-${activeEntry.level})` }}
            >
              {levelMeta[activeEntry.level].label}
            </span>
          </div>
          <p className="mt-1 text-sm leading-snug text-[var(--text)]">
            {activeEntry.theatre}
          </p>
        </div>
      ) : null}
    </div>
  );
}
