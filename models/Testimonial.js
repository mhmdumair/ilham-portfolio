import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "" },
    quote: { type: String, required: true },
    avatar: { type: String, default: "/images/placeholders/avatar-sarah.png" },
    avatarPublicId: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    approved: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
