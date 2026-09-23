"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SeverityTag } from "@/components/ui";
import {
  reports,
  reportRegions,
  reportTypes,
  type ReportType,
} from "@/lib/reports";

export function ReportsIndex() {
  const [type, setType] = useState<ReportType | "All">("All");
  const [region, setRegion] = useState<string>("All");

  const filtered = useMemo(
    () =>
      reports
        .filter(
          (r) =>
            (type === "All" || r.type === type) &&
            (region === "All" || r.region === region),
        )
        .sort((a, b) => (a.date < b.date ? 1 : -1)),
    [type, region],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-3 border-y border-[var(--rule)] py-5">
        <span className="eyebrow mr-2">Type</span>
        {(["All", ...reportTypes] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            aria-pressed={type === t}
            className={`mono border px-3 py-1.5 text-[0.625rem] tracking-[0.14em] uppercase transition-colors ${
              type === t
                ? "border-[var(--color-watch)] text-[var(--color-watch)]"
                : "border-[var(--rule)] text-[var(--text-dim)] hover:border-[var(--text-faint)] hover:text-[var(--text)]"
            }`}
          >
            {t}
          </button>
        ))}

        <label className="ml-auto flex items-center gap-3">
          <span className="eyebrow">Region</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="mono border border-[var(--rule)] bg-transparent px-3 py-1.5 text-[0.625rem] tracking-[0.12em] uppercase text-[var(--text)] outline-none hover:border-[var(--color-watch)]"
          >
            {["All", ...reportRegions].map((r) => (
              <option key={r} value={r} className="bg-[var(--surface-raised)]">
                {r}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="divide-y divide-[var(--rule)]">
        {filtered.map((r) => (
          <Link
            key={r.slug}
            href={`/reports/${r.slug}`}
            className="group grid gap-5 py-10 transition-colors hover:bg-[var(--surface-raised)] lg:grid-cols-[1fr_1.6fr] lg:gap-14"
          >
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <span className="mono text-[0.625rem] tracking-[0.16em] uppercase text-[var(--color-watch)]">
                  {r.type}
                </span>
                <span className="mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
                  {r.category}
                </span>
              </div>
              <div className="mono mt-4 flex items-center gap-3 text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
                <span>{r.date}</span>
                <span aria-hidden>&middot;</span>
                <span>{r.region}</span>
                <span aria-hidden>&middot;</span>
                <span>{r.readTime} min</span>
              </div>
              {r.level ? (
                <div className="mt-4">
                  <SeverityTag level={r.level} />
                </div>
              ) : null}
            </div>

            <div>
              <h2 className="display text-3xl leading-tight transition-colors group-hover:text-[var(--color-watch)] sm:text-4xl">
                {r.title}
              </h2>
              <p className="prose-measure mt-4 text-[var(--text-dim)]">
                {r.standfirst}
              </p>
            </div>
          </Link>
        ))}

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-[var(--text-faint)]">
            Nothing published under these filters yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
