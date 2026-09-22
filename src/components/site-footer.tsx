import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { LEVELS, levelMeta } from "@/lib/severity";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--rule)] bg-abyssal">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="display text-3xl text-[var(--text)]">{site.tagline}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--text-dim)]">
              {site.positioning}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mono link-underline mt-6 inline-block text-[0.6875rem] tracking-[0.14em] text-signal"
            >
              {site.email}
            </a>
          </div>

          {footerNav.map((group) => (
            <div key={group.heading}>
              <h3 className="eyebrow">{group.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="link-underline text-sm text-[var(--text-dim)] hover:text-[var(--text)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* The severity scale, published in the footer. Method in the open. */}
        <div className="mt-16 border-t border-[var(--rule)] pt-8">
          <h3 className="eyebrow">The scale</h3>
          <div className="mt-4 grid gap-px overflow-hidden sm:grid-cols-5">
            {LEVELS.map((l) => (
              <div key={l} className="bg-ink/50 p-3">
                <div className="h-0.5 w-full" style={{ background: levelMeta[l].hex }} />
                <p
                  className="mono mt-2.5 text-[0.625rem] tracking-[0.16em] uppercase"
                  style={{ color: levelMeta[l].hex }}
                >
                  {levelMeta[l].label}
                </p>
                <p className="mt-1.5 text-xs leading-snug text-[var(--text-faint)]">
                  {levelMeta[l].definition}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--rule)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)] hover:text-[var(--text-dim)]"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)] hover:text-[var(--text-dim)]"
            >
              Terms
            </Link>
            <Link
              href="/careers"
              className="mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)] hover:text-[var(--text-dim)]"
            >
              Careers
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
