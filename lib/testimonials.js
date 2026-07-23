import { connectDB } from "./mongodb";
import Testimonial from "@/models/Testimonial";

export function serializeTestimonial(doc) {
  return {
    id: doc._id.toString(),
    name: doc.name,
    role: doc.role || "",
    quote: doc.quote,
    avatar: doc.avatar,
    rating: doc.rating,
    approved: doc.approved,
  };
}

export async function getApprovedTestimonials() {
  await connectDB();
  const docs = await Testimonial.find({ approved: true })
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return docs.map(serializeTestimonial);
}
