import mongoose from "mongoose";
import { categorySlugs } from "@/lib/categories";

const ImageSchema = new mongoose.Schema(
  {
    category: { type: String, enum: categorySlugs, required: true, index: true },
    title: { type: String, required: true },
    tag: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);
