"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import ImagesTab from "./ImagesTab";
import TestimonialsTab from "./TestimonialsTab";
import ProfileTab from "./ProfileTab";

const tabs = [
  { id: "images", label: "Images" },
  { id: "testimonials", label: "Testimonials" },
  { id: "profile", label: "Profile" },
];

export default function DashboardApp() {
  const router = useRouter();
  const [tab, setTab] = useState("images");

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-page">
      <header className="flex items-center justify-between border-b border-ink/10 bg-white px-6 py-4">
        <div>
          <p className="font-heading text-lg font-bold text-ink">Ilham Designs Dashboard</p>
          <p className="text-xs text-muted">Manage portfolio images, testimonials and profile.</p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink/70 hover:bg-ink/5"
        >
          <LogOut size={15} /> Log Out
        </button>
      </header>

      <div className="section-container py-10">
        <div className="flex flex-wrap gap-2 border-b border-ink/10 pb-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                tab === t.id
                  ? "bg-ink text-white"
                  : "bg-white text-ink/70 ring-1 ring-inset ring-ink/10 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "images" && <ImagesTab />}
          {tab === "testimonials" && <TestimonialsTab />}
          {tab === "profile" && <ProfileTab />}
        </div>
      </div>
    </div>
  );
}
