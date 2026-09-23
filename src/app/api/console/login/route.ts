import { NextResponse } from "next/server";
import {
  checkPassword,
  cookieMaxAge,
  cookieName,
  createToken,
  isConfigured,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: "Console is not configured. Set ADMIN_PASSWORD and ADMIN_SECRET." },
      { status: 503 },
    );
  }

  const { password } = (await request.json().catch(() => ({}))) as {
    password?: string;
  };

  if (!password || !checkPassword(password)) {
    // Constant-ish delay so timing does not leak whether a password was close.
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieName, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: cookieMaxAge,
  });
  return response;
}
