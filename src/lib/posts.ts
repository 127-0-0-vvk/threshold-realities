import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
export * from "./sections";
import type { Post, SectionSlug } from "./sections";

/**
 * Posts created through the admin console.
 *
 * Storage is deliberately behind this module. Right now it is the filesystem,
 * which works in local development and on any host with a writable disk. On a
 * read-only host (Vercel's serverless runtime included) `canWrite()` returns
 * false and the console says so rather than failing silently. Swapping in a
 * database means replacing the four functions below and nothing else.
 */

const DIR = path.join(process.cwd(), "content", "posts");

marked.setOptions({ gfm: true });

function ensureDir() {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
}

/** False on read-only hosts. The console surfaces this instead of erroring. */
export function canWrite(): boolean {
  try {
    ensureDir();
    const probe = path.join(DIR, ".write-probe");
    fs.writeFileSync(probe, "1");
    fs.unlinkSync(probe);
    return true;
  } catch {
    return false;
  }
}

export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as Post;
      } catch {
        return null;
      }
    })
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getPost(id: string): Post | undefined {
  return getPosts().find((p) => p.id === id);
}

/** Posts for one page, e.g. section "research-areas", page "space". */
export function getPostsFor(section: SectionSlug, page = ""): Post[] {
  return getPosts().filter(
    (p) => p.section === section && (page === "" || p.page === page),
  );
}

export function savePost(post: Post): void {
  ensureDir();
  fs.writeFileSync(
    path.join(DIR, `${post.id}.json`),
    JSON.stringify(post, null, 2),
  );
}

export function deletePost(id: string): void {
  const file = path.join(DIR, `${id}.json`);
  if (fs.existsSync(file)) fs.unlinkSync(file);
}

/** Sequential, human-readable ids — the article number in the URL. */
export function nextId(): string {
  const nums = getPosts()
    .map((p) => Number.parseInt(p.id, 10))
    .filter((n) => Number.isFinite(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return String(next).padStart(4, "0");
}

export function renderBody(md: string): string {
  return marked.parse(md, { async: false }) as string;
}
