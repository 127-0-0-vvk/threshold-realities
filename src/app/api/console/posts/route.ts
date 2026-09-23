import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isSignedIn } from "@/lib/admin-auth";
import {
  deletePost,
  getPost,
  nextId,
  savePost,
  storageStatus,
} from "@/lib/posts";
import { supabaseHost } from "@/lib/supabase";
import {
  pathForPost,
  sectionOf,
  type Post,
  type SectionSlug,
} from "@/lib/sections";

async function guard() {
  if (!(await isSignedIn())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const status = await storageStatus();
  if (!status.writable) {
    return NextResponse.json({ error: status.detail }, { status: 503 });
  }
  return null;
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isAllowedImage(value: string): boolean {
  if (value.startsWith("/uploads/") && !value.includes("..")) return true;
  const host = supabaseHost();
  if (!host) return false;
  try {
    const u = new URL(value);
    return u.protocol === "https:" && u.hostname === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const blocked = await guard();
  if (blocked) return blocked;

  const data = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  const section = clean(data.section, 40) as SectionSlug;
  const sectionDef = sectionOf(section);
  if (!sectionDef) {
    return NextResponse.json({ error: "Unknown section." }, { status: 400 });
  }

  const page = clean(data.page, 80);
  if (sectionDef.pages.length > 0 && !sectionDef.pages.some((p) => p.slug === page)) {
    return NextResponse.json(
      { error: "Choose a page within that section." },
      { status: 400 },
    );
  }

  const title = clean(data.title, 200);
  const tagline = clean(data.tagline, 400);
  const body = clean(data.body, 120_000);
  if (!title) {
    return NextResponse.json({ error: "A headline is required." }, { status: 400 });
  }
  if (!body) {
    return NextResponse.json({ error: "An article is required." }, { status: 400 });
  }

  // Either a local upload path or a URL inside our own Supabase bucket.
  const image = clean(data.image, 500);
  if (image && !isAllowedImage(image)) {
    return NextResponse.json({ error: "Invalid image path." }, { status: 400 });
  }

  const existingId = clean(data.id, 20);
  const existing = existingId ? await getPost(existingId) : undefined;
  const now = new Date().toISOString();

  const post: Post = {
    id: existing?.id ?? (await nextId()),
    section,
    page: sectionDef.pages.length > 0 ? page : "",
    title,
    tagline,
    body,
    image: image || null,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  try {
    await savePost(post);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Could not save." },
      { status: 500 },
    );
  }

  // Make the new post visible without waiting for a rebuild.
  revalidatePath(sectionDef.basePath);
  if (post.page) revalidatePath(`${sectionDef.basePath}/${post.page}`);
  revalidatePath(pathForPost(post));
  revalidatePath("/");

  return NextResponse.json({ ok: true, post, url: pathForPost(post) });
}

export async function DELETE(request: Request) {
  const blocked = await guard();
  if (blocked) return blocked;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") ?? "";
  const post = await getPost(id);
  if (!post) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  await deletePost(id);

  const sectionDef = sectionOf(post.section);
  if (sectionDef) {
    revalidatePath(sectionDef.basePath);
    if (post.page) revalidatePath(`${sectionDef.basePath}/${post.page}`);
  }
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
