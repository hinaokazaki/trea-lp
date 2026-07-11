// Route Handler / Server Component 用の認証ヘルパー(Nodeランタイム専用)。
import { scrypt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "./session";

// ADMIN_PASSWORD_HASH の形式: "scrypt:<saltBase64>:<hashBase64>"
// scripts/hash-password.mjs で生成する。
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split(":");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  const salt = Buffer.from(parts[1], "base64");
  const expected = Buffer.from(parts[2], "base64");
  const actual = await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, expected.length, (err, derived) =>
      err ? reject(err) : resolve(derived)
    );
  });
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminEmail || !adminHash) return false;

  // メール不一致でもパスワード検証を実行し、応答時間から情報が漏れないようにする
  const emailOk =
    email.length === adminEmail.length &&
    timingSafeEqual(Buffer.from(email), Buffer.from(adminEmail));
  const passwordOk = await verifyPassword(password, adminHash);
  return emailOk && passwordOk;
}

/** 現在のリクエストのセッションを返す(未認証なら null) */
export async function getAdminSession() {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

/** 管理APIの認証ガード。未認証なら 401 レスポンスを返す。 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }
  return null;
}

export function sessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
