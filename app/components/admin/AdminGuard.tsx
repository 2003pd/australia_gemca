"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/useAuthStore";
import { ShieldAlert } from "lucide-react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070b12] text-white">
        <div className="relative flex flex-col items-center">
          {/* Animated Glowing Ring */}
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-t-[#d4af37] border-r-transparent border-b-[#2e5fa3] border-l-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border border-dashed border-white/10"></div>
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-[#d4af37]">
            GEMCA SECURE PORTAL
          </p>
          <p className="mt-1 text-xs text-white/50 animate-pulse">
            Verifying administrative session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070b12] text-white">
        <div className="flex flex-col items-center text-center max-w-sm px-6">
          <ShieldAlert className="text-[#d4af37] mb-4 h-12 w-12" />
          <h2 className="text-xl font-bold uppercase tracking-wider text-white">
            Access Restricted
          </h2>
          <p className="mt-2 text-sm text-white/60">
            You must be logged in as an administrator to access this area. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
