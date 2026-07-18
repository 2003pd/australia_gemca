"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../components/stores/useAuthStore";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import GemcaLogo from "../../components/GemcaLogo";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { login, isAuthenticated, checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/admin");
      } else {
        setError("Invalid email address or passcode. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050811] px-4 py-12 text-white">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#2e5fa3]/10 blur-[150px] pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50" />

      <div className="w-full max-w-md">
        {/* Header/Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 scale-110">
            <GemcaLogo className="h-12 text-white" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-white">
            Administrative Portal
          </h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
            Secure Verification
          </p>
        </div>

        {/* Glassmorphic Login Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-xl">
          {/* Top subtle highlight border */}
          <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-70" />

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                <AlertCircle className="mt-0.5 shrink-0 text-red-400" size={18} />
                <p>{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-[0.15em] text-white/70">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gemca.com.au"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder-white/20 transition-all focus:border-[#d4af37] focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-[0.15em] text-white/70">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder-white/20 transition-all focus:border-[#d4af37] focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#d4af37] to-[#bfa032] py-3.5 text-sm font-black uppercase tracking-[0.18em] text-black transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
              ) : (
                <>
                  Verify Credentials
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Test Credentials Display */}
          <div className="mt-8 border-t border-white/5 pt-6">
            <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2">
                <ShieldCheck size={14} />
                Demonstration Access
              </div>
              <p className="text-[11px] leading-5 text-white/50">
                Use the configured admin credentials to access the portal. Default access before password change:
              </p>
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/40 font-mono">Email:</span>
                  <span className="font-mono text-white/80">admin@gemca.com.au</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 font-mono">Default:</span>
                  <span className="font-mono text-white/80">gemca2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
