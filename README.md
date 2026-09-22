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

**Signal (the escalation ramp)** — `stable #3f7d5c` · `elevated #c7a02c` ·
`watch #dc7a2f` · `high #c42e27` · `critical #7e1613`

**Accent** — `signal #e4b363` (brass) · `contested #5b6e8c`

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
    about/ method/ services/ platform/ tracker/
    research/             Index + [slug] articles
    insights/ team/ contact/ careers/ privacy/ terms/
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
    research.ts           Research library
    content.ts            Page copy (practices, services, method, team, platform)
    site.ts               Nav, metadata, contact addresses
```

## Before launch — outstanding

All copy and data in `src/lib/` is **placeholder for design review**. Pages that
render it show a visible notice; keep those notices until real content lands.

- [ ] Replace `src/lib/tracker.ts` with analyst-maintained entries, or wire to the
      monitoring platform. Remove `SAMPLE_NOTICE` once live.
- [ ] Replace `src/lib/research.ts` with real work. Recommended: move to MDX under
      `content/research/*.mdx` so analysts write in markdown in the repo.
- [ ] Replace `src/lib/content.ts` team entries with named analysts, photographs
      and biographies.
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

## Accessibility

Every animation respects `prefers-reduced-motion`. Colour is never the sole
carrier of meaning — severity always ships with a text label alongside the dot.
Skip link, visible focus rings, and keyboard-operable map markers and tracker rows.
