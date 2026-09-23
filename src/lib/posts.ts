import fs from "node:fs";
import path from "node:path";
import DOMPurify from "isomorphic-dompurify";
import { supabase, supabaseConfigured } from "./supabase";
import type { Post, SectionSlug } from "./sections";

export * from "./sections";

/**
 * Posts created through the console.
 *
 * Two backends, chosen automatically:
 *   - Supabase, whenever SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.
 *     This is the production path and works on Vercel.
 *   - The filesystem otherwise, which is convenient in local development but
 *     cannot persist on a read-only host.
 *
 * `storageStatus()` reports which is in play and whether it is writable, so the
 * console can say so plainly instead of failing at the moment of publishing.
 */

const DIR = path.join(process.cwd(), "content", "posts");

export type StorageStatus = {
  backend: "supabase" | "filesystem";
  writable: boolean;
  detail: string;
};

/* ---------------------------------------------------------------- shared */

/**
 * Article bodies are HTML from the console's editor. They are authored behind a
 * password, but stored HTML is rendered with dangerouslySetInnerHTML, so it is
 * sanitised on the way out regardless — a compromised console should not become
 * stored XSS on the public site.
 */
export function renderBody(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "u", "s", "mark", "code", "pre",
      "h2", "h3", "h4", "blockquote", "ul", "ol", "li", "hr",
      "a", "img", "figure", "figcaption",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "title"],
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|\/)/i,
    ADD_ATTR: ["target"],
  });
}

/* ------------------------------------------------------------ filesystem */

function ensureDir() {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
}

function fsCanWrite(): boolean {
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

function fsGetPosts(): Post[] {
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

/* -------------------------------------------------------------- supabase */

type Row = {
  id: string;
  section: SectionSlug;
  page: string;
  title: string;
  tagline: string;
  body: string;
  image: string | null;
  created_at: string;
  updated_at: string;
};

const toPost = (r: Row): Post => ({
  id: r.id,
  section: r.section,
  page: r.page ?? "",
  title: r.title,
  tagline: r.tagline ?? "",
  body: r.body,
  image: r.image,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

/* ----------------------------------------------------------------- reads */

export async function getPosts(): Promise<Post[]> {
  if (!supabaseConfigured()) return fsGetPosts();

  const { data, error } = await supabase()
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[posts] Supabase read failed:", error.message);
    return [];
  }
  return (data as Row[]).map(toPost);
}

export async function getPost(id: string): Promise<Post | undefined> {
  if (!supabaseConfigured()) return fsGetPosts().find((p) => p.id === id);

  const { data, error } = await supabase()
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return undefined;
  return toPost(data as Row);
}

export async function getPostsFor(
  section: SectionSlug,
  page = "",
): Promise<Post[]> {
  const all = await getPosts();
  return all.filter(
    (p) => p.section === section && (page === "" || p.page === page),
  );
}

/* ---------------------------------------------------------------- writes */

export async function savePost(post: Post): Promise<void> {
  if (!supabaseConfigured()) {
    ensureDir();
    fs.writeFileSync(
      path.join(DIR, `${post.id}.json`),
      JSON.stringify(post, null, 2),
    );
    return;
  }

  const { error } = await supabase()
    .from("posts")
    .upsert({
      id: post.id,
      section: post.section,
      page: post.page,
      title: post.title,
      tagline: post.tagline,
      body: post.body,
      image: post.image,
      created_at: post.createdAt,
      updated_at: post.updatedAt,
    });

  if (error) throw new Error(error.message);
}

export async function deletePost(id: string): Promise<void> {
  if (!supabaseConfigured()) {
    const file = path.join(DIR, `${id}.json`);
    if (fs.existsSync(file)) fs.unlinkSync(file);
    return;
  }

  const { error } = await supabase().from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/**
 * Article number, derived from the moment of publication:
 * `20260923-114233`. Readable, sorts chronologically, and unique without
 * needing to read the table first. A second of collision is resolved by
 * stepping forward until the id is free.
 */
export async function nextId(at = new Date()): Promise<string> {
  const pad = (n: number, w = 2) => String(n).padStart(w, "0");
  const stamp = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-` +
    `${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;

  const taken = new Set((await getPosts()).map((p) => p.id));
  const d = new Date(at);
  let id = stamp(d);
  while (taken.has(id)) {
    d.setSeconds(d.getSeconds() + 1);
    id = stamp(d);
  }
  return id;
}

/* ---------------------------------------------------------------- status */

export async function storageStatus(): Promise<StorageStatus> {
  if (!supabaseConfigured()) {
    const writable = fsCanWrite();
    return {
      backend: "filesystem",
      writable,
      detail: writable
        ? "Saving to content/posts on disk. Fine locally; set the Supabase variables before posting from the deployed site."
        : "This environment has a read-only filesystem and Supabase is not configured, so nothing can be saved. See README — Console storage.",
    };
  }

  // A cheap round trip proves the table exists and the key works, which is
  // exactly the thing most likely to be misconfigured.
  const { error } = await supabase()
    .from("posts")
    .select("id", { count: "exact", head: true });

  if (error) {
    return {
      backend: "supabase",
      writable: false,
      detail: `Supabase is configured but the posts table could not be read: ${error.message}. Run supabase/schema.sql in the SQL editor.`,
    };
  }

  return {
    backend: "supabase",
    writable: true,
    detail: "Connected to Supabase.",
  };
}
