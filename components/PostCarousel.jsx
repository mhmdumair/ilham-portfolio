"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import FilterTabs from "./ui/FilterTabs";
import Lightbox from "./ui/Lightbox";

const defaultCategories = ["All", "Instagram", "Facebook", "Promotional", "Event"];

export default function PostCarousel({
  items = [],
  showFilters = true,
  layout = "carousel",
}) {
  const [active, setActive] = useState("All");
  const [lightboxImage, setLightboxImage] = useState(null);
  const scrollerRef = useRef(null);

  const categories = [
    "All",
    ...Array.from(new Set(items.map((i) => i.tag).filter(Boolean))),
  ];
  const tabCategories = categories.length > 1 ? categories : defaultCategories;

  const filtered =
    active === "All" ? items : items.filter((p) => p.tag === active);

  const scrollBy = (dir) => {
    scrollerRef.current?.scrollBy({
      left: dir * 260,
      behavior: "smooth",
    });
  };

  const isGrid = layout === "grid";

  return (
    <div>
      {showFilters && (
        <div className="mb-10">
          <FilterTabs
            categories={tabCategories}
            active={active}
            onChange={setActive}
            layoutId="post-filter-pill"
            variant="hot"
          />
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/15 py-24 text-center text-muted">
          <ImageOff size={24} />
          <p className="text-sm">No posts added yet — check back soon.</p>
        </div>
      ) : (
        <div className="relative">
          {!isGrid && (
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg ring-1 ring-ink/5 transition-transform hover:scale-110 active:scale-95 sm:grid sm:place-items-center"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          <div
            ref={scrollerRef}
            className={
              isGrid
                ? "grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
                : "scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
            }
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((post) => (
                <motion.button
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() =>
                    setLightboxImage({ src: post.imageUrl, alt: post.title })
                  }
                  className={
                    isGrid
                      ? "aspect-[3/4] w-full overflow-hidden rounded-2xl text-left shadow-md ring-1 ring-ink/5"
                      : "aspect-[3/4] w-40 flex-shrink-0 snap-start overflow-hidden rounded-2xl text-left shadow-md ring-1 ring-ink/5 sm:w-48"
                  }
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 45vw, 200px"
                    />
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {!isGrid && (
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 rounded-full bg-white p-2 shadow-lg ring-1 ring-ink/5 transition-transform hover:scale-110 active:scale-95 sm:grid sm:place-items-center"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      )}

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  );
}
