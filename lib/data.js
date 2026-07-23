import { connectDB } from "./mongodb";
import Image from "@/models/Image";

function serialize(doc) {
  return {
    id: doc._id.toString(),
    category: doc.category,
    title: doc.title,
    tag: doc.tag || "",
    imageUrl: doc.imageUrl,
    publicId: doc.publicId,
  };
}

export async function getImagesByCategory(category) {
  await connectDB();
  const docs = await Image.find({ category }).sort({ order: 1, createdAt: -1 }).lean();
  return docs.map(serialize);
}

export async function getImagesByCategories(categorySlugs) {
  await connectDB();
  const docs = await Image.find({ category: { $in: categorySlugs } })
    .sort({ order: 1, createdAt: -1 })
    .lean();
  const grouped = {};
  for (const slug of categorySlugs) grouped[slug] = [];
  for (const doc of docs) {
    grouped[doc.category]?.push(serialize(doc));
  }
  return grouped;
}
