"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, LayoutDashboard } from "lucide-react";
import Button from "./ui/Button";
import { categories } from "@/lib/categories";

const links = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
];

const trailingLinks = [
  { label: "Skills", href: "/#skills" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-page/80 backdrop-blur-md">
      <nav className="section-container flex h-20 items-center justify-between">
        <Link href="/#home" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-lg font-extrabold text-white">
            I
          </span>
          <span className="font-heading text-sm font-bold leading-tight text-ink">
            Ilham
            <br />
            Designs
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group relative text-sm font-medium text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-brand transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}

          <li
            className="relative"
            onMouseEnter={() => setPortfolioOpen(true)}
            onMouseLeave={() => setPortfolioOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-ink/70 transition-colors hover:text-ink">
              Portfolio
              <ChevronDown size={14} />
            </button>
            {portfolioOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                <div className="grid w-56 gap-1 rounded-xl bg-white p-2 shadow-xl ring-1 ring-ink/5">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={cat.route}
                      className="rounded-lg px-3 py-2 text-sm text-ink/75 hover:bg-ink/5 hover:text-ink"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>

          {trailingLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group relative text-sm font-medium text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-brand transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            aria-label="Admin dashboard"
            className="grid h-9 w-9 place-items-center rounded-full text-ink/40 transition-colors hover:bg-ink/5 hover:text-ink/70"
          >
            <LayoutDashboard size={16} />
          </Link>
          <Button href="/#contact" variant="primary" className="text-xs">
            Let&apos;s Work Together
            <span aria-hidden>↗</span>
          </Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-ink/5 bg-page px-6 pb-6 lg:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-ink/80"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-ink/40">
            Portfolio
          </p>
          <ul className="mt-2 flex flex-col gap-3">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={cat.route}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-ink/80"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-5 flex flex-col gap-4">
            {trailingLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-ink/80"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Button href="/#contact" variant="primary" className="mt-5 w-full">
            Let&apos;s Work Together ↗
          </Button>
        </div>
      )}
    </header>
  );
}
