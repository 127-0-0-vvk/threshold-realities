import fs from "node:fs";
import path from "node:path";

/**
 * Server-only. Resolves a portrait by slug from `public/team/`.
 *
 * Drop `public/team/bhanu.jpg` (or .jpeg / .png / .webp) and it renders on the
 * next build — no code change. Returns null when nothing is there, and the
 * Portrait component falls back to its branded placeholder.
 */

const EXTENSIONS = ["jpg", "jpeg", "png", "webp"] as const;

export function resolvePortrait(slug: string): string | null {
  for (const ext of EXTENSIONS) {
    const rel = `/team/${slug}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}
