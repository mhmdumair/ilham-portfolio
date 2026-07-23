import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";
import { getCategory } from "@/lib/categories";
import { isAuthed } from "@/lib/authGuard";
import { revalidatePath } from "next/cache";

export async function PATCH(request) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { category, ids } = await request.json();
  if (!category || !Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "category and ids[] are required" }, { status: 400 });
  }

  await connectDB();
  await Promise.all(
    ids.map((id, index) =>
      Image.updateOne({ _id: id, category }, { $set: { order: index } })
    )
  );

  revalidatePath("/");
  const cat = getCategory(category);
  if (cat) revalidatePath(cat.route);

  return NextResponse.json({ ok: true });
}
