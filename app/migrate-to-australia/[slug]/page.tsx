import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "../../components/layout/SiteHeader";
import { visaDatabase } from "../../lib/visaData";
import SubclassForm from "./SubclassForm";
import { 
  Check, 
  MapPin, 
  DollarSign, 
  Clock, 
  ChevronRight, 
  FileText,
  AlertCircle
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const pageVisuals: Record<
  string,
  {
    mainBg: string;
    hero: string;
    heroGrid: string;
    glow: string;
    pill: string;
    eyebrow: string;
    heroNote: string;
    sideImage: string;
    sideLabel: string;
    sideTitle: string;
    sideText: string;
    iconBox: string;
    checkColor: string;
    inquiry: string;
    heroBackground?: string;
  }
> = {
  "skilled-189": {
    mainBg: "bg-[#f7f9fc]",
    hero: "bg-white text-[#0a1f44] border-b border-[#0a1f44]/10",
    heroGrid: "bg-[linear-gradient(to_right,rgba(10,31,68,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,31,68,0.045)_1px,transparent_1px)]",
    glow: "bg-[#2e5fa3]/12",
    pill: "bg-[#0a1f44] text-white",
    eyebrow: "Independent Skilled Pathway",
    heroNote: "For applicants competing on points without state, employer or family sponsorship.",
    sideImage: "/migration-pathways-hero.png",
    sideLabel: "Independent PR planning",
    sideTitle: "Subclass 189 Strategy",
    sideText: "Points, occupation fit, invitation context and evidence readiness reviewed before you invest.",
    iconBox: "bg-[#2e5fa3]/10 text-[#2e5fa3]",
    checkColor: "text-[#2e5fa3]",
    inquiry: "from-[#07152b] to-[#102b5c]",
  },
  "skilled-190": {
    mainBg: "bg-[#f3f7ff]",
    hero: "bg-[#102b5c] text-white border-b border-white/10",
    heroGrid: "bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_1px,transparent_1px)]",
    glow: "bg-[#d4af37]/14",
    pill: "bg-[#d4af37] text-[#07152b]",
    eyebrow: "State Nomination Pathway",
    heroNote: "For applicants aligning occupation, state criteria and nomination evidence.",
    sideImage: "/premium-hero-bg.png",
    sideLabel: "State nomination planning",
    sideTitle: "Subclass 190 State Fit",
    sideText: "State requirements, occupation lists, points profile and settlement logic mapped clearly.",
    iconBox: "bg-[#d4af37]/15 text-[#9b7a12]",
    checkColor: "text-[#9b7a12]",
    inquiry: "from-[#102b5c] to-[#07152b]",
  },
  "skilled-491": {
    mainBg: "bg-[#faf6f0]",
    hero: "bg-[#10251f] text-white border-b border-white/10",
    heroGrid: "bg-[linear-gradient(to_right,rgba(212,175,55,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)]",
    glow: "bg-[#d4af37]/12",
    pill: "bg-[#d4af37] text-[#10251f]",
    eyebrow: "Regional Skilled Pathway",
    heroNote: "For applicants planning regional nomination, family sponsorship or long-term 191 transition.",
    sideImage: "/migration-pathways-hero.png",
    sideLabel: "Regional migration pathway",
    sideTitle: "Subclass 491 Planning",
    sideText: "Regional nomination, occupation fit and evidence planning reviewed before the next step.",
    iconBox: "bg-emerald-700/10 text-emerald-700",
    checkColor: "text-emerald-700",
    inquiry: "from-[#10251f] to-[#07152b]",
  },
  "skills-assessment": {
    mainBg: "bg-[#f6f1e8]",
    hero: "bg-[#241f1a] text-white border-b border-[#d4af37]/20",
    heroGrid: "bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.12),transparent_30%)]",
    glow: "bg-[#d4af37]/10",
    pill: "bg-white text-[#241f1a]",
    eyebrow: "Evidence Verification Pathway",
    heroNote: "For applicants preparing qualifications, work evidence and assessing authority requirements.",
    sideImage: "/career-team-hero.png",
    sideLabel: "Assessment file review",
    sideTitle: "Skills Assessment Evidence",
    sideText: "Qualifications, employment references, ANZSCO fit and authority requirements organised early.",
    iconBox: "bg-[#d4af37]/15 text-[#9b7a12]",
    checkColor: "text-[#9b7a12]",
    inquiry: "from-[#241f1a] to-[#07152b]",
  },
  "graduate-visa-485": {
    mainBg: "bg-[#f8fbff]",
    hero: "bg-[#07152b] text-white border-b border-white/10 min-h-[560px]",
    heroGrid: "bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]",
    glow: "bg-[#d4af37]/18",
    pill: "bg-[#d4af37] text-[#07152b]",
    eyebrow: "Post-study work pathway",
    heroNote: "For recent Australian graduates planning work rights, timing, evidence and next migration steps after study.",
    sideImage: "/graduate-485-hero.png",
    sideLabel: "Graduate future planning",
    sideTitle: "Subclass 485 Roadmap",
    sideText: "Course completion, timing, English, health cover and future pathway planning organised clearly.",
    iconBox: "bg-[#d4af37]/15 text-[#9b7a12]",
    checkColor: "text-[#9b7a12]",
    inquiry: "from-[#07152b] to-[#163b78]",
    heroBackground: "/graduate-485-hero.png",
  },
};

const defaultVisual = pageVisuals["skilled-189"];

// Generate static routes for all 14 visa pages at build-time
export async function generateStaticParams() {
  return Object.keys(visaDatabase).map((slug) => ({
    slug,
  }));
}

// Dynamically generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const visa = visaDatabase[slug];
  
  if (!visa) {
    return {
      title: "Visa Not Found",
    };
  }

  return {
    title: `${visa.title} (${visa.subclass}) - GEMCA Australia`,
    description: visa.overview,
  };
}

