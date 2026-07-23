import { NextResponse } from "next/server";
import { getSettings, serializeSettings } from "@/lib/settings";
import { isAuthed } from "@/lib/authGuard";
import { revalidatePath } from "next/cache";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(serializeSettings(settings));
}

export async function PATCH(request) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const settings = await getSettings();

  const fields = ["aboutText", "email", "phone", "location", "whatsapp"];
  for (const field of fields) {
    if (typeof body[field] === "string") settings[field] = body[field];
  }

  if (body.socialLinks && typeof body.socialLinks === "object") {
    for (const key of ["facebook", "instagram", "behance", "dribbble"]) {
      if (typeof body.socialLinks[key] === "string") {
        settings.socialLinks[key] = body.socialLinks[key];
      }
    }
  }

  await settings.save();
  revalidatePath("/");

  return NextResponse.json(serializeSettings(settings));
}
