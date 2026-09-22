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
  surface?: "parchment";
  id?: string;
}) {
  return (
    <section
      id={id}
      data-surface={surface}
      className={`py-20 sm:py-28 ${surface === "parchment" ? "bg-parchment text-[var(--text)]" : ""} ${className}`}
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
        background: levelMeta[level].hex,
        boxShadow: `0 0 0 3px ${levelMeta[level].hex}22`,
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
        style={{ color: levelMeta[level].hex }}
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
    "mono inline-flex items-center gap-2.5 px-6 py-3.5 text-[0.6875rem] tracking-[0.16em] uppercase transition-all duration-200";
  const styles =
    variant === "primary"
      ? "bg-signal text-abyssal hover:bg-[#f0c57d]"
      : "border border-[var(--rule)] text-[var(--text)] hover:border-signal hover:text-signal";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <span aria-hidden>&rarr;</span>
    </Link>
  );
}

export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <p className="mono flex items-start gap-2.5 border border-[var(--rule)] bg-ink/40 px-4 py-3 text-[0.6875rem] leading-relaxed tracking-[0.06em] text-[var(--text-faint)]">
      <span className="text-elevated" aria-hidden>
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
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="border-b border-[var(--rule)] pt-32 pb-16 sm:pt-40 sm:pb-20">
      <Container>
        <span className="eyebrow">{eyebrow}</span>
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
