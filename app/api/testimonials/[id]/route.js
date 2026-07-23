import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import cloudinary from "@/lib/cloudinary";
import { isAuthed } from "@/lib/authGuard";
import { serializeTestimonial } from "@/lib/testimonials";
import { revalidatePath } from "next/cache";

export async function PATCH(request, { params }) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  await connectDB();
  const doc = await Testimonial.findById(id);
  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (typeof body.approved === "boolean") doc.approved = body.approved;
  await doc.save();

  revalidatePath("/");

  return NextResponse.json(serializeTestimonial(doc));
}

export async function DELETE(request, { params }) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();
  const doc = await Testimonial.findById(id);
  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (doc.avatarPublicId) {
    try {
      await cloudinary.uploader.destroy(doc.avatarPublicId);
    } catch {
      // continue removing the DB record even if the remote asset is already gone
    }
  }

  await doc.deleteOne();
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
