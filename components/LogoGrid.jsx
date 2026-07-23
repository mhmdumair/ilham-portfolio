"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ImageOff } from "lucide-react";
import FilterTabs from "./ui/FilterTabs";
import Lightbox from "./ui/Lightbox";

const defaultCategories = ["All", "Minimal", "Modern", "Typography", "Abstract"];

export default function LogoGrid({ items = [], showFilters = true }) {
  const [active, setActive] = useState("All");
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = [
    "All",
    ...Array.from(new Set(items.map((i) => i.tag).filter(Boolean))),
  ];
  const tabCategories = categories.length > 1 ? categories : defaultCategories;

  const filtered =
    active === "All" ? items : items.filter((l) => l.tag === active);

  return (
    <div>
      {showFilters && (
        <div className="mb-10">
          <FilterTabs
            categories={tabCategories}
            active={active}
            onChange={setActive}
            layoutId="logo-filter-pill"
          />
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 py-24 text-center text-white/50">
          <ImageOff size={24} />
          <p className="text-sm">No logos added yet — check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((logo) => (
              <motion.button
                key={logo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                onClick={() =>
                  setLightboxImage({ src: logo.imageUrl, alt: logo.title })
                }
                className="group aspect-square overflow-hidden rounded-2xl bg-navy-soft text-left ring-1 ring-white/10"
              >
                <div className="relative h-full w-full grayscale transition-all duration-300 group-hover:grayscale-0">
                  <Image
                    src={logo.imageUrl}
                    alt={logo.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 45vw, 180px"
                  />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  );
}
