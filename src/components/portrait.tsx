import Image from "next/image";

/**
 * Portrait frame. Renders the photograph when one exists, otherwise a branded
 * placeholder carrying the initial — so the layout is final before the shoot.
 */
export function Portrait({
  src,
  name,
  className = "",
}: {
  src?: string | null;
  name: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden border border-[var(--rule)] ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="(min-width: 1024px) 28rem, 100vw"
          className="object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-4"
          style={{
            background:
              "linear-gradient(160deg, var(--surface-raised), var(--surface))",
          }}
        >
          <span
            className="display select-none text-7xl"
            style={{ color: "var(--text-faint)" }}
            aria-hidden
          >
            {name.charAt(0)}
          </span>
          <span className="mono text-[0.5625rem] tracking-[0.18em] uppercase text-[var(--text-faint)]">
            Portrait pending
          </span>
        </div>
      )}

      {/* chart registration ticks */}
      <span
        className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t"
        style={{ borderColor: "color-mix(in srgb, var(--color-signal) 55%, transparent)" }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r"
        style={{ borderColor: "color-mix(in srgb, var(--color-signal) 55%, transparent)" }}
        aria-hidden
      />
    </div>
  );
}
