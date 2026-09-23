import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { isSignedIn } from "@/lib/admin-auth";

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

  const dir = path.join(process.cwd(), "public", "uploads");
  try {
    fs.mkdirSync(dir, { recursive: true });
    const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(dir, name), bytes);
    return NextResponse.json({ ok: true, url: `/uploads/${name}` });
  } catch {
    return NextResponse.json(
      {
        error:
          "This environment has a read-only filesystem, so uploads are not possible here. See README — Console storage.",
      },
      { status: 503 },
    );
  }
}
