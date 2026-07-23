import { NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { verifyPassword } from "@/lib/password";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { password } = body;

  if (!password) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const settings = await getSettings();
  const valid = settings.passwordHash
    ? verifyPassword(password, settings.passwordHash)
    : password === process.env.PASSWORD;

  if (!valid) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
