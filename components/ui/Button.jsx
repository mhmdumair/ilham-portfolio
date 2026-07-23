"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const MotionLink = motion.create(Link);

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2";

const variants = {
  primary: "bg-gradient-brand text-white shadow-lg shadow-violet-500/25",
  hot: "bg-gradient-hot text-white shadow-lg shadow-pink-500/25",
  outline: "border border-ink/15 bg-white text-ink hover:border-ink/30",
  ghost: "bg-white text-ink shadow-md",
};

const motionProps = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 400, damping: 20 },
};

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  ...props
}) {
  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  if (href) {
    return (
      <MotionLink href={href} className={classes} {...motionProps} {...props}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
