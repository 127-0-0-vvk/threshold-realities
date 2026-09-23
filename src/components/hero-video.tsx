"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero background footage.
 *
 * - Poster paints immediately; the video is chosen by viewport width after
 *   mount so a phone never pulls the desktop encode.
 * - `prefers-reduced-motion` gets the poster only, and no video is fetched.
 * - Playback pauses once the hero scrolls out of view.
 * - The globe sits centre-frame in the source, so on wide screens we push the
 *   framing right to clear the left-aligned headline.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const raf = requestAnimationFrame(() =>
      setSrc(window.innerWidth < 768 ? "/video/hero-960.mp4" : "/video/hero-1600.mp4"),
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  // Stop decoding once it is off screen.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* The globe sits dead centre in the source. On wide screens we give the
          media its own frame, pushed right and slightly oversized, so the globe
          clears the left-aligned headline instead of sitting behind it. */}
      <div className="absolute inset-0 lg:left-[10%] lg:-right-[14%] lg:-top-[6%] lg:-bottom-[6%]">
        {/* Poster underneath: paints before the video decodes, and is the whole
            treatment under reduced motion. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/video/hero-poster.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[50%_42%]"
        />

        {src ? (
          <video
            ref={videoRef}
            src={src}
            poster="/video/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            onCanPlay={() => setReady(true)}
            className={`absolute inset-0 h-full w-full object-cover object-[50%_42%] transition-opacity duration-700 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null}
      </div>

      {/* Scrims. Narrow screens have no empty column to put text in, so they get
          a flat knock-down; wide screens get a left-to-right ramp instead, which
          keeps the globe bright on the right where nothing overlaps it. */}
      <div className="absolute inset-0 bg-abyssal/55 lg:bg-abyssal/10" />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(to right, var(--color-abyssal) 0%, color-mix(in srgb, var(--color-abyssal) 82%, transparent) 34%, color-mix(in srgb, var(--color-abyssal) 30%, transparent) 62%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-abyssal) 0%, color-mix(in srgb, var(--color-abyssal) 45%, transparent) 16%, transparent 38%, color-mix(in srgb, var(--color-abyssal) 55%, transparent) 78%, var(--color-abyssal) 100%)",
        }}
      />

      {/* Chart graticule laid over the footage — ties the stock clip to the
          rest of the system rather than letting it sit apart. */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-graticule) 1px, transparent 1px), linear-gradient(90deg, var(--color-graticule) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(90% 75% at 55% 50%, black 15%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(90% 75% at 55% 50%, black 15%, transparent 78%)",
        }}
      />
    </div>
  );
}
