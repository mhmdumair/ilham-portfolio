import { NextResponse } from "next/server";
import { getSettings } from "@/lib/settings";
import { isAuthed } from "@/lib/authGuard";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Image file is required" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  let uploadResult;
  try {
    uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "ilham-designs/profile" },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(buffer);
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Cloudinary upload failed: ${err.message || "unknown error"}` },
      { status: 502 }
    );
  }

  const settings = await getSettings();
  const oldPublicId = settings.aboutPhotoPublicId;

  settings.aboutPhoto = uploadResult.secure_url;
  settings.aboutPhotoPublicId = uploadResult.public_id;
  await settings.save();

  if (oldPublicId) {
    try {
      await cloudinary.uploader.destroy(oldPublicId);
    } catch {
      // old asset may already be gone
    }
  }

  revalidatePath("/");

  return NextResponse.json({ aboutPhoto: settings.aboutPhoto });
}
