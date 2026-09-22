"use client";

import { useEffect, useRef, useState } from "react";
import type { Level } from "@/lib/severity";
import { levelMeta } from "@/lib/severity";

/**
 * The signature element. A hairline rule that takes on a severity colour
 * when it enters the viewport — the visual argument of the whole brand:
 * neutral above the line, signal below it.
 */
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
      {label ? (
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <span className="eyebrow">{label}</span>
          {level && active ? (
            <span
              className="mono text-[0.6875rem] tracking-[0.18em] uppercase transition-colors duration-700"
              style={{ color: levelMeta[level].hex }}
            >
              {levelMeta[level].label}
            </span>
          ) : null}
        </div>
      ) : null}
      <div
        className="threshold-rule"
        data-level={active && level ? level : undefined}
      />
    </div>
  );
}

/**
 * The persistent progress rule pinned under the header. Colour ramps
 * with scroll depth: the further you read, the closer to the threshold.
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
          backgroundColor: levelMeta[level].hex,
          boxShadow:
            progress > 0.65 ? `0 0 16px -2px ${levelMeta[level].hex}` : "none",
        }}
      />
    </div>
  );
}
