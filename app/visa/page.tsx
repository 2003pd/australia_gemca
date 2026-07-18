import type { Metadata } from "next";
import SiteHeader from "../components/layout/SiteHeader";
import VisaDetailExperience from "../components/visa/VisaDetailExperience";
import VisaCardsSection, { type VisaCard } from "../components/visa/VisaCardsSection";
import { getVisaBySlugAction, getVisaListAction } from "../actions/visas";

export const metadata: Metadata = {
  title: "Visa Detail Information - GEMCA",
  description:
    "Explore detailed information about Australian visa subclasses including requirements, checklist, step timeline and professional consultation strategy.",
};

interface PageProps {
  searchParams: Promise<{ slug?: string }>;
}

export default async function VisaPage({ searchParams }: PageProps) {
  const { slug } = await searchParams;
  let dbVisa = null;

  if (slug) {
    const result = await getVisaBySlugAction(slug);
    if (result.success && result.data) {
      dbVisa = result.data;
    }
  }

  if (!slug) {
    const result = await getVisaListAction();
    const allVisas = result.success && Array.isArray(result.data) ? (result.data as VisaCard[]) : [];
    const visas = allVisas.filter((visa) => visa.status === "Published" || visa.status === "Current");

    return (
      <main className="relative z-[999] min-h-screen overflow-hidden bg-white text-[#0a1f44]">
        <SiteHeader />
        <VisaCardsSection visas={visas} />
      </main>
    );
  }

  return (
    <main className="relative z-[999] min-h-screen overflow-hidden bg-white text-[#0a1f44]">
      <SiteHeader />
      <VisaDetailExperience dbVisa={dbVisa} />
    </main>
  );
}
