"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site, type NavItem } from "@/lib/site";
import { ScrollThreshold } from "./threshold-rule";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Escape closes any open dropdown.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeAll = () => {
    setOpen(false);
    setOpenMenu(null);
  };

  /* Hover opens, with a short grace period so the pointer can cross the gap
     between trigger and panel without it snapping shut. */
  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Solid paper on every page, including over the dark hero video. */}
      <div
        className={`border-b bg-[var(--surface)] transition-colors duration-300 ${
          scrolled || openMenu ? "border-[var(--rule)]" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-8">
          <Link
            href="/"
            onClick={closeAll}
            className="group flex shrink-0 items-center gap-3.5"
            aria-label={site.name}
          >
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

          <nav className="hidden items-center gap-6 xl:flex">
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => hoverOpen(item.label)}
                  onMouseLeave={hoverClose}
                >
                  <button
                    type="button"
                    aria-expanded={openMenu === item.label}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenMenu((v) => (v === item.label ? null : item.label))
                    }
                    className={`mono flex items-center gap-1.5 whitespace-nowrap py-2 text-[0.6875rem] tracking-[0.16em] uppercase transition-colors ${
                      isActive(item.href) || openMenu === item.label
                        ? "text-[var(--color-watch)]"
                        : "text-[var(--text-dim)] hover:text-[var(--text)]"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`text-[0.5rem] transition-transform duration-200 ${
                        openMenu === item.label ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    >
                      &#9660;
                    </span>
                  </button>

                  <Dropdown
                    item={item}
                    open={openMenu === item.label}
                    pathname={pathname}
                    onNavigate={closeAll}
                  />
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className={`mono whitespace-nowrap py-2 text-[0.6875rem] tracking-[0.16em] uppercase transition-colors ${
                    isActive(item.href)
                      ? "text-[var(--color-watch)]"
                      : "text-[var(--text-dim)] hover:text-[var(--text)]"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              onClick={closeAll}
              className="mono hidden shrink-0 border border-[var(--rule)] px-4 py-2 text-[0.6875rem] tracking-[0.16em] uppercase text-[var(--text)] transition-colors hover:border-[var(--color-watch)] hover:text-[var(--color-watch)] sm:block"
            >
              Request a briefing
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center border border-[var(--rule)] xl:hidden"
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

      <MobileNav open={open} pathname={pathname} onNavigate={closeAll} />
    </header>
  );
}

/* ------------------------------------------------------------------ */

function Dropdown({
  item,
  open,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  open: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  const wide = (item.children?.length ?? 0) > 8;

  return (
    <div
      className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-200 ${
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      }`}
    >
      <div
        className={`border border-[var(--rule)] bg-[var(--surface-raised)] p-2 shadow-[0_18px_40px_-24px_rgba(20,24,28,0.45)] ${
          wide ? "grid w-[46rem] grid-cols-2 gap-x-2" : "w-[20rem]"
        }`}
      >
        <Link
          href={item.href}
          onClick={onNavigate}
          className={`mono block border-b border-[var(--rule)] px-4 py-3 text-[0.625rem] tracking-[0.16em] uppercase transition-colors hover:bg-[var(--surface)] ${
            wide ? "col-span-2" : ""
          } ${
            pathname === item.href
              ? "text-[var(--color-watch)]"
              : "text-[var(--text-faint)]"
          }`}
        >
          All {item.label}
        </Link>

        {item.children?.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            onClick={onNavigate}
            className={`group flex items-center justify-between gap-4 px-4 py-2.5 text-sm transition-colors hover:bg-[var(--surface)] ${
              pathname === child.href
                ? "text-[var(--color-watch)]"
                : "text-[var(--text-dim)] hover:text-[var(--text)]"
            }`}
          >
            {child.label}
            <span
              className="mono text-[0.625rem] opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden
            >
              &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function MobileNav({
  open,
  pathname,
  onNavigate,
}: {
  open: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  const [section, setSection] = useState<string | null>(null);

  return (
    <div
      className={`overflow-y-auto overscroll-contain border-b border-[var(--rule)] bg-[var(--surface)] transition-[max-height] duration-400 ease-out xl:hidden ${
        open ? "max-h-[calc(100svh-4rem)]" : "max-h-0"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] flex-col px-4 py-2 sm:px-8">
        {nav.map((item) =>
          item.children ? (
            <div key={item.href} className="border-b border-[var(--rule)]">
              <button
                type="button"
                onClick={() =>
                  setSection((v) => (v === item.label ? null : item.label))
                }
                aria-expanded={section === item.label}
                className="flex w-full items-center justify-between py-3.5 text-left text-lg text-[var(--text)]"
              >
                {item.label}
                <span
                  className={`mono text-xs transition-transform duration-200 ${
                    section === item.label ? "rotate-45" : ""
                  }`}
                  aria-hidden
                >
                  &#43;
                </span>
              </button>
              <div
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                  section === item.label ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-0.5 pb-3 pl-3">
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className="mono py-2 text-[0.625rem] tracking-[0.16em] uppercase text-[var(--text-faint)]"
                    >
                      All {item.label}
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onNavigate}
                        className={`py-2 text-base ${
                          pathname === child.href
                            ? "text-[var(--color-watch)]"
                            : "text-[var(--text-dim)]"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="border-b border-[var(--rule)] py-3.5 text-lg text-[var(--text)]"
            >
              {item.label}
            </Link>
          ),
        )}
        <Link
          href="/contact"
          onClick={onNavigate}
          className="mono mb-4 mt-4 border border-[var(--color-watch)] px-4 py-3 text-center text-[0.6875rem] tracking-[0.16em] uppercase text-[var(--color-watch)]"
        >
          Request a briefing
        </Link>
      </nav>
    </div>
  );
}
