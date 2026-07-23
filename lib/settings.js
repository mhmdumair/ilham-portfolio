import { connectDB } from "./mongodb";
import Settings from "@/models/Settings";

export async function getSettings() {
  await connectDB();
  let doc = await Settings.findOne({ key: "site" });
  if (!doc) doc = await Settings.create({ key: "site" });
  return doc;
}

export function serializeSettings(doc) {
  return {
    aboutPhoto: doc.aboutPhoto,
    aboutText: doc.aboutText,
    email: doc.email,
    phone: doc.phone,
    location: doc.location,
    whatsapp: doc.whatsapp,
    socialLinks: {
      facebook: doc.socialLinks?.facebook || "",
      instagram: doc.socialLinks?.instagram || "",
      behance: doc.socialLinks?.behance || "",
      dribbble: doc.socialLinks?.dribbble || "",
    },
  };
}
