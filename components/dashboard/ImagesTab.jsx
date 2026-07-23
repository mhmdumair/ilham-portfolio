"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, UploadCloud, Loader2, ImageOff } from "lucide-react";
import { categories } from "@/lib/categories";

export default function ImagesTab() {
  const [active, setActive] = useState(categories[0].slug);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState("");
  const [dragIndex, setDragIndex] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);

  const load = useCallback(async (slug) => {
    setLoading(true);
    const res = await fetch(`/api/images?category=${slug}`);
    const data = await res.json();
    setImages(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load(active);
  }, [active, load]);

  const handleUpload = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!file) {
      setFormError("Choose an image file.");
      return;
    }
    setUploading(true);

    const formData = new FormData();
    formData.append("category", active);
    formData.append("title", title);
    formData.append("tag", tag);
    formData.append("file", file);

    const res = await fetch("/api/images", { method: "POST", body: formData });
    setUploading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setFormError(data.error || "Upload failed.");
      return;
    }

    setTitle("");
    setTag("");
    setFile(null);
    e.target.reset();
    load(active);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    const res = await fetch(`/api/images/${id}`, { method: "DELETE" });
    setDeletingId(null);
    if (res.ok) {
      setImages((prev) => prev.filter((img) => img.id !== id));
    }
  };

  const handleDragStart = (index) => setDragIndex(index);

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    setImages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setDragIndex(index);
  };

  const handleDragEnd = async () => {
    setDragIndex(null);
    setSavingOrder(true);
    await fetch("/api/images/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: active, ids: images.map((img) => img.id) }),
    });
    setSavingOrder(false);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActive(cat.slug)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === cat.slug
                ? "bg-gradient-brand text-white"
                : "bg-white text-ink/70 ring-1 ring-inset ring-ink/10 hover:text-ink"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[320px_1fr]">
        <form
          onSubmit={handleUpload}
          className="h-fit rounded-2xl bg-white p-6 shadow-md ring-1 ring-ink/5"
        >
          <p className="font-heading text-sm font-semibold text-ink">
            Add image to &ldquo;{categories.find((c) => c.slug === active)?.label}&rdquo;
          </p>

          <div className="mt-4 flex flex-col gap-3">
            <input
              type="text"
              required
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-violet"
            />
            <input
              type="text"
              placeholder="Tag (optional, e.g. Minimal)"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-violet"
            />
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="text-sm"
            />
            {formError && <p className="text-xs font-medium text-red-500">{formError}</p>}
            <button
              type="submit"
              disabled={uploading}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow disabled:opacity-60"
            >
              {uploading ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <UploadCloud size={15} /> Upload
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
          ) : images.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/15 py-20 text-muted">
              <ImageOff size={22} />
              <p className="text-sm">No images in this section yet.</p>
            </div>
          ) : (
            <div>
              <p className="mb-3 text-xs text-muted">
                Drag images to reorder.
                {savingOrder && <span className="ml-2 text-ink/50">Saving…</span>}
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {images.map((img, index) => (
                    <motion.div
                      key={img.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      onDrop={(e) => e.preventDefault()}
                      className="group relative cursor-grab overflow-hidden rounded-xl bg-white shadow ring-1 ring-ink/5 active:cursor-grabbing"
                    >
                      <div className="relative aspect-square w-full">
                        <Image
                          src={img.imageUrl}
                          alt={img.title}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                      </div>
                      <div className="p-2">
                        <p className="truncate text-xs font-medium text-ink">{img.title}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(img.id)}
                        disabled={deletingId === img.id}
                        aria-label={`Delete ${img.title}`}
                        className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-red-500/90 text-white opacity-0 shadow transition-opacity group-hover:opacity-100 disabled:opacity-60"
                      >
                        {deletingId === img.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
