import Link from "next/link";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";

export default function PageHeader({ label, title, description }) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-24">
      <div className="section-container text-center">
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">{description}</p>
          <Link
            href="/"
            className="mt-6 inline-block text-sm font-medium text-white/60 underline-offset-4 hover:text-white hover:underline"
          >
            ← Back to Home
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
