import Image from "next/image";
import Link from "next/link";
import { aboutStats, whatIDo } from "@/data/services";
import IconBadge from "../ui/IconBadge";
import SectionLabel from "../ui/SectionLabel";
import Reveal from "../ui/Reveal";

export default function AboutMe({ settings }) {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="section-container">
        <div className="rounded-3xl bg-white/60 p-6 shadow-sm ring-1 ring-ink/5 sm:p-10">
          <div className="grid gap-12 lg:grid-cols-[280px_1fr_320px] lg:items-center">
            <Reveal>
              <div className="relative mx-auto w-64">
                <div className="absolute inset-0 -rotate-6 rounded-[2rem] bg-gradient-brand opacity-80 blur-[2px]" />
                <div className="relative aspect-[256/280] overflow-hidden rounded-[2rem] ring-4 ring-white">
                  <Image
                    src={settings.aboutPhoto}
                    alt="Mohamad Ilham, graphic designer"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="absolute -bottom-3 -left-4 -rotate-6 font-heading text-lg font-bold text-brand-violet">
                  Let&apos;s Create!
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <SectionLabel>About Me</SectionLabel>
              <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
                I&apos;m Mohamad Ilham, a <em className="text-gradient-brand not-italic">passionate</em>{" "}
                graphic designer.
              </h2>
              <p className="mt-4 text-muted">{settings.aboutText}</p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {aboutStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <IconBadge icon={stat.icon} color={stat.color} />
                    <p className="mt-2 text-xs font-medium text-ink/80">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-2xl bg-white p-6 shadow-lg shadow-ink/5">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-violet">
                  What I Do
                </p>
                <ul className="mt-4 flex flex-col gap-4">
                  {whatIDo.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className="group flex items-start gap-3 rounded-lg -m-1 p-1 transition-colors hover:bg-ink/5"
                      >
                        <IconBadge icon={item.icon} color={item.color} />
                        <div>
                          <p className="text-sm font-semibold text-ink group-hover:text-brand-violet">
                            {item.title}
                          </p>
                          <p className="text-xs text-muted">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
