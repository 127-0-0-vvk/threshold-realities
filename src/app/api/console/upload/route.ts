import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { isSignedIn } from "@/lib/admin-auth";
import { BUCKET, supabase, supabaseConfigured } from "@/lib/supabase";

const MAX_BYTES = 6 * 1024 * 1024;

/** Extension is decided by us from the detected type, never taken from the upload. */
const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export async function POST(request: Request) {
  if (!(await isSignedIn())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image is larger than 6 MB. Compress it and try again." },
      { status: 413 },
    );
  }

  const ext = ALLOWED[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Use a JPG, PNG, WebP or AVIF image." },
      { status: 415 },
    );
  }

  const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  if (supabaseConfigured()) {
    const { error } = await supabase()
      .storage.from(BUCKET)
      .upload(name, bytes, { contentType: file.type, upsert: false });

    if (error) {
      return NextResponse.json(
        {
          error: `Upload to Supabase failed: ${error.message}. Check that the "${BUCKET}" bucket exists — run supabase/schema.sql.`,
        },
        { status: 502 },
      );
    }

    const { data } = supabase().storage.from(BUCKET).getPublicUrl(name);
    return NextResponse.json({ ok: true, url: data.publicUrl });
  }

  // Local development fallback.
  try {
    const dir = path.join(process.cwd(), "public", "uploads");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, name), bytes);
    return NextResponse.json({ ok: true, url: `/uploads/${name}` });
  } catch {
    return NextResponse.json(
      {
        error:
          "This environment has a read-only filesystem and Supabase is not configured, so uploads are not possible. See README — Console storage.",
      },
      { status: 503 },
    );
  }
}
