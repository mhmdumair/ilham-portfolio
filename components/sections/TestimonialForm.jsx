"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, MessageSquarePlus, Loader2 } from "lucide-react";

export default function TestimonialForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setRole("");
    setQuote("");
    setRating(5);
    setSubmitted(false);
    setError("");
  };

  const close = () => {
    setOpen(false);
    setTimeout(reset, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role, quote, rating }),
    });
    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mx-auto mt-12 flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-lg"
      >
        <MessageSquarePlus size={16} /> Leave a Review
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
                onClick={close}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={close}
                    aria-label="Close"
                    className="absolute right-4 top-4 text-ink/40 hover:text-ink"
                  >
                    <X size={18} />
                  </button>

                  {submitted ? (
                    <div className="py-6 text-center">
                      <p className="font-heading text-lg font-bold text-ink">Thank you!</p>
                      <p className="mt-2 text-sm text-muted">
                        Your review has been submitted and will appear once approved.
                      </p>
                      <button
                        onClick={close}
                        className="mt-5 rounded-full bg-gradient-brand px-5 py-2 text-sm font-semibold text-white"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      <p className="font-heading text-lg font-bold text-ink">Leave a Review</p>

                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => {
                          const value = idx + 1;
                          const filled = value <= (hoverRating || rating);
                          return (
                            <button
                              type="button"
                              key={value}
                              onMouseEnter={() => setHoverRating(value)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => setRating(value)}
                              aria-label={`${value} star`}
                            >
                              <Star
                                size={22}
                                className={
                                  filled
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-ink/10 text-ink/10"
                                }
                              />
                            </button>
                          );
                        })}
                      </div>

                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-violet"
                      />
                      <input
                        type="text"
                        placeholder="Role / Company (optional)"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-violet"
                      />
                      <textarea
                        required
                        rows={4}
                        placeholder="Your feedback"
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        className="rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-violet"
                      />
                      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow disabled:opacity-60"
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={15} className="animate-spin" /> Submitting...
                          </>
                        ) : (
                          "Submit Review"
                        )}
                      </button>
                    </form>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
