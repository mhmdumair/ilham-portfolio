import { SignJWT, jwtVerify } from "jose";
import { createHash } from "crypto";

export const SESSION_COOKIE = "ilham_session";

function getSecretKey() {
  const base = process.env.PASSWORD || "ilham-designs-fallback-secret";
  const hash = createHash("sha256").update(`ilham-designs::${base}`).digest();
  return hash;
}

export async function createSessionToken() {
  const secret = getSecretKey();
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}
