# Threshold Realities

Marketing site for **thresholdrealities.com** — research, threat analysis and risk
intelligence for companies and investors operating across contested markets.

> Uncertain times, certain intelligence.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** — design tokens live in `src/app/globals.css`
- **next/font** — Instrument Serif (display), Inter Tight (body), JetBrains Mono (data)
- No runtime dependencies beyond React. All 22 routes prerender as static HTML.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Requires Node ≥ 20.9.

## Design system — "Chart & Signal"

The palette is drawn from nautical and aeronautical chart stock, not from SaaS blue.

**Base (the chart)** — `abyssal #080d12` · `ink #111a22` · `meridian #22323d` ·
`graticule #3d525f` · `parchment #e9e2d4` · `bone #f6f2ea`

**Signal (the escalation ramp)** — `stable #3f7d5c` · `elevated #FFDD9C` ·
`watch #F9B637` · `high #FB6C00` · `critical #E73F1E`

**Accent** — `signal #F9B637` · `contested #d98a5a`

The ramp is tuned for the near-black base. On parchment its light end would be
illegible, so `[data-surface="parchment"]` redeclares every level darker
(`elevated #97650a`, `watch #a8640b`, `high #b84e05`, `critical #b52d10`). Same
meaning and order, legible on paper. Components read these through
`var(--color-<level>)` rather than the hex in `severity.ts`, which is why the
override works — `severity.ts` hexes are for canvas/SVG and documentation only.

**Note:** the accent `#F9B637` is also the Watch level. Severity is carried by
dots, rules and labels; the accent by solid fills and underlines. If the overlap
ever reads ambiguously, move the accent to `#FFDD9C` — one line in `@theme`.

### The one rule

**The signal ramp is the severity scale. It is never decoration.** Red means
escalation and nothing else. The scale is defined once in `src/lib/severity.ts`
and drives the tracker, the alert styling, the threshold rules and the published
definitions in the site footer. If you need another colour for a chart or a
callout, take it from the base palette or from `contested` — not from the ramp.

### Surfaces

Dark is the default (instrument). Long-form and archival sections opt into
parchment with `data-surface="parchment"`, which remaps `--text`, `--rule` and
friends. Use `<Section surface="parchment">`.

### The threshold rule

The signature element. A hairline that takes on a severity colour when it scrolls
into view (`<ThresholdRule level="high" />`), plus a persistent scroll-progress
rule under the header that ramps from stable to critical as you read down a page.

## Project layout

```
src/
  app/
    page.tsx              Home
    about/ services/ platform/ tracker/
    analysis/             Daily articles: index + [slug]
    reports/              Long-form research: index + [slug]
    team/ contact/ careers/ privacy/ terms/
    not-found.tsx         "Position unresolved"
    globals.css           Design tokens + primitives
  components/
    chart-map.tsx         Equirectangular graticule + severity markers
    threshold-rule.tsx    ThresholdRule + ScrollThreshold
    tracker-view.tsx      Interactive tracker (filters, map, expandable rows)
    research-index.tsx    Filterable research index
    site-header.tsx  site-footer.tsx  ui.tsx  reveal.tsx  counter.tsx
    signal-strip.tsx  contact-form.tsx
  lib/
    severity.ts           The scale. Single source of truth.
    tracker.ts            Tracker entries
    analysis.ts           Reads content/analysis/*.md
    reports.ts            Long-form report library
    content.ts            Page copy (practices, services, method, team, platform)
    site.ts               Nav, metadata, contact addresses
```

## Before launch — outstanding

All copy and data in `src/lib/` is **placeholder for design review**. Pages that
render it show a visible notice; keep those notices until real content lands.

- [ ] Replace `src/lib/tracker.ts` with analyst-maintained entries, or wire to the
      monitoring platform. Remove `SAMPLE_NOTICE` once live.
- [ ] Replace `src/lib/reports.ts` with real long-form work. Daily articles are
      already file-based — see `content/analysis/README.md`.
- [x] ~~Founder portraits.~~ In place at `public/team/`. To swap either one,
      overwrite the file — `src/lib/portraits.ts` resolves by slug, no code change.
- [ ] Replace `src/lib/content.ts` team entries with named analysts, photographs
      and biographies.
- [ ] **Logo source files.** `public/brand/*.png` were derived programmatically
      from the supplied JPEGs (white keyed out; a light variant recoloured for
      dark surfaces). Ask the designer for vector originals — an SVG or a
      transparent PNG at 2x — and drop them in to replace these.
- [ ] Wire `src/components/contact-form.tsx` to a real endpoint (Resend, Formspark
      or a Next API route). It currently shows a confirmation and sends nothing,
      and says so on the page.
- [ ] Wire the newsletter form on `/insights`.
- [ ] Have `/privacy` and `/terms` reviewed by counsel. Publishing risk
      assessments about sovereign states carries specific liability exposure.
- [ ] Add OG images (`opengraph-image.tsx`), favicon and `robots.txt` / `sitemap.ts`.
- [ ] Add analytics (privacy-preserving — the privacy policy commits to this).

## Deployment

Built to deploy on Vercel as a static export.

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Framework preset: Next.js. No environment variables required yet.
3. Add `thresholdrealities.com` and `www.thresholdrealities.com` under
   Project → Settings → Domains, then point the registrar at Vercel's nameservers
   or add the `A` / `CNAME` records Vercel shows.

## Publishing

Daily articles are Markdown files in `content/analysis/`. One file per piece;
the filename becomes the URL. Add the file, push, and Vercel rebuilds.

Full authoring reference, including frontmatter fields and image sizing:
**`content/analysis/README.md`**.

Long-form reports still live in `src/lib/reports.ts` and are next in line to
move to the same file-based setup.

## Hero footage

`public/video/` holds the landing-page background clip, encoded from a 4K source
(55 MB) down to something a landing page can actually carry:

| File | Use | Size |
| --- | --- | --- |
| `hero-1600.mp4` | ≥768px viewports | 3.3 MB |
| `hero-960.mp4` | <768px viewports | 0.95 MB |
| `hero-poster.jpg` | First paint, and the whole treatment under reduced motion | 76 KB |

`src/components/hero-video.tsx` picks the encode by viewport width after mount,
so a phone never pulls the desktop file; pauses playback once the hero scrolls
out of view; and skips the video entirely when `prefers-reduced-motion` is set.

To re-encode from a new source:

```bash
ffmpeg -i source.mp4 -an -vf "scale=1600:-2,fps=25" -c:v libx264 \
  -preset slow -crf 32 -pix_fmt yuv420p -movflags +faststart -g 50 \
  public/video/hero-1600.mp4
```

## Accessibility

Every animation respects `prefers-reduced-motion`. Colour is never the sole
carrier of meaning — severity always ships with a text label alongside the dot.
Skip link, visible focus rings, and keyboard-operable map markers and tracker rows.
