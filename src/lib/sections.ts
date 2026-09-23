import { regionalFocus, researchAreas } from "./taxonomy";

/**
 * Pure, client-safe half of the posts module.
 *
 * The console form is a client component and needs the section list and the
 * Post shape. Keeping those here means importing them never drags `node:fs`
 * into the browser bundle.
 */

export const SECTIONS = [
  {
    slug: "publications",
    label: "Publications",
    basePath: "/publications",
    pages: [] as { slug: string; title: string }[],
  },
  {
    slug: "research-areas",
    label: "Research Areas",
    basePath: "/research-areas",
    pages: researchAreas.map((a) => ({ slug: a.slug, title: a.title })),
  },
  {
    slug: "regional-focus",
    label: "Regional Focus",
    basePath: "/regional-focus",
    pages: regionalFocus.map((r) => ({ slug: r.slug, title: r.title })),
  },
] as const;

export type SectionSlug = (typeof SECTIONS)[number]["slug"];

export type Post = {
  id: string;
  section: SectionSlug;
  /** Empty for Publications, which has no sub-pages. */
  page: string;
  title: string;
  tagline: string;
  /** Markdown. */
  body: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export function sectionOf(slug: string) {
  return SECTIONS.find((s) => s.slug === slug);
}

export function pathForPost(post: Post): string {
  const section = sectionOf(post.section);
  if (!section) return "/";
  return post.page
    ? `${section.basePath}/${post.page}/${post.id}`
    : `${section.basePath}/${post.id}`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
