"use client";

import { useSyncExternalStore } from "react";

export const THEME_KEY = "tr-theme";

/**
 * The inline script that runs before first paint.
 *
 * Without it the page renders in paper, then snaps to ink once React hydrates —
 * a white flash on every navigation for anyone who chose dark. It has to be
 * blocking and inline in <head>; nothing async is early enough.
 *
 * `data-theme` is always written explicitly, never left absent, so the CSS has
 * one state to match rather than two ("dark" and "not dark, probably").
 */
export const themeScript = `(function(){try{var s=localStorage.getItem('${THEME_KEY}');var d=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){document.documentElement.setAttribute('data-theme','light');}})()`;

type Mode = "light" | "dark";

/* The theme lives on <html>, not in React. That makes it external state, so it
   is read through useSyncExternalStore rather than mirrored into useState
   inside an effect — which is both the idiomatic choice and the one that keeps
   the toggle correct if anything else ever sets the attribute. */

function subscribe(onChange: () => void) {
  const root = document.documentElement;

  const observer = new MutationObserver(onChange);
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  /* Follow the OS only while the visitor has not made a choice of their own.
     Once they have, their choice outranks it. */
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystem = (e: MediaQueryListEvent) => {
    try {
      if (localStorage.getItem(THEME_KEY)) return;
    } catch {
      return;
    }
    root.setAttribute("data-theme", e.matches ? "dark" : "light");
  };
  mq.addEventListener("change", onSystem);

  return () => {
    observer.disconnect();
    mq.removeEventListener("change", onSystem);
  };
}

const getSnapshot = (): Mode =>
  document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";

/* Undefined on the server and during hydration, so the markup React produces
   matches what it rendered on the server. React re-reads straight afterwards. */
const getServerSnapshot = (): Mode | undefined => undefined;

export function ThemeToggle() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next: Mode = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    /* Private windows and blocked site data both throw here. The theme still
       applies for this page view; it just will not be remembered. */
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* not fatal */
    }
  };

  const label =
    mode === undefined
      ? "Switch between light and dark"
      : mode === "dark"
        ? "Switch to light"
        : "Switch to dark";

  return (
    <button
      type="button"
      onClick={toggle}
      title={label}
      aria-label={label}
      className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--rule)] text-[var(--text-dim)] transition-colors hover:border-[var(--color-watch)] hover:text-[var(--color-watch)]"
    >
      {/* Both glyphs are in the markup and CSS hides the wrong one, so the
          button is already right on the very first paint — before React has
          hydrated and before it knows which theme is active. */}
      <svg
        className="on-paper-only"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4.4" />
        <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
      </svg>

      <svg
        className="on-ink-only"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20.5 14.6A8.8 8.8 0 1 1 9.4 3.5a7 7 0 0 0 11.1 11.1z" />
      </svg>
    </button>
  );
}
