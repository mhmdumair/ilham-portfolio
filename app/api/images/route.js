import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";
import cloudinary from "@/lib/cloudinary";
import { categorySlugs, getCategory } from "@/lib/categories";
import { isAuthed } from "@/lib/authGuard";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const query = category ? { category } : {};
  const docs = await Image.find(query).sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json(
    docs.map((d) => ({
      id: d._id.toString(),
      category: d.category,
      title: d.title,
      tag: d.tag || "",
      imageUrl: d.imageUrl,
      publicId: d.publicId,
    }))
  );
}

export async function POST(request) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const category = formData.get("category");
  const title = formData.get("title");
  const tag = formData.get("tag") || "";
  const file = formData.get("file");

  if (!category || !categorySlugs.includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }
  if (!title || !file || typeof file === "string") {
    return NextResponse.json({ error: "Title and image file are required" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  let uploadResult;
  try {
    uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: `ilham-designs/${category}` },
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

  await connectDB();
  const doc = await Image.create({
    category,
    title,
    tag,
    imageUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
  });

  revalidatePath("/");
  const cat = getCategory(category);
  if (cat) revalidatePath(cat.route);

  return NextResponse.json({
    id: doc._id.toString(),
    category: doc.category,
    title: doc.title,
    tag: doc.tag,
    imageUrl: doc.imageUrl,
    publicId: doc.publicId,
  });
}
