import type { Metadata } from "next";
import SiteHeader from "../components/layout/SiteHeader";
import ServiceExperience from "../components/service/ServiceExperience";

export const metadata: Metadata = {
  title: "Services - GEMCA Education & Migration",
  description:
    "Explore GEMCA services including PR consultation, visa consultation, skills assessment, EOI assistance, state nomination, visa refusal assistance, AAT appeals, document preparation and English test guidance.",
};

export default function ServicePage() {
  return (
    <main className="relative z-[999] min-h-screen overflow-hidden bg-[#faf6f0] text-[#0a1f44]">
      <SiteHeader />
      <ServiceExperience />
    </main>
  );
}
