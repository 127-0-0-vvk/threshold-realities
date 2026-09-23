# Publishing an article

One Markdown file per article, in this folder. The filename becomes the URL.

    content/analysis/red-sea-rerouting.md   ->   /analysis/red-sea-rerouting

Use lowercase words separated by hyphens. No spaces, no capitals, no dates in
the filename.

## The file

Every article starts with a frontmatter block between `---` lines, then the
article body in Markdown.

```markdown
---
title: "Red Sea rerouting is settling into a planning assumption"
standfirst: "One or two sentences that appear under the headline and on the card. Say what the reader gains, not what the article covers."
category: "Trade Policy"
region: "Middle East"
author: "Threshold Realities"
date: "2026-09-23"
readTime: 6
cover: "/analysis/red-sea-rerouting.jpg"
coverCaption: "Container traffic rerouted around the Cape. Illustration by Threshold Realities."
draft: false
---

Your opening paragraph. Keep it to one idea.

## A subheading

More text. **Bold** and *italic* work as expected.

> A pulled quote, for a line worth slowing the reader down on.

- Bulleted lists
- work too

![Alt text describing the image](/analysis/some-chart.jpg)
```

## The fields

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | The headline. Sentence case reads better than Title Case here. |
| `standfirst` | yes | Shown under the headline and on every card. One or two sentences. |
| `category` | yes | Groups articles and drives the filters. Reuse existing ones where you can. |
| `region` | yes | Middle East, Indo-Pacific, Europe, Africa, Americas, South Asia, Global. |
| `author` | no | Defaults to "Threshold Realities". Use an analyst's name when they wrote it. |
| `date` | yes | `YYYY-MM-DD`. Articles sort newest first. |
| `readTime` | no | Minutes. Calculated from word count when omitted. |
| `cover` | no | Path under `public/`. Without one, the card falls back to a typographic treatment. |
| `coverCaption` | no | Credit line under the cover image. |
| `draft` | no | `true` keeps it off the live site but visible when running locally. |

## Images

Put them in `public/analysis/` and reference them as `/analysis/filename.jpg`.

- **Cover images:** 1600×900 (16:9). They crop to 3:2 on cards and run full
  width on the article page.
- **In-body images:** 1600px wide is plenty. Anything larger just costs load time.
- Compress before committing. Aim under 300 KB per image:

      ffmpeg -i original.jpg -vf "scale=1600:-2" -q:v 6 public/analysis/name.jpg

## Publishing

1. Add the `.md` file and any images.
2. Commit and push to `main`.
3. Vercel rebuilds automatically. The article is live in a couple of minutes.

```bash
git add content/analysis public/analysis
git commit -m "Publish: <headline>"
git push
```

To take something down, set `draft: true` and push, or delete the file.

## A note on tone

These are published under the firm's name and carry its judgement. Write what
you can defend: attribute claims, separate what is reported from what you
assess, and say what would change your view. Where something is uncertain, say
so plainly rather than hedging the whole piece into vagueness.
