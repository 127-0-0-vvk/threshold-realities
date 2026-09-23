import crypto from "node:crypto";
import { cookies } from "next/headers";

/**
 * Single-password gate for the console.
 *
 * The password itself is never stored in the cookie. We store an HMAC of the
 * issue time signed with ADMIN_SECRET, so a cookie cannot be forged without
 * the secret and expires on its own.
 */

const COOKIE = "tr_console";
const MAX_AGE_SECONDS = 60 * 60 * 12;

function secret(): string {
  return process.env.ADMIN_SECRET ?? "";
}

export function isConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && secret());
}

function sign(issuedAt: string): string {
  return crypto.createHmac("sha256", secret()).update(issuedAt).digest("hex");
}

export function createToken(): string {
  const issuedAt = String(Date.now());
  return `${issuedAt}.${sign(issuedAt)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token || !secret()) return false;
  const [issuedAt, mac] = token.split(".");
  if (!issuedAt || !mac) return false;

  const expected = sign(issuedAt);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  const age = (Date.now() - Number(issuedAt)) / 1000;
  return Number.isFinite(age) && age >= 0 && age < MAX_AGE_SECONDS;
}

export function checkPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function isSignedIn(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(COOKIE)?.value);
}

export const cookieName = COOKIE;
export const cookieMaxAge = MAX_AGE_SECONDS;
