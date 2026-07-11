import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { requireAdmin, sessionCookieOptions } from "@/lib/auth/server";

export async function POST() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, "", sessionCookieOptions(0));
  return response;
}
