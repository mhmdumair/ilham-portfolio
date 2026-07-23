import { NextResponse } from "next/server";
import { getSettings } from "@/lib/settings";
import { isAuthed } from "@/lib/authGuard";
import { hashPassword, verifyPassword } from "@/lib/password";

export async function PATCH(request) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await request.json().catch(() => ({}));
  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return NextResponse.json(
      { error: "Current password and a new password (min 6 characters) are required." },
      { status: 400 }
    );
  }

  const settings = await getSettings();
  const valid = settings.passwordHash
    ? verifyPassword(currentPassword, settings.passwordHash)
    : currentPassword === process.env.PASSWORD;

  if (!valid) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });
  }

  settings.passwordHash = hashPassword(newPassword);
  await settings.save();

  return NextResponse.json({ ok: true });
}
