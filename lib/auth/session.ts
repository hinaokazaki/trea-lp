// HMAC署名付きセッショントークン。
// Web Crypto APIのみを使用し、Edge(middleware)とNode(Route Handler)の両方で動作する。

export const SESSION_COOKIE_NAME = "trea_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7日

type SessionPayload = {
  sub: string; // オーナーのメールアドレス
  exp: number; // UNIX秒
};

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("SESSION_SECRET is not configured (min 16 chars)");
  }
  return secret;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(text: string): Uint8Array | null {
  try {
    const padded = text.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}

async function hmacSign(data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return new Uint8Array(sig);
}

export async function createSessionToken(email: string): Promise<string> {
  const payload: SessionPayload = {
    sub: email,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };
  const body = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = base64UrlEncode(await hmacSign(body));
  return `${body}.${sig}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;

  const expected = await hmacSign(body);
  const actual = base64UrlDecode(sig);
  if (!actual || actual.length !== expected.length) return null;

  // 定数時間比較
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected[i] ^ actual[i];
  if (diff !== 0) return null;

  const payloadBytes = base64UrlDecode(body);
  if (!payloadBytes) return null;
  try {
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as SessionPayload;
    if (typeof payload.sub !== "string" || typeof payload.exp !== "number") return null;
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
