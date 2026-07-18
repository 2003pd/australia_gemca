import type { Metadata } from "next";
import SiteHeader from "../components/layout/SiteHeader";
import MeetExpertsExperience from "../components/experts/MeetExpertsExperience";

export const metadata: Metadata = {
  title: "Meet Our Experts - GEMCA",
  description:
    "Meet the education and migration experts behind GEMCA's Australian study, skilled migration, partner visa and consultation guidance.",
};

export default function MeetExpertsPage() {
  return (
    <main className="relative z-[999] min-h-screen overflow-hidden bg-[#071426] text-white">
      <SiteHeader />
      <MeetExpertsExperience />
    </main>
  );
}