export default async function VisaSubclassDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const visa = visaDatabase[slug];

  if (!visa) {
    notFound();
  }

  const visual = pageVisuals[slug] || defaultVisual;

  return (
    <main className={`relative z-[999] min-h-screen ${visual.mainBg} text-[#1a1a1a] pb-24`}>
      {/* Site Header */}
      <SiteHeader />

      {/* Distinct Header HERO section */}
      <section className={`relative overflow-hidden px-5 pb-12 pt-32 sm:px-6 lg:px-8 ${visual.hero}`}>
        {visual.heroBackground ? (
          <Image
            src={visual.heroBackground}
            alt={`${visa.title} hero background`}
            fill
            priority
            className="absolute inset-0 object-contain object-top opacity-80 sm:object-cover sm:object-center sm:opacity-100"
            sizes="100vw"
          />
        ) : null}
        {visual.heroBackground ? (
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,21,43,0.98)_0%,rgba(7,21,43,0.9)_58%,rgba(7,21,43,0.5)_100%)] sm:bg-[linear-gradient(90deg,rgba(7,21,43,0.96)_0%,rgba(7,21,43,0.76)_42%,rgba(7,21,43,0.18)_100%)]" />
        ) : null}
        <div className={`absolute inset-0 ${visual.heroGrid} bg-[size:40px_40px] opacity-60`} />
        <div className={`absolute -left-12 bottom-0 h-56 w-56 rounded-full ${visual.glow} blur-[90px]`} />
        <div className={`absolute right-0 top-8 h-72 w-72 rounded-full ${visual.glow} blur-[110px]`} />
        
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          {/* Breadcrumbs */}
          <div>
          <nav className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-60">
            <Link href="/" className="transition-colors hover:text-[#d4af37]">Home</Link>
            <ChevronRight size={12} />
            <Link href="/migrate-to-australia" className="transition-colors hover:text-[#d4af37]">Migrate</Link>
            <ChevronRight size={12} />
            <span className="truncate text-[#d4af37]">{visa.subclass}</span>
          </nav>

          <div className="max-w-4xl space-y-3">
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest ${visual.pill}`}>
              {visa.subclass}
            </span>
            <h1 className="text-3xl font-black uppercase leading-tight tracking-normal sm:text-5xl">
              {visa.title}
            </h1>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
              {visual.eyebrow}
            </p>
            <p className="max-w-2xl pt-3 text-sm font-semibold leading-7 opacity-72">{visual.heroNote}</p>
          </div>
          </div>

          {slug !== "graduate-visa-485" ? (
            <div className="hidden overflow-hidden rounded-[28px] border border-white/15 bg-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.20)] lg:block">
              <div className="relative h-64">
                <Image
                  src={visual.sideImage}
                  alt={`${visa.title} visual pathway`}
                  fill
                  className="object-cover"
                  sizes="34vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/8 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]">{visual.sideLabel}</p>
                  <h2 className="mt-2 text-2xl font-black uppercase leading-tight">{visual.sideTitle}</h2>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mt-12">
        <div className="grid gap-12 lg:grid-cols-[1.8fr_1.2fr] items-start">
          
          {/* Left Main Information Column */}
          <div className="space-y-12">
            
            {/* Quick specifications grid */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3.5 bg-white border border-black/5 p-5 rounded-xl shadow-sm">
                <div className={`p-2 rounded-lg ${visual.iconBox} shrink-0`}>
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-black/40">Duration</p>
                  <p className="text-sm font-bold text-[#0a1529] mt-0.5">{visa.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5 bg-white border border-black/5 p-5 rounded-xl shadow-sm">
                <div className={`p-2 rounded-lg ${visual.iconBox} shrink-0`}>
                  <DollarSign size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-black/40">Visa Charge</p>
                  <p className="text-sm font-bold text-[#0a1529] mt-0.5">{visa.cost}</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5 bg-white border border-black/5 p-5 rounded-xl shadow-sm">
                <div className={`p-2 rounded-lg ${visual.iconBox} shrink-0`}>
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-black/40">Application Location</p>
                  <p className="text-sm font-bold text-[#0a1529] mt-0.5">{visa.location}</p>
                </div>
              </div>
            </div>

            {/* Overview description */}
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-wide text-[#0a1529]">Pathway Overview</h2>
              <p className="text-base leading-8 text-black/75">
                {visa.overview}
              </p>
            </div>

            {/* Key benefits list */}
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-wide text-[#0a1529]">Pathway Key Benefits</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {visa.keyBenefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3 bg-white p-4 rounded-xl border border-black/5 shadow-sm">
                    <Check size={18} className={`${visual.checkColor} shrink-0 mt-0.5`} />
                    <span className="text-xs font-bold text-black/75 leading-5">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility Requirements card deck */}
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-wide text-[#0a1529]">Eligibility Checklist</h2>
              <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm space-y-4">
                <p className="text-xs text-black/50 font-semibold leading-5 border-b border-black/5 pb-3">
                  Please review the mandatory eligibility criteria determined by the Department of Home Affairs.
                </p>
                <div className="space-y-3.5">
                  {visa.eligibility.map((criteria, index) => (
                    <div key={index} className="flex gap-4">
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center font-black text-xs shrink-0 mt-0.5 ${visual.iconBox}`}>
                        {index + 1}
                      </div>
                      <span className="text-xs font-bold text-black/70 leading-6">{criteria}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Application steps compact horizontal flow */}
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-wide text-[#0a1529]">Application Steps</h2>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {visa.steps.map((step, index) => (
                  <div key={index} className="relative rounded-xl border border-black/5 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="text-xs font-black uppercase text-[#0a1529]">Stage {index + 1}</h3>
                      <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-black ${visual.iconBox}`}>
                        {index + 1}
                      </div>
                    </div>
                    <p className="text-xs font-semibold leading-5 text-black/62">{step}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sided Inquiry/Consultation Form Panel */}
          <div className="space-y-6">
            <div className={`sticky top-28 space-y-6 rounded-2xl border border-white/5 bg-gradient-to-br ${visual.inquiry} p-6 text-white shadow-xl sm:p-8`}>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37]">Secure Portal</span>
                <h2 className="mt-1 text-xl font-black uppercase text-white">Lodge Advisory Inquiry</h2>
                <p className="mt-2 text-xs leading-5 text-white/50">
                  Send your profile details directly to our migration team. Your inquiry will be logged directly into our administrative database for consultation planning.
                </p>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/5 p-3 text-xs leading-5 text-white/70">
                <FileText className="mt-0.5 shrink-0 text-[#d4af37]" size={16} />
                <p>
                  Applying for: <span className="font-bold text-[#d4af37]">{visa.title} ({visa.subclass})</span>
                </p>
              </div>

              {/* Embedded client component form handles interactive server action */}
              <SubclassForm
                subclass={visa.subclass}
                visaTitle={visa.title}
              />

              <div className="flex items-center justify-center gap-1.5 border-t border-white/5 pt-4 text-[10px] font-bold leading-4 text-white/40">
                <AlertCircle size={12} className="text-[#d4af37]" />
                Data resides securely on XAMPP SQL server.
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_24px_80px_rgba(10,21,41,0.10)]">
              <div className="relative aspect-[4/3] min-h-[260px]">
                <Image
                  src={visual.sideImage}
                  alt={`${visa.title} pathway planning`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 34vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1529]/88 via-[#0a1529]/12 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#d4af37]">{visual.sideLabel}</p>
                  <h3 className="mt-2 text-2xl font-black uppercase leading-tight">{visual.sideTitle}</h3>
                  <p className="mt-3 max-w-sm text-xs font-semibold leading-6 text-white/72">
                    {visual.sideText}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
