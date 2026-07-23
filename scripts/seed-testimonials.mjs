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

const TestimonialSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    quote: String,
    avatar: String,
    avatarPublicId: String,
    rating: Number,
    approved: Boolean,
    order: Number,
  },
  { timestamps: true }
);
const Testimonial =
  mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);

const dummy = [
  {
    name: "Sarah Khan",
    role: "Business Owner",
    quote:
      "Ilham designed a logo for my business that perfectly represents my brand. Highly creative and professional!",
    avatar: "/images/placeholders/avatar-sarah.png",
    rating: 5,
  },
  {
    name: "Ali Raza",
    role: "Marketing Manager",
    quote:
      "The social media posts he created for us increased engagement tremendously. Great work and on-time delivery!",
    avatar: "/images/placeholders/avatar-ali.png",
    rating: 5,
  },
  {
    name: "Zainab Noor",
    role: "Entrepreneur",
    quote:
      "Very talented and easy to work with. Understood my ideas and delivered exactly what I wanted.",
    avatar: "/images/placeholders/avatar-zainab.png",
    rating: 5,
  },
];

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  const existingCount = await Testimonial.countDocuments({});
  if (existingCount > 0) {
    console.log(`Skipping: already has ${existingCount} testimonial(s).`);
    await mongoose.disconnect();
    return;
  }

  let order = 0;
  for (const item of dummy) {
    await Testimonial.create({ ...item, approved: true, order: order++ });
    console.log(`Seeded testimonial: ${item.name}`);
  }

  console.log("Seed complete.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
