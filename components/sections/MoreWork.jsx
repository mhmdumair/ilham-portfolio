"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import PortfolioGrid from "../PortfolioGrid";

export default function MoreWork({ categories, itemsByCategory }) {
  const [active, setActive] = useState(categories[0].slug);
  const activeCategory = categories.find((c) => c.slug === active);
  const items = (itemsByCategory[active] || []).slice(0, 8);

  return (
    <section className="relative overflow-hidden bg-navy pb-10 pt-20 sm:pb-14 sm:pt-28">
      <Sparkles
        className="pointer-events-none absolute right-10 top-10 text-brand-amber/30"
        size={20}
      />
      <span className="pointer-events-none absolute bottom-20 left-8 h-2 w-2 rounded-full bg-brand-teal/60" />

      <div className="section-container">
        <Reveal className="text-center">
          <SectionLabel>More Work</SectionLabel>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
            More Creative Work
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActive(cat.slug)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === cat.slug
                  ? "bg-gradient-brand text-white"
                  : "text-white/70 ring-1 ring-inset ring-white/20 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </Reveal>

        <div className="mt-10">
          <PortfolioGrid items={items} dark />
        </div>

        <Reveal className="mt-12 flex justify-center" delay={0.1}>
          <Button href={activeCategory.route} variant="primary">
            View All {activeCategory.label} <span aria-hidden>↗</span>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
