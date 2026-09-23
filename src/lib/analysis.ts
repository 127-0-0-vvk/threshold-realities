import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Daily analysis, written as Markdown files in `content/analysis/`.
 *
 * One file per article. The filename (minus `.md`) becomes the URL slug, so
 * `content/analysis/red-sea-rerouting.md` publishes at
 * `/analysis/red-sea-rerouting`.
 *
 * See `content/analysis/README.md` for the frontmatter reference.
 */

const DIR = path.join(process.cwd(), "content", "analysis");

export type Article = {
  slug: string;
  title: string;
  standfirst: string;
  category: string;
  region: string;
  author: string;
  date: string;
  readTime: number;
  cover: string | null;
  coverCaption: string | null;
  draft: boolean;
  html: string;
};

marked.setOptions({ gfm: true, breaks: false });

function readFile(file: string): Article | null {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx?$/, "");

  if (!data.title) return null;

  const words = content.trim().split(/\s+/).length;

  return {
    slug,
    title: String(data.title),
    standfirst: String(data.standfirst ?? ""),
    category: String(data.category ?? "Analysis"),
    region: String(data.region ?? "Global"),
    author: String(data.author ?? "Threshold Realities"),
    date: String(data.date ?? ""),
    readTime: Number(data.readTime ?? Math.max(1, Math.round(words / 200))),
    cover: data.cover ? String(data.cover) : null,
    coverCaption: data.coverCaption ? String(data.coverCaption) : null,
    draft: Boolean(data.draft),
    html: marked.parse(content, { async: false }) as string,
  };
}

export function getArticles(): Article[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readFile)
    .filter((a): a is Article => a !== null)
    .filter((a) => !a.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

export function articleCategories(): string[] {
  return [...new Set(getArticles().map((a) => a.category))].sort();
}

export function articleRegions(): string[] {
  return [...new Set(getArticles().map((a) => a.region))].sort();
}

/** "2026-09-22" -> "22 September 2026" */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
