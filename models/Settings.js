import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, default: "site" },
    aboutPhoto: { type: String, default: "/images/placeholders/about-photo.png" },
    aboutPhotoPublicId: { type: String, default: "" },
    aboutText: {
      type: String,
      default:
        "I help businesses and individuals bring their ideas to life through clean, modern and effective design. Whether it's a logo, social media post or custom graphic, I focus on quality, creativity and impact.",
    },
    email: { type: String, default: "umairdesigns@email.com" },
    phone: { type: String, default: "+94 77 123 4567" },
    location: { type: String, default: "Sri Lanka" },
    whatsapp: { type: String, default: "94771234567" },
    socialLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      behance: { type: String, default: "" },
      dribbble: { type: String, default: "" },
    },
    passwordHash: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
