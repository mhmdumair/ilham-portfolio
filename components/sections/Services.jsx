import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import IconBadge from "../ui/IconBadge";
import SectionLabel from "../ui/SectionLabel";
import Reveal from "../ui/Reveal";

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="section-container">
        <Reveal className="text-center">
          <SectionLabel>Services</SectionLabel>
          <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
            How I Can Help You
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08}>
              <Link
                href={service.href}
                className="group block h-full rounded-2xl bg-white p-6 shadow-md shadow-ink/5 ring-1 ring-ink/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10"
              >
                <IconBadge icon={service.icon} color={service.color} size="lg" />
                <h3 className="mt-5 font-heading text-lg font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-violet">
                  Learn More
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
