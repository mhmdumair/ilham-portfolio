"use client";

import { motion } from "framer-motion";

export default function FilterTabs({
  categories,
  active,
  onChange,
  layoutId,
  variant = "brand",
}) {
  const activePillClass =
    variant === "hot" ? "bg-gradient-hot" : "bg-gradient-brand";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "text-white"
                : variant === "hot"
                  ? "text-ink/70 ring-1 ring-inset ring-ink/15 hover:text-ink"
                  : "text-white/70 ring-1 ring-inset ring-white/20 hover:text-white"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className={`absolute inset-0 rounded-full ${activePillClass}`}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
