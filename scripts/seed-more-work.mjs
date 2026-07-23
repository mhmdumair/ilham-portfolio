import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import mongoose from "mongoose";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function loadEnv() {
  const text = readFileSync(path.join(root, ".env"), "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnv();

// Placeholder images generated locally (Cloudinary upload is currently blocked by a
// permission-restricted API key — see prior conversation). These use the same
// local-file scheme as the logo/posts seed data.

const ImageSchema = new mongoose.Schema(
  { category: String, title: String, tag: String, imageUrl: String, publicId: String, order: Number },
  { timestamps: true }
);
const Image = mongoose.models.Image || mongoose.model("Image", ImageSchema);

const data = {
  flyer: [
    { file: "flyer-1.jpg", title: "Summer Sale Flyer", tag: "Promotional" },
    { file: "flyer-2.jpg", title: "Grand Opening Flyer", tag: "Event" },
    { file: "flyer-3.jpg", title: "Restaurant Menu Flyer", tag: "Food & Beverage" },
    { file: "flyer-4.jpg", title: "Fitness Class Flyer", tag: "Health & Fitness" },
  ],
  packaging: [
    { file: "packaging-1.jpg", title: "Skincare Box Mockup", tag: "Cosmetics" },
    { file: "packaging-2.jpg", title: "Coffee Bag Packaging", tag: "Food & Beverage" },
    { file: "packaging-3.jpg", title: "Product Bottle Mockup", tag: "Wellness" },
    { file: "packaging-4.jpg", title: "Gift Box Packaging", tag: "Retail" },
  ],
  thumbnail: [
    { file: "thumbnail-1.jpg", title: "Tech Review Thumbnail", tag: "YouTube" },
    { file: "thumbnail-2.jpg", title: "Vlog Thumbnail", tag: "YouTube" },
    { file: "thumbnail-3.jpg", title: "Tutorial Thumbnail", tag: "YouTube" },
    { file: "thumbnail-4.jpg", title: "Gaming Thumbnail", tag: "YouTube" },
  ],
  resume: [
    { file: "resume-1.jpg", title: "Modern Resume Template", tag: "Corporate" },
    { file: "resume-2.jpg", title: "Creative CV Design", tag: "Design" },
    { file: "resume-3.jpg", title: "Minimal Resume Layout", tag: "Minimal" },
    { file: "resume-4.jpg", title: "Executive Resume", tag: "Corporate" },
  ],
  other: [
    { file: "other-1.jpg", title: "Business Card Design", tag: "Print" },
    { file: "other-2.jpg", title: "Event Banner Design", tag: "Print" },
    { file: "other-3.jpg", title: "Menu Card Design", tag: "Print" },
    { file: "other-4.jpg", title: "Certificate Design", tag: "Print" },
  ],
};

async function seedLocal(slug, items) {
  const existingCount = await Image.countDocuments({ category: slug });
  if (existingCount > 0) {
    console.log(`Skipping ${slug}: already has ${existingCount} image(s).`);
    return;
  }
  let order = 0;
  for (const item of items) {
    await Image.create({
      category: slug,
      title: item.title,
      tag: item.tag,
      imageUrl: `/images/placeholders/${item.file}`,
      publicId: `local:${item.file}`,
      order: order++,
    });
    console.log(`Seeded (local file): [${slug}] ${item.title}`);
  }
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  for (const [slug, items] of Object.entries(data)) {
    await seedLocal(slug, items);
  }

  console.log("Seed complete.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
