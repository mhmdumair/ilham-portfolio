"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ImageOff } from "lucide-react";
import Lightbox from "./ui/Lightbox";

export default function PortfolioGrid({ items = [], dark = false }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  if (items.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed py-24 text-center ${
          dark ? "border-white/15 text-white/50" : "border-ink/15 text-muted"
        }`}
      >
        <ImageOff size={24} />
        <p className="text-sm">No projects added to this section yet — check back soon.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -6 }}
              onClick={() =>
                setLightboxImage({ src: item.imageUrl, alt: item.title })
              }
              className={`group aspect-[4/5] overflow-hidden rounded-2xl text-left shadow-md ${
                dark ? "bg-navy-soft ring-1 ring-white/10" : "bg-black/5 ring-1 ring-black/5"
              }`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 45vw, 260px"
                />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  );
}
