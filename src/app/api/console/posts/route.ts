import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isSignedIn } from "@/lib/admin-auth";
import { canWrite, deletePost, getPost, nextId, savePost } from "@/lib/posts";
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
  if (!canWrite()) {
    return NextResponse.json(
      {
        error:
          "This environment has a read-only filesystem, so posts cannot be saved here. See README — Console storage.",
      },
      { status: 503 },
    );
  }
  return null;
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
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

  const image = clean(data.image, 300);
  if (image && !image.startsWith("/uploads/")) {
    return NextResponse.json({ error: "Invalid image path." }, { status: 400 });
  }

  const existingId = clean(data.id, 20);
  const existing = existingId ? getPost(existingId) : undefined;
  const now = new Date().toISOString();

  const post: Post = {
    id: existing?.id ?? nextId(),
    section,
    page: sectionDef.pages.length > 0 ? page : "",
    title,
    tagline,
    body,
    image: image || null,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  savePost(post);

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
  const post = getPost(id);
  if (!post) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  deletePost(id);

  const sectionDef = sectionOf(post.section);
  if (sectionDef) {
    revalidatePath(sectionDef.basePath);
    if (post.page) revalidatePath(`${sectionDef.basePath}/${post.page}`);
  }
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
