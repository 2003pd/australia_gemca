import type { Metadata } from "next";
import SiteHeader from "../components/layout/SiteHeader";
import EmployerSponsoredExperience from "../components/employer-sponsored/EmployerSponsoredExperience";

export const metadata: Metadata = {
  title: "Employer Sponsored Visa Australia - GEMCA",
  description:
    "Explore Australian employer sponsored visa pathways including subclass 482, 186, 494 and labour agreement strategy with GEMCA.",
};

export default function EmployerSponsoredPage() {
  return (
    <main className="relative z-[999] min-h-screen overflow-hidden bg-[#f7fbff] text-[#0a1f44]">
      <SiteHeader />
      <EmployerSponsoredExperience />
    </main>
  );
}
