import type { Metadata } from "next";
import SiteHeader from "../components/layout/SiteHeader";
import StudyInAustraliaExperience from "../components/study/StudyInAustraliaExperience";

export const metadata: Metadata = {
  title: "Study in Australia - GEMCA Education",
  description:
    "Plan your Australian study pathway with GEMCA. Course selection, admissions, Genuine Student preparation, student visa strategy and arrival planning.",
};

export default function StudyInAustraliaPage() {
  return (
    <main className="relative z-[999] min-h-screen overflow-hidden bg-[#07111f] text-white">
      <SiteHeader />
      <StudyInAustraliaExperience />
    </main>
  );
}
