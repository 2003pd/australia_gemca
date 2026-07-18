import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, Landmark, Plane, ShieldCheck } from "lucide-react";
import VisaBackgroundEffect from "./VisaBackgroundEffect";
import VisaPrCalculator from "./VisaPrCalculator";

export interface VisaCard {
  id: string;
  name: string;
  subclass: string;
  slug: string;
  status?: string;
  summary?: string;
  stay?: string;
  work?: string;
  baseCost?: string | number;
  seoOgImage?: string | null;
  heroImage?: string | null;
  category?: {
    name?: string;
    slug?: string;
  } | null;
}

function formatCost(value: VisaCard["baseCost"]) {
  const amount = Number(value || 0);

  if (!amount) {
    return "Fee on request";
  }

  return `From AUD ${amount.toLocaleString("en-AU", {
    maximumFractionDigits: 0,
  })}`;
}

function getUsableImageUrl(value?: string | null) {
  if (!value) {
    return null;
  }

  return value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://") ? value : null;
}

export default function VisaCardsSection({ visas }: { visas: VisaCard[] }) {
  return (
    <section className="relative z-10 min-h-screen overflow-hidden bg-[#f7f9fc] px-5 pb-24 pt-32 text-[#0a1f44] sm:px-6 lg:px-8">
      <VisaBackgroundEffect className="opacity-90" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(247,249,252,0.58)_46%,rgba(234,239,247,0.78)_100%)]" />
      <div className="absolute inset-x-0 top-0 z-0 h-[560px] bg-[radial-gradient(circle_at_18%_18%,rgba(201,162,39,0.18),transparent_30%),radial-gradient(circle_at_78%_20%,rgba(46,95,163,0.14),transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 rounded-[34px] border border-white/70 bg-white/72 p-6 shadow-[0_32px_110px_rgba(10,31,68,0.10)] backdrop-blur-xl sm:p-8 lg:grid-cols-[1fr_0.78fr] lg:items-end lg:p-10">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#0a1f44]/10 bg-[#f8fafc] px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.22em] text-[#0a1f44]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.8)]" />
              Visa pathways
            </div>
            <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.98] tracking-normal text-[#061a3d] sm:text-5xl lg:text-7xl">
              Find the right Australian visa.
            </h1>
            <div className="mt-7 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#506079]">
              <span className="rounded-full border border-[#0a1f44]/10 bg-white px-4 py-2">Eligibility</span>
              <span className="rounded-full border border-[#0a1f44]/10 bg-white px-4 py-2">Costs</span>
              <span className="rounded-full border border-[#0a1f44]/10 bg-white px-4 py-2">Documents</span>
              <span className="rounded-full border border-[#0a1f44]/10 bg-white px-4 py-2">Timeline</span>
            </div>
          </div>
          <div className="rounded-[26px] border border-[#0a1f44]/10 bg-[#071b3f] p-6 text-white shadow-[0_24px_70px_rgba(7,27,63,0.20)]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c9a227]">Admin published visas</p>
            <p className="mt-5 text-lg leading-8 text-white/72">
              Browse visa subclasses added from the admin panel. Open any card to see requirements, checklist,
              timeline, costs and consultation details.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                <p className="text-3xl font-black text-[#c9a227]">{visas.length}</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/50">Live cards</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                <p className="text-3xl font-black text-[#c9a227]">1:1</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/50">Consultation</p>
              </div>
            </div>
          </div>
        </div>

        <VisaPrCalculator />

        {visas.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visas.map((visa) => {
              const image = getUsableImageUrl(visa.seoOgImage) || getUsableImageUrl(visa.heroImage);

              return (
                <Link
                  key={visa.id}
                  href={`/visa/${visa.slug}`}
                  className="group flex min-h-[430px] flex-col overflow-hidden rounded-[22px] border border-[#0a1f44]/10 bg-white/92 shadow-[0_22px_70px_rgba(10,31,68,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#c9a227]/45 hover:shadow-[0_30px_90px_rgba(10,31,68,0.15)]"
                >
                  <div className="relative h-52 overflow-hidden bg-[#0a1f44]">
                    {image ? (
                      <img
                        src={image}
                        alt={visa.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0a1f44] via-[#193c71] to-[#c9a227]">
                        <Plane className="text-white/80" size={54} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44]/82 via-transparent to-transparent" />
                    <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#0a1f44] shadow-lg">
                      Subclass {visa.subclass}
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c9a227]">
                        {visa.category?.name || "Visa Pathway"}
                      </p>
                      <h2 className="mt-2 text-2xl font-black uppercase leading-tight text-white">
                        {visa.name}
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="line-clamp-3 min-h-[84px] text-sm leading-7 text-[#5a6478]">
                      {visa.summary || "Open this pathway to review eligibility, documents, steps and key visa details."}
                    </p>

                    <div className="mt-6 grid gap-3 text-xs font-black uppercase tracking-[0.12em] text-[#0a1f44]">
                      <div className="flex items-center gap-3 rounded-xl border border-[#0a1f44]/10 bg-[#f8fafc] px-4 py-3">
                        <Clock size={16} className="text-[#c9a227]" />
                        <span>{visa.stay || "Stay details"}</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl border border-[#0a1f44]/10 bg-[#f8fafc] px-4 py-3">
                        <Landmark size={16} className="text-[#c9a227]" />
                        <span>{formatCost(visa.baseCost)}</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl border border-[#0a1f44]/10 bg-[#f8fafc] px-4 py-3">
                        <ShieldCheck size={16} className="text-[#c9a227]" />
                        <span>{visa.work || "Work rights listed"}</span>
                      </div>
                    </div>

                    <div className="mt-7 flex items-center justify-between border-t border-[#0a1f44]/10 pt-5">
                      <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-600">
                        <BadgeCheck size={15} />
                        {visa.status || "Published"}
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#0a1f44]">
                        Details
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[24px] border border-[#0a1f44]/10 bg-white/75 p-10 text-center shadow-[0_22px_70px_rgba(10,31,68,0.08)] backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c9a227]">No published visas yet</p>
            <h2 className="mt-3 text-3xl font-black uppercase">Add visa subclasses from admin.</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#5a6478]">
              Once a visa is created in Visa Management and marked Published, it will appear here as a clickable card.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
