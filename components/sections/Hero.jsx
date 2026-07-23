"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Pen, PenTool, Type, Grid3x3, Wand2, Pencil } from "lucide-react";
import Button from "../ui/Button";
import SectionLabel from "../ui/SectionLabel";

const collageCards = [
  {
    src: "/images/placeholders/hero-axion.png",
    alt: "Axion Technologies logo design",
    className: "left-2 top-4 w-40 rotate-[-6deg] sm:w-48",
    delay: 0,
  },
  {
    src: "/images/placeholders/hero-burger.png",
    alt: "Super Delicious Burger social post",
    className: "right-0 top-0 w-36 rotate-[5deg] sm:w-44",
    delay: 0.6,
  },
  {
    src: "/images/placeholders/hero-adventure.png",
    alt: "Adventure Awaits poster design",
    className: "left-0 bottom-0 w-36 rotate-[4deg] sm:w-44",
    delay: 1.2,
  },
  {
    src: "/images/placeholders/hero-pixora.png",
    alt: "Pixora Studio logo design",
    className: "right-2 bottom-4 w-40 rotate-[-4deg] sm:w-48",
    delay: 1.8,
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-violet/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-brand-orange/10 blur-3xl" />
      </div>

      <div className="section-container grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionLabel>Freelance Graphic Designer</SectionLabel>
          </Reveal>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-heading text-2xl font-extrabold leading-[1.15] text-ink sm:text-4xl lg:text-5xl"
          >
            Bringing Ideas to Life with{" "}
            <span className="text-gradient-brand">Creative Design</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-md text-muted"
          >
            I create standout logos, eye-catching posts, and independent
            graphics that help brands grow and leave a lasting impression.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button href="/logo-design" variant="primary">
              View My Work <span aria-hidden>↓</span>
            </Button>
            <Button href="/#contact" variant="outline">
              Hire Me <span aria-hidden>↗</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex items-center gap-2 text-sm text-muted"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Available for freelance projects
          </motion.div>
        </div>

        <div className="relative mx-auto h-[360px] w-full max-w-md sm:h-[420px]">
          {collageCards.map((card) => (
            <motion.div
              key={card.src}
              className={`absolute overflow-hidden rounded-2xl shadow-2xl shadow-violet-900/10 ring-1 ring-black/5 ${card.className}`}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.delay,
              }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
            >
              <Image
                src={card.src}
                alt={card.alt}
                width={220}
                height={180}
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}

          <motion.div
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl bg-navy px-2 py-3 shadow-xl"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {[Pen, PenTool, Type, Grid3x3, Wand2].map((Icon, i) => (
              <Icon key={i} size={14} className="text-white/80" />
            ))}
          </motion.div>

          <span className="absolute -right-3 top-1/3 h-3 w-3 rounded-full bg-red-400" />
          <span className="absolute -right-3 top-1/3 mt-5 h-3 w-3 rounded-full bg-amber-400" />
          <span className="absolute -right-3 top-1/3 mt-10 h-3 w-3 rounded-full bg-teal-400" />

          <Pencil
            className="absolute -bottom-2 right-6 text-ink/30"
            size={40}
          />
        </div>
      </div>
    </section>
  );
}

function Reveal({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      {children}
    </motion.div>
  );
}
