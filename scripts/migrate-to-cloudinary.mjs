import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

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

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

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

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  const docs = await Image.find({ publicId: { $regex: /^local:/ } });
  console.log(`Found ${docs.length} local placeholder image(s) to migrate.`);

  let migrated = 0;
  let failed = 0;

  for (const doc of docs) {
    const filePath = path.join(root, "public", doc.imageUrl);
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: `ilham-designs/${doc.category}`,
      });
      doc.imageUrl = result.secure_url;
      doc.publicId = result.public_id;
      await doc.save();
      migrated++;
      console.log(`Migrated: [${doc.category}] ${doc.title} -> ${result.public_id}`);
    } catch (err) {
      failed++;
      console.error(`Failed: [${doc.category}] ${doc.title}:`, err.message);
    }
  }

  console.log(`Migration complete. ${migrated} migrated, ${failed} failed.`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
