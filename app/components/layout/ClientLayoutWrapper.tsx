"use client";

import { usePathname } from "next/navigation";
import Background3D from "../Background3D";
import FerrofluidBg from "../FerrofluidBg";
import SiteFooter from "./SiteFooter";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname();
  // Check if current route starts with /admin
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  return (
    <>
      {!isAdmin && <Background3D />}
      {!isAdmin && <FerrofluidBg />}
      {children}
      {!isAdmin && <SiteFooter />}
    </>
  );
}
