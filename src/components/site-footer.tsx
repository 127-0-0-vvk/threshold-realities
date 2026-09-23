import Image from "next/image";
import Link from "next/link";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer data-surface="ink" className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/tr-lockup-light.png"
              alt={`${site.name} — ${site.tagline}`}
              width={776}
              height={720}
              className="h-auto w-56"
            />
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-[var(--text-dim)]">
              {site.positioning}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mono link-underline mt-6 inline-block text-[0.6875rem] tracking-[0.14em] text-[var(--color-watch)]"
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

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--rule)] pt-6 sm:flex-row sm:items-center sm:justify-between">
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
