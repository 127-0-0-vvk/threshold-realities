import Link from "next/link";
import { tracker } from "@/lib/tracker";
import { levelMeta } from "@/lib/severity";
import { SeverityDot } from "./ui";

/** Horizontal ticker of live tracker state. Makes the site feel instrumented. */
export function SignalStrip() {
  const items = [...tracker].sort(
    (a, b) => levelMeta[b.level].rank - levelMeta[a.level].rank,
  );
  const doubled = [...items, ...items];

  return (
    <div className="marquee overflow-hidden border-y border-[var(--rule)] bg-ink/30 py-3">
      <div className="marquee-track flex w-max items-center gap-10">
        {doubled.map((entry, i) => (
          <Link
            key={`${entry.id}-${i}`}
            href={`/tracker#${entry.id}`}
            className="group flex shrink-0 items-center gap-3"
            aria-hidden={i >= items.length}
            tabIndex={i >= items.length ? -1 : undefined}
          >
            <SeverityDot level={entry.level} size={6} />
            <span className="mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-dim)] transition-colors group-hover:text-[var(--text)]">
              {entry.theatre}
            </span>
            <span
              className="mono text-[0.625rem] tracking-[0.14em] uppercase"
              style={{ color: levelMeta[entry.level].hex }}
            >
              {levelMeta[entry.level].label}
            </span>
            <span className="h-3 w-px bg-[var(--rule)]" aria-hidden />
          </Link>
        ))}
      </div>
    </div>
  );
}
