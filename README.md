# Threshold Realities

Marketing site for **thresholdrealities.com** — research, threat analysis and risk
intelligence for companies and investors operating across contested markets.

> Uncertain times, certain intelligence.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** — design tokens live in `src/app/globals.css`
- **next/font** — Bricolage Grotesque (display), Plus Jakarta Sans (body), JetBrains Mono (data)
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

**Base (paper — the default)** — `paper #f5f5f5` · `card #fdfcfa` ·
`hairline #e2ded6` · `graticule #c9c4ba`

**Base (ink — opt-in bands)** — `abyssal #080d12` · `ink #111a22` · `meridian #22323d`

**Signal (the escalation ramp)** — `stable #3f7d5c` · `elevated #FFDD9C` ·
`watch #F9B637` · `high #FB6C00` · `critical #E73F1E`

**Accent** — `signal #F9B637` · `contested #d98a5a`

Those are the ink values. On paper the light end would be illegible (`#FFDD9C`
on `#f5f5f5` is about 1.2:1), so `:root` carries a darkened set —
`elevated #8f5f08`, `watch #a05f0a`, `high #b84e05`, `critical #c3300f` — and
`[data-surface="ink"]` restores full strength. Same meaning, same order.

Components read `var(--color-<level>)`, never the hex in `severity.ts`, which is
why the swap is automatic. The hexes in `severity.ts` are for documentation and
any future canvas rendering only.

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

**Paper is the default.** Ink is opt-in per section via `data-surface="ink"`,
used for the hero (dark footage), the footer, and the feature bands on the home,
platform, services, about, team, careers and tracker pages. Use
`<Section surface="ink">`, or the attribute directly on any element.

The boundary remaps `--surface`, `--surface-raised`, `--rule`, the three text
tones, and the whole severity ramp. It also re-declares `color`, which is
required: `color` on `<body>` resolves `var(--text)` once and descendants
inherit that computed value, so redeclaring the variable alone does nothing.

The header is solid paper on every page, including over the dark hero.

### The threshold rule

The signature element. A hairline that takes on a severity colour when it scrolls
into view (`<ThresholdRule level="high" />`), plus a persistent scroll-progress
rule under the header that ramps from stable to critical as you read down a page.

## Project layout

```
src/
  app/
    page.tsx              Home
    about/ advisors/ what-we-do/
    publications/         Policy briefs, white papers, working papers
    research-areas/       Index + [slug] (11 areas)
    regional-focus/       Index + [slug] (7 regions)
    contact/ careers/ privacy/ terms/
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
    reports.ts            Publications library
    taxonomy.ts           Research areas, regions, publication types
    content.ts            Page copy (practices, services, method, founders)
    portraits.ts          Resolves founder photos from public/team/
    site.ts               Nav, metadata, contact addresses
```

## Before launch — outstanding

All copy and data in `src/lib/` is **placeholder for design review**. Pages that
render it show a visible notice; keep those notices until real content lands.

- [ ] **Research area and regional focus pages are stubs.** Each renders an
      honest "in preparation" state. To fill one in, add `summary` and
      `sections` to its entry in `src/lib/taxonomy.ts` — nothing else changes.
- [ ] **Advisory board names.** `/advisors` shows four "to be announced" cards
      pending appointments.
- [ ] Replace `src/lib/reports.ts` with real publications. Daily articles are
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

Publications currently live in `src/lib/reports.ts`. The Markdown-file setup
that drove the retired analysis section is recoverable from git history if you
want publications to work the same way — one file per piece, filename as slug.

## Console

An admin panel for posting articles into Publications, Research Areas and
Regional Focus.

**Address:** `/console-9f4b2a` — deliberately unguessable, `noindex`, and not
linked from anywhere on the site. When you are ready to move it to
`admin.thresholdrealities.com`, add that subdomain in Vercel and either point it
at this path with a rewrite or rename the folder; nothing else changes.

### Setup

```bash
cp .env.example .env.local
# set ADMIN_PASSWORD to whatever you like
# set ADMIN_SECRET to a long random string:
openssl rand -hex 32
```

Restart the dev server. Without both variables the console renders a
"not configured" notice rather than an open door.

### Posting

Choose a section, then a page within it (Publications has no sub-pages, so it
posts to the index). Upload an image, write a headline, a tagline and the
article, and publish. Markdown works in the article body.

The post appears as a card on the page you chose, and opens at a numbered URL —
`/research-areas/security-studies/0001`. Existing posts can be edited or
deleted from the same screen.

### Security

- Password checked with a constant-time compare; the cookie holds an HMAC of
  the issue time signed with `ADMIN_SECRET`, never the password, and expires
  after 12 hours.
- Uploads are capped at 6 MB and restricted to JPG, PNG, WebP and AVIF. The
  stored extension is decided from the detected type, never taken from the
  filename.
- Post destinations are validated against the known sections and pages, and
  image paths must sit under `/uploads/`.

### Console storage

Posts are JSON files in `content/posts/`; images land in `public/uploads/`.
This works in local development and on any host with a writable disk.

**It does not work on Vercel**, whose serverless filesystem is read-only. The
console detects this and says so rather than failing silently. To run it in
production, swap the four functions in `src/lib/posts.ts` (`getPosts`,
`savePost`, `deletePost`, plus the upload route) for a database and a blob
store — Supabase or Vercel Postgres + Blob are both a short change. Nothing
outside those functions needs to move.

## Hero

`public/hero/collage.jpg`. The hero stacks on phones — headline, then the
collage at its natural aspect so nothing is cropped — and splits into two
columns from `lg` up, copy left and image right.

The source is 735×919, so the image column is capped rather than stretched;
pushing it wider would only soften it. Supply a larger original and the layout
will use it.

The previous background video is retired. Its encodes and the component that
drove them are recoverable from git history if you want them back.

## Accessibility

Every animation respects `prefers-reduced-motion`. Colour is never the sole
carrier of meaning — severity always ships with a text label alongside the dot.
Skip link, visible focus rings, and keyboard-operable map markers and tracker rows.
