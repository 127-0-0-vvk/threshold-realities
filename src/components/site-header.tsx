"use client";

import Image from "next/image";
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
      {/* Solid paper on every page, including over the dark hero video. The
          hard edge against the footage is deliberate. */}
      <div
        className={`border-b bg-[var(--surface)] transition-colors duration-300 ${
          scrolled ? "border-[var(--rule)]" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-8">
          <Link href="/" className="group flex items-center gap-3.5" aria-label={site.name}>
            <Image
              src="/brand/tr-monogram-ink.png"
              alt=""
              width={760}
              height={519}
              priority
              className="h-9 w-auto transition-opacity duration-200 group-hover:opacity-80"
            />
            <span className="hidden sm:block">
              <span className="mono block text-[0.6875rem] leading-none tracking-[0.22em] uppercase text-[var(--text)]">
                Threshold
              </span>
              <span className="mono block text-[0.6875rem] leading-[1.7] tracking-[0.22em] uppercase text-[var(--text-faint)]">
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
                      ? "text-[var(--color-watch)]"
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
              className="mono hidden border border-[var(--rule)] px-4 py-2 text-[0.6875rem] tracking-[0.16em] uppercase text-[var(--text)] transition-colors hover:border-[var(--color-watch)] hover:text-[var(--color-watch)] sm:block"
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
        className={`overflow-hidden border-b border-[var(--rule)] bg-[var(--surface)] transition-[max-height] duration-400 ease-out lg:hidden ${
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
            className="mono mt-3 mb-3 border border-[var(--color-watch)] px-4 py-3 text-center text-[0.6875rem] tracking-[0.16em] uppercase text-[var(--color-watch)]"
          >
            Request a briefing
          </Link>
        </nav>
      </div>
    </header>
  );
}
