"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  BehanceIcon,
  DribbbleIcon,
  WhatsAppIcon,
} from "../icons/SocialIcons";
import Reveal from "../ui/Reveal";
import { getWhatsAppLink } from "@/lib/contact";

const contactInfo = [
  { icon: Mail, label: "Email", value: "umairdesigns@email.com", bg: "bg-brand-pink" },
  { icon: Phone, label: "Phone", value: "+94 77 123 4567", bg: "bg-emerald-500" },
  { icon: MapPin, label: "Location", value: "Sri Lanka", bg: "bg-brand-violet" },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Chat with me directly",
    bg: "bg-[#25D366]",
    href: getWhatsAppLink(),
  },
];

const socials = [FacebookIcon, InstagramIcon, BehanceIcon, DribbbleIcon];

export default function ContactFooter() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-gradient-footer text-white">
      <div className="section-container py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr_0.9fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Let&apos;s Work Together
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
              Have a project in mind?
            </h2>
            <p className="mt-4 max-w-xs text-white/80">
              Have a project in mind or want to collaborate? Feel free to
              reach out, I&apos;d love to hear from you.
            </p>

            <div className="mt-8 flex gap-3">
              {socials.map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="social link"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur-sm"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm placeholder-white/60 outline-none backdrop-blur-sm focus:border-white/50"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm placeholder-white/60 outline-none backdrop-blur-sm focus:border-white/50"
                />
              </div>
              <textarea
                placeholder="Your Message"
                rows={4}
                required
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm placeholder-white/60 outline-none backdrop-blur-sm focus:border-white/50"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-pink shadow-lg"
              >
                <Send size={15} />
                {submitted ? "Message Sent!" : "Send Message"}
              </motion.button>
            </form>
          </Reveal>

          <Reveal delay={0.2} className="flex flex-col gap-5">
            {contactInfo.map((item) => {
              const content = (
                <>
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${item.bg}`}
                  >
                    <item.icon size={16} />
                  </span>
                  <div>
                    <p className="text-xs text-white/70">{item.label}</p>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                </>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-opacity hover:opacity-80"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label} className="flex items-center gap-3">
                  {content}
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>

      <div className="border-t border-white/15 py-6 text-center text-xs text-white/70">
        © {new Date().getFullYear()} Ilham Designs. All Rights Reserved.
      </div>
    </footer>
  );
}
