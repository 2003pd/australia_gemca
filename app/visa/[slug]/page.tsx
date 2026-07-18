import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVisaBySlugAction } from "../../actions/visas";
import SiteHeader from "../../components/layout/SiteHeader";
import VisaDetailExperience from "../../components/visa/VisaDetailExperience";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface VisaMetadataRecord {
  name: string;
  subclass: string;
  summary?: string;
  seoOgImage?: string;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getVisaBySlugAction(slug);

  if (!result.success || !result.data) {
    return {
      title: "Visa Not Found - GEMCA",
    };
  }

  const visa = result.data as VisaMetadataRecord;

  return {
    title: `${visa.name} Subclass ${visa.subclass} - GEMCA`,
    description: visa.summary || `Details for ${visa.name} Subclass ${visa.subclass}.`,
    openGraph: {
      images: visa.seoOgImage ? [visa.seoOgImage] : undefined,
    },
  };
}

export default async function VisaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getVisaBySlugAction(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <main className="relative z-[999] min-h-screen overflow-hidden bg-white text-[#0a1f44]">
      <SiteHeader />
      <VisaDetailExperience dbVisa={result.data} />
    </main>
  );
}
