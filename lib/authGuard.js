import { SESSION_COOKIE, verifySessionToken } from "./auth";

export async function isAuthed(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const payload = await verifySessionToken(token);
  return !!payload;
}
