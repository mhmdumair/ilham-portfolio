"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Login failed.");
      return;
    }

    router.push(searchParams.get("from") || "/dashboard");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl"
      >
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white">
          <Lock size={20} />
        </div>
        <h1 className="mt-4 text-center font-heading text-xl font-bold text-ink">
          Ilham Designs Admin
        </h1>
        <p className="mt-1 text-center text-sm text-muted">
          Enter the dashboard password to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none focus:border-brand-violet"
          />
          {error && <p className="text-xs font-medium text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
          >
            {loading ? "Checking..." : "Log In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
