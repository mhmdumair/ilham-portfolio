import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import cloudinary from "@/lib/cloudinary";
import { isAuthed } from "@/lib/authGuard";
import { serializeTestimonial } from "@/lib/testimonials";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const docs = await Testimonial.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(docs.map(serializeTestimonial));
}

export async function POST(request) {
  const authed = await isAuthed(request);
  const contentType = request.headers.get("content-type") || "";

  let name, role, quote, rating, file;

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    name = formData.get("name");
    role = formData.get("role") || "";
    quote = formData.get("quote");
    rating = Number(formData.get("rating")) || 5;
    file = formData.get("file");
  } else {
    const body = await request.json().catch(() => ({}));
    name = body.name;
    role = body.role || "";
    quote = body.quote;
    rating = Number(body.rating) || 5;
  }

  if (!name || !quote) {
    return NextResponse.json({ error: "Name and quote are required" }, { status: 400 });
  }
  const clampedRating = Math.min(5, Math.max(1, rating));

  await connectDB();

  let avatar;
  let avatarPublicId = "";

  if (authed && file && typeof file !== "string") {
    const buffer = Buffer.from(await file.arrayBuffer());
    try {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "ilham-designs/testimonials" },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(buffer);
      });
      avatar = uploadResult.secure_url;
      avatarPublicId = uploadResult.public_id;
    } catch (err) {
      return NextResponse.json(
        { error: `Cloudinary upload failed: ${err.message || "unknown error"}` },
        { status: 502 }
      );
    }
  }

  const doc = await Testimonial.create({
    name,
    role,
    quote,
    rating: clampedRating,
    approved: authed,
    ...(avatar ? { avatar, avatarPublicId } : {}),
  });

  revalidatePath("/");

  return NextResponse.json(serializeTestimonial(doc));
}
