"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { ScrollThreshold } from "./threshold-rule";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-300 ${
          scrolled ? "bg-abyssal/85 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label={site.name}>
            <Mark />
            <span className="hidden sm:block">
              <span className="mono block text-[0.6875rem] leading-none tracking-[0.2em] uppercase text-[var(--text)]">
                Threshold
              </span>
              <span className="mono block text-[0.6875rem] leading-[1.6] tracking-[0.2em] uppercase text-[var(--text-faint)]">
                Realities
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors ${
                    isActive
                      ? "text-signal"
                      : "text-[var(--text-dim)] hover:text-[var(--text)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="mono hidden border border-[var(--rule)] px-4 py-2 text-[0.6875rem] tracking-[0.16em] uppercase text-[var(--text)] transition-colors hover:border-signal hover:text-signal sm:block"
            >
              Request a briefing
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center border border-[var(--rule)] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-px w-4 bg-current transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-4 bg-current transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-4 bg-current transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
        <ScrollThreshold />
      </div>

      {/* Mobile panel */}
      <div
        className={`overflow-hidden border-b border-[var(--rule)] bg-abyssal/97 backdrop-blur-md transition-[max-height] duration-400 ease-out lg:hidden ${
          open ? "max-h-[32rem]" : "max-h-0"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] flex-col px-4 py-2 sm:px-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="border-b border-[var(--rule)] py-3.5 text-lg text-[var(--text)] last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMenu}
            className="mono mt-3 mb-3 border border-signal px-4 py-3 text-center text-[0.6875rem] tracking-[0.16em] uppercase text-signal"
          >
            Request a briefing
          </Link>
        </nav>
      </div>
    </header>
  );
}

/** Logotype: a threshold crossed. Two hairlines, one above and one below. */
function Mark() {
  return (
    <span
      className="relative block h-8 w-8 border border-[var(--rule)] transition-colors group-hover:border-signal"
      aria-hidden
    >
      <span className="absolute inset-x-1.5 top-[11px] h-px bg-[var(--text-dim)]" />
      <span className="absolute inset-x-1.5 top-[17px] h-px bg-high transition-all duration-300 group-hover:shadow-[0_0_10px_0_var(--color-high)]" />
    </span>
  );
}
