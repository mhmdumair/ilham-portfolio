"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, Save, KeyRound, UploadCloud } from "lucide-react";

const emptyForm = {
  aboutText: "",
  email: "",
  phone: "",
  location: "",
  whatsapp: "",
  socialLinks: { facebook: "", instagram: "", behance: "", dribbble: "" },
};

export default function ProfileTab() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [aboutPhoto, setAboutPhoto] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [photoFile, setPhotoFile] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setForm({
          aboutText: data.aboutText || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          whatsapp: data.whatsapp || "",
          socialLinks: {
            facebook: data.socialLinks?.facebook || "",
            instagram: data.socialLinks?.instagram || "",
            behance: data.socialLinks?.behance || "",
            dribbble: data.socialLinks?.dribbble || "",
          },
        });
        setAboutPhoto(data.aboutPhoto || "");
        setLoading(false);
      });
  }, []);

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (key, value) => {
    setForm((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, [key]: value } }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage("");
    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaveMessage(res.ok ? "Saved." : "Failed to save.");
  };

  const handlePhotoUpload = async () => {
    if (!photoFile) return;
    setUploadingPhoto(true);
    const formData = new FormData();
    formData.append("file", photoFile);
    const res = await fetch("/api/settings/photo", { method: "POST", body: formData });
    setUploadingPhoto(false);
    if (res.ok) {
      const data = await res.json();
      setAboutPhoto(data.aboutPhoto);
      setPhotoFile(null);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation don't match.");
      return;
    }

    setPasswordSaving(true);
    const res = await fetch("/api/settings/password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    setPasswordSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setPasswordError(data.error || "Failed to update password.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordMessage("Password updated.");
  };

  if (loading) {
    return (
      <div className="grid place-items-center py-20 text-muted">
        <Loader2 className="animate-spin" size={22} />
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-ink/5">
        <p className="font-heading text-sm font-semibold text-ink">Profile photo</p>
        <div className="mt-4 flex items-center gap-4">
          {aboutPhoto && (
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl ring-1 ring-ink/10">
              <Image src={aboutPhoto} alt="About" fill className="object-cover" />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
              className="text-sm"
            />
            <button
              onClick={handlePhotoUpload}
              disabled={!photoFile || uploadingPhoto}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-xs font-semibold text-white shadow disabled:opacity-60"
            >
              {uploadingPhoto ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <UploadCloud size={13} /> Upload
                </>
              )}
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="mt-6 flex flex-col gap-3">
          <div>
            <label className="text-xs text-muted">About text</label>
            <textarea
              rows={4}
              value={form.aboutText}
              onChange={(e) => handleFieldChange("aboutText", e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-violet"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-violet"
              />
            </div>
            <div>
              <label className="text-xs text-muted">Phone (display)</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-violet"
              />
            </div>
            <div>
              <label className="text-xs text-muted">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => handleFieldChange("location", e.target.value)}
                className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-violet"
              />
            </div>
            <div>
              <label className="text-xs text-muted">WhatsApp (digits, e.g. 94771234567)</label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) => handleFieldChange("whatsapp", e.target.value)}
                className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-violet"
              />
            </div>
          </div>

          <p className="mt-2 text-xs font-semibold text-ink">Social / footer links</p>
          <div className="grid grid-cols-2 gap-3">
            {["facebook", "instagram", "behance", "dribbble"].map((key) => (
              <div key={key}>
                <label className="text-xs capitalize text-muted">{key}</label>
                <input
                  type="url"
                  placeholder="https://"
                  value={form.socialLinks[key]}
                  onChange={(e) => handleSocialChange(key, e.target.value)}
                  className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-violet"
                />
              </div>
            ))}
          </div>

          {saveMessage && <p className="text-xs text-muted">{saveMessage}</p>}
          <button
            type="submit"
            disabled={saving}
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save size={15} /> Save Profile
              </>
            )}
          </button>
        </form>
      </div>

      <div className="h-fit rounded-2xl bg-white p-6 shadow-md ring-1 ring-ink/5">
        <p className="font-heading text-sm font-semibold text-ink">Change password</p>
        <form onSubmit={handlePasswordChange} className="mt-4 flex flex-col gap-3">
          <input
            type="password"
            required
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-violet"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-violet"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-violet"
          />
          {passwordError && <p className="text-xs font-medium text-red-500">{passwordError}</p>}
          {passwordMessage && <p className="text-xs font-medium text-emerald-600">{passwordMessage}</p>}
          <button
            type="submit"
            disabled={passwordSaving}
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow disabled:opacity-60"
          >
            {passwordSaving ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Updating...
              </>
            ) : (
              <>
                <KeyRound size={15} /> Update Password
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
