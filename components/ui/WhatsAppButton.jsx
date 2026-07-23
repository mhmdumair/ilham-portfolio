"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "../icons/SocialIcons";
import { getWhatsAppLink } from "@/lib/contact";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
      <WhatsAppIcon size={22} className="relative" />
    </motion.a>
  );
}
