# Founder & team portraits

Drop a file here named after the person's slug and it appears on the next build.
No code change required.

    public/team/bhanu.jpg
    public/team/vivek.jpg

Accepted extensions: `.jpg`, `.jpeg`, `.png`, `.webp` (checked in that order).

Slugs are defined in `src/lib/content.ts` under `founders`.

**Crop:** 4:5 portrait (e.g. 1200 x 1500). The frame uses `object-cover`, so
anything close to that ratio works; faces sit best in the upper third.

While a file is missing, `src/components/portrait.tsx` renders a branded
placeholder with the person's initial, so the layout is final either way.
