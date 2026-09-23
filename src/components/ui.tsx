import Link from "next/link";
import { levelMeta, trendMeta, type Level, type Trend } from "@/lib/severity";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-4 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  surface,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  surface?: "ink";
  id?: string;
}) {
  return (
    <section
      id={id}
      data-surface={surface}
      className={`py-20 sm:py-28 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  className = "",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="display mt-5 text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
      {lede ? (
        <p className="prose-measure mt-6 text-lg text-[var(--text-dim)]">{lede}</p>
      ) : null}
    </div>
  );
}

export function SeverityDot({ level, size = 8 }: { level: Level; size?: number }) {
  return (
    <span
      className="inline-block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background: `var(--color-${level})`,
        boxShadow: `0 0 0 3px color-mix(in srgb, var(--color-${level}) 18%, transparent)`,
      }}
      aria-hidden
    />
  );
}

export function SeverityTag({ level }: { level: Level }) {
  return (
    <span className="inline-flex items-center gap-2">
      <SeverityDot level={level} />
      <span
        className="mono text-[0.625rem] tracking-[0.16em] uppercase"
        style={{ color: `var(--color-${level})` }}
      >
        {levelMeta[level].label}
      </span>
    </span>
  );
}

export function TrendTag({ trend }: { trend: Trend }) {
  const color =
    trend === "deteriorating"
      ? "var(--color-high)"
      : trend === "improving"
        ? "var(--color-stable)"
        : "var(--text-faint)";
  return (
    <span
      className="mono text-[0.625rem] tracking-[0.14em] uppercase"
      style={{ color }}
    >
      {trendMeta[trend].glyph} {trendMeta[trend].label}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "group mono inline-flex items-center gap-2.5 px-6 py-3.5 text-[0.6875rem] tracking-[0.16em] uppercase transition-all duration-300 hover:-translate-y-0.5";
  const styles =
    variant === "primary"
      ? "bg-[var(--color-brand)] text-[var(--color-on-brand)] hover:bg-[var(--color-brand-strong)]"
      : "border border-[var(--rule)] text-[var(--text)] hover:border-[var(--color-watch)] hover:text-[var(--color-watch)]";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <span className="arrow" aria-hidden>
        &rarr;
      </span>
    </Link>
  );
}

export function StatusBadge({
  children,
  tone = "elevated",
}: {
  children: React.ReactNode;
  tone?: Level;
}) {
  const c = `var(--color-${tone})`;
  return (
    <span
      className="mono inline-flex items-center gap-2.5 border px-3.5 py-2 text-[0.625rem] tracking-[0.18em] uppercase"
      style={{
        borderColor: `color-mix(in srgb, ${c} 40%, transparent)`,
        color: c,
        background: `color-mix(in srgb, ${c} 8%, transparent)`,
      }}
    >
      <span
        className="relative flex h-1.5 w-1.5"
        aria-hidden
      >
        <span
          className="pulse-ring absolute inline-flex h-full w-full rounded-full"
          style={{ background: c }}
        />
        <span
          className="relative inline-flex h-1.5 w-1.5 rounded-full"
          style={{ background: c }}
        />
      </span>
      {children}
    </span>
  );
}

export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <p className="mono flex items-start gap-2.5 border border-[var(--rule)] bg-[var(--surface-raised)] px-4 py-3 text-[0.6875rem] leading-relaxed tracking-[0.06em] text-[var(--text-dim)]">
      <span style={{ color: "var(--color-watch)" }} aria-hidden>
        &#9888;
      </span>
      {children}
    </p>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
  badge,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  badge?: React.ReactNode;
}) {
  return (
    <header className="border-b border-[var(--rule)] pt-32 pb-16 sm:pt-40 sm:pb-20">
      <Container>
        <div className="flex flex-wrap items-center gap-5">
          <span className="eyebrow">{eyebrow}</span>
          {badge}
        </div>
        <h1 className="display mt-5 max-w-5xl text-5xl sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {lede ? (
          <p className="prose-measure mt-7 text-lg text-[var(--text-dim)] sm:text-xl">
            {lede}
          </p>
        ) : null}
      </Container>
    </header>
  );
}
