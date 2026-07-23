"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Trash2, Loader2, Check, UserPlus } from "lucide-react";

export default function TestimonialsTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [avatarFile, setAvatarFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleApprove = async (id) => {
    setBusyId(id);
    const res = await fetch(`/api/testimonials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: true }),
    });
    setBusyId(null);
    if (res.ok) {
      setItems((prev) => prev.map((t) => (t.id === id ? { ...t, approved: true } : t)));
    }
  };

  const handleDelete = async (id) => {
    setBusyId(id);
    const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    setBusyId(null);
    if (res.ok) {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("quote", quote);
    formData.append("rating", String(rating));
    if (avatarFile) formData.append("file", avatarFile);

    const res = await fetch("/api/testimonials", { method: "POST", body: formData });
    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setFormError(data.error || "Failed to add testimonial.");
      return;
    }

    setName("");
    setRole("");
    setQuote("");
    setRating(5);
    setAvatarFile(null);
    e.target.reset();
    load();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <form
        onSubmit={handleSubmit}
        className="h-fit rounded-2xl bg-white p-6 shadow-md ring-1 ring-ink/5"
      >
        <p className="font-heading text-sm font-semibold text-ink">Add a testimonial</p>

        <div className="mt-4 flex flex-col gap-3">
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
                    size={20}
                    className={filled ? "fill-amber-400 text-amber-400" : "fill-ink/10 text-ink/10"}
                  />
                </button>
              );
            })}
          </div>

          <input
            type="text"
            required
            placeholder="Client name"
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
            placeholder="Testimonial text"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            className="rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-violet"
          />
          <div>
            <label className="text-xs text-muted">Avatar (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
              className="mt-1 text-sm"
            />
          </div>
          {formError && <p className="text-xs font-medium text-red-500">{formError}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Adding...
              </>
            ) : (
              <>
                <UserPlus size={15} /> Add Testimonial
              </>
            )}
          </button>
        </div>
      </form>

      <div>
        {loading ? (
          <div className="grid place-items-center py-20 text-muted">
            <Loader2 className="animate-spin" size={22} />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/15 py-20 text-muted">
            <p className="text-sm">No testimonials yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((t) => (
              <div
                key={t.id}
                className="relative rounded-2xl bg-white p-5 shadow-md ring-1 ring-ink/5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-ink">{t.name}</p>
                      <p className="text-xs text-muted">{t.role}</p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      t.approved
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {t.approved ? "Published" : "Pending"}
                  </span>
                </div>

                <p className="mt-3 text-sm text-muted">{t.quote}</p>

                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={13}
                      className={
                        idx < t.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-ink/10 text-ink/10"
                      }
                    />
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  {!t.approved && (
                    <button
                      onClick={() => handleApprove(t.id)}
                      disabled={busyId === t.id}
                      className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                    >
                      <Check size={12} /> Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(t.id)}
                    disabled={busyId === t.id}
                    className="inline-flex items-center gap-1 rounded-full bg-red-500/90 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    {busyId === t.id ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Trash2 size={12} />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
