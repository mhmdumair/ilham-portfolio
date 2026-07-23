import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";
import cloudinary from "@/lib/cloudinary";
import { getCategory } from "@/lib/categories";
import { isAuthed } from "@/lib/authGuard";
import { revalidatePath } from "next/cache";

export async function DELETE(request, { params }) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();
  const doc = await Image.findById(id);
  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (doc.publicId && !doc.publicId.startsWith("local:")) {
    try {
      await cloudinary.uploader.destroy(doc.publicId);
    } catch {
      // continue removing the DB record even if the remote asset is already gone
    }
  }

  await doc.deleteOne();

  revalidatePath("/");
  const cat = getCategory(doc.category);
  if (cat) revalidatePath(cat.route);

  return NextResponse.json({ ok: true });
}
