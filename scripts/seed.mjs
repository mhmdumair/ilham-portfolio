import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import mongoose from "mongoose";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// minimal .env loader (no extra dependency)
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

// NOTE: seeding uses the existing local placeholder files directly (no Cloudinary
// upload) because the CLOUDINARY_API_KEY in .env is currently permission-restricted
// (403: "missing permissions (actions=[create])"). Real dashboard uploads still go
// through Cloudinary — see app/api/images/route.js — and will work once that key's
// permissions are fixed in the Cloudinary console.

const ImageSchema = new mongoose.Schema(
  {
    category: String,
    title: String,
    tag: String,
    imageUrl: String,
    publicId: String,
    order: Number,
  },
  { timestamps: true }
);
const Image = mongoose.models.Image || mongoose.model("Image", ImageSchema);

const logos = [
  { name: "Infinity Fitness", file: "logo-infinity.png", category: "Abstract" },
  { name: "Leafora Natural Beauty", file: "logo-leafora.png", category: "Minimal" },
  { name: "Wardiere Inc.", file: "logo-wardiere.png", category: "Typography" },
  { name: "Pixora Studio", file: "logo-pixora-logo.png", category: "Modern" },
  { name: "Axion Technologies", file: "logo-axion-logo.png", category: "Abstract" },
  { name: "Coffee House", file: "logo-coffeehouse.png", category: "Minimal" },
];

const posts = [
  { name: "Super Delicious Burger", file: "post-burger.png", category: "Promotional" },
  { name: "Time To Travel", file: "post-travel.png", category: "Instagram" },
  { name: "Coffee Time", file: "post-coffee.png", category: "Instagram" },
  { name: "Digital Marketing Agency", file: "post-digital-marketing.png", category: "Facebook" },
  { name: "Stay Strong Never Give Up", file: "post-fitness.png", category: "Event" },
  { name: "Big Sale", file: "post-sale.png", category: "Promotional" },
];

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
      title: item.name,
      tag: item.category,
      imageUrl: `/images/placeholders/${item.file}`,
      publicId: `local:${item.file}`,
      order: order++,
    });
    console.log(`Seeded (local file): [${slug}] ${item.name}`);
  }
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  await seedLocal("logo", logos);
  await seedLocal("posts", posts);

  console.log("Seed complete.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
