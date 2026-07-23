import { Plus, Heart } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import LogoGrid from "../LogoGrid";

export default function LogoShowcase({ items = [] }) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-28">
      <Plus className="pointer-events-none absolute left-8 top-10 text-white/20" size={18} />
      <Heart className="pointer-events-none absolute right-10 top-16 text-brand-pink/40" size={22} />
      <span className="pointer-events-none absolute bottom-16 left-10 h-2 w-2 rounded-full bg-brand-orange/60" />

      <div className="section-container">
        <Reveal className="text-center">
          <SectionLabel>Logo Design</SectionLabel>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
            Logo Design Work
          </h2>
        </Reveal>

        <div className="mt-12">
          <LogoGrid items={items} />
        </div>

        <Reveal className="mt-12 flex justify-center" delay={0.1}>
          <Button href="/logo-design" variant="primary">
            View All Logo Projects <span aria-hidden>↗</span>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
