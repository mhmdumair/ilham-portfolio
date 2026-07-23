import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function GET(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const payload = await verifySessionToken(token);
  return NextResponse.json({ authenticated: !!payload });
}
