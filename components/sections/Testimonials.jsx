import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import SectionLabel from "../ui/SectionLabel";
import Reveal from "../ui/Reveal";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="section-container">
        <Reveal className="text-center">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
            What Clients Say
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="relative h-full rounded-2xl bg-white p-6 shadow-md shadow-ink/5 ring-1 ring-ink/5">
                <Quote className="text-brand-pink/30" size={28} />
                <p className="mt-3 text-sm text-muted">{t.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-brand-violet">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className={
                        idx < t.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-ink/10 text-ink/10"
                      }
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
