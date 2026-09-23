import Link from "next/link";

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
      className={`py-16 sm:py-24 lg:py-28 ${className}`}
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
      <h2 className="display mt-5 text-[clamp(1.875rem,4.5vw,3.5rem)]">
        {title}
      </h2>
      {lede ? (
        <p className="prose-measure mt-5 text-lg text-[var(--text-dim)]">
          {lede}
        </p>
      ) : null}
    </div>
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
    <header className="border-b border-[var(--rule)] pt-28 pb-12 sm:pt-36 sm:pb-16">
      <Container>
        <div className="flex flex-wrap items-center gap-5">
          <span className="eyebrow">{eyebrow}</span>
          {badge}
        </div>
        <h1 className="display mt-5 max-w-5xl text-[clamp(2.25rem,6vw,4.75rem)]">
          {title}
        </h1>
        {lede ? (
          <p className="prose-measure mt-6 text-lg text-[var(--text-dim)] sm:text-xl">
            {lede}
          </p>
        ) : null}
      </Container>
    </header>
  );
}
