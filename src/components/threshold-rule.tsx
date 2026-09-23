"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The signature element: a hairline that takes on the escalation colour when it
 * enters the viewport — neutral above the line, signal below it.
 *
 * Levels map straight onto the CSS ramp (`--color-elevated` … `--color-critical`),
 * so they resolve correctly on paper and inside ink sections without any
 * per-instance handling.
 */

export const LEVELS = [
  "stable",
  "elevated",
  "watch",
  "high",
  "critical",
] as const;

export type Level = (typeof LEVELS)[number];

export function ThresholdRule({
  level,
  label,
  className = "",
}: {
  level?: Level;
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 1, rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`w-full ${className}`}>
      {label ? <span className="eyebrow mb-3 block">{label}</span> : null}
      <div
        className="threshold-rule"
        data-level={active && level ? level : undefined}
      />
    </div>
  );
}

/**
 * Persistent progress rule under the header. Colour ramps with scroll depth, so
 * the further you read the closer the page gets to the threshold.
 */
export function ScrollThreshold() {
  const [level, setLevel] = useState<Level>("stable");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        setProgress(p);
        setLevel(
          p < 0.2
            ? "stable"
            : p < 0.45
              ? "elevated"
              : p < 0.7
                ? "watch"
                : p < 0.92
                  ? "high"
                  : "critical",
        );
      });
    };
    frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="pointer-events-none h-px w-full"
      style={{ background: "var(--rule)" }}
      aria-hidden
    >
      <div
        className="h-px transition-[width,background-color] duration-300 ease-out"
        style={{
          width: `${progress * 100}%`,
          backgroundColor: `var(--color-${level})`,
        }}
      />
    </div>
  );
}
