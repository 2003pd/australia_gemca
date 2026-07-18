"use client";

import { useState } from "react";
import { GraduationCap, MapPin, Award, CheckCircle } from "lucide-react";

interface University {
  name: string;
  group: string;
  rank: string;
  tuition: string;
  cricos: string;
  migrationNotes: string;
  campuses: string[];
}

const universitiesData: Record<string, University[]> = {
  VIC: [
    {
      name: "The University of Melbourne",
      group: "Go8 (Group of Eight)",
      rank: "#13 globally (QS 2026)",
      tuition: "AUD $39,000 - $52,000 / yr",
      cricos: "00116K",
      migrationNotes: "Metro campus. ROI via Live in Melbourne portal. Selection by high sector demand.",
      campuses: ["Parkville", "Southbank", "Burnley"],
    },
    {
      name: "Monash University",
      group: "Go8 (Group of Eight)",
      rank: "#37 globally (QS 2026)",
      tuition: "AUD $37,000 - $49,000 / yr",
      cricos: "00008C",
      migrationNotes: "Clayton & Caulfield campuses. Regional options available for extra subclass 491/190 points.",
      campuses: ["Clayton", "Caulfield", "Peninsula"],
    },
    {
      name: "RMIT University",
      group: "ATN (Tech Network)",
      rank: "#123 globally (QS 2026)",
      tuition: "AUD $34,000 - $44,000 / yr",
      cricos: "00122A",
      migrationNotes: "Highly renowned for design & engineering. Links to diverse Victoria ROI selection streams.",
      campuses: ["Melbourne City", "Bundoora", "Brunswick"],
    },
    {
      name: "Deakin University",
      group: "Innovative Research",
      rank: "#197 globally (QS 2026)",
      tuition: "AUD $32,000 - $41,000 / yr",
      cricos: "00113B",
      migrationNotes: "Geelong Waurn Ponds campus unlocks Category 3 regional visas (+5 points & 485 extensions).",
      campuses: ["Melbourne Burwood", "Geelong", "Warrnambool"],
    },
  ],
  NSW: [
    {
      name: "The University of Sydney",
      group: "Go8 (Group of Eight)",
      rank: "#18 globally (QS 2026)",
      tuition: "AUD $41,000 - $55,000 / yr",
      cricos: "00026A",
      migrationNotes: "Metro Sydney. Points competitive invitations based on NSW state priority skills list.",
      campuses: ["Camperdown", "Darlington", "Mallett Street"],
    },
    {
      name: "UNSW Sydney",
      group: "Go8 (Group of Eight)",
      rank: "#19 globally (QS 2026)",
      tuition: "AUD $40,000 - $54,000 / yr",
      cricos: "00098G",
      migrationNotes: "Kensington metro. Excellent graduate employment rates. Highly competitive NSW invitation rounds.",
      campuses: ["Kensington", "Paddington", "Canberra"],
    },
    {
      name: "The University of Newcastle",
      group: "Innovative Research",
      rank: "#173 globally (QS 2026)",
      tuition: "AUD $31,000 - $43,000 / yr",
      cricos: "00109J",
      migrationNotes: "Regional NSW campus. Unlocks Category 2 regional subclass 491 pathway (+15 points).",
      campuses: ["Newcastle City", "Callaghan", "Ourimbah"],
    },
  ],
  QLD: [
    {
      name: "The University of Queensland",
      group: "Go8 (Group of Eight)",
      rank: "#40 globally (QS 2026)",
      tuition: "AUD $38,000 - $48,000 / yr",
      cricos: "00025B",
      migrationNotes: "St Lucia metro. Highly reputable. Links with Queensland onshore graduate streams.",
      campuses: ["St Lucia", "Herston", "Gatton"],
    },
    {
      name: "Queensland University of Technology",
      group: "ATN (Tech Network)",
      rank: "#189 globally (QS 2026)",
      tuition: "AUD $33,000 - $42,000 / yr",
      cricos: "00340A",
      migrationNotes: "Brisbane city campus. High industry connectivity. Links with QLD state nomination pathways.",
      campuses: ["Gardens Point", "Kelvin Grove"],
    },
    {
      name: "Griffith University",
      group: "IRU (Research)",
      rank: "#243 globally (QS 2026)",
      tuition: "AUD $30,000 - $39,000 / yr",
      cricos: "00233E",
      migrationNotes: "Gold Coast campus offers regional study benefits (+5 points, regional subclass 491/190 eligibility).",
      campuses: ["Gold Coast", "Nathan", "Mt Gravatt"],
    },
  ],
  SA: [
    {
      name: "The University of Adelaide",
      group: "Go8 (Group of Eight)",
      rank: "#82 globally (QS 2026)",
      tuition: "AUD $36,000 - $47,000 / yr",
      cricos: "00123M",
      migrationNotes: "Entire South Australia is regional. High priority streams for SA graduates (190/491 state nomination).",
      campuses: ["North Terrace", "Roseworthy", "Waite"],
    },
    {
      name: "University of South Australia",
      group: "ATN (Tech Network)",
      rank: "#326 globally (QS 2026)",
      tuition: "AUD $31,000 - $40,000 / yr",
      cricos: "00121B",
      migrationNotes: "Adelaide City. Regional status grants extra points and fast-tracked state sponsor routes.",
      campuses: ["City West", "City East", "Mawson Lakes", "Whyalla"],
    },
  ],
  WA: [
    {
      name: "The University of Western Australia",
      group: "Go8 (Group of Eight)",
      rank: "#72 globally (QS 2026)",
      tuition: "AUD $38,000 - $49,000 / yr",
      cricos: "00126G",
      migrationNotes: "Perth. WASMOL Schedule 1/2 graduate streams for Western Australia state sponsor.",
      campuses: ["Crawley", "Albany"],
    },
    {
      name: "Curtin University",
      group: "ATN (Tech Network)",
      rank: "#174 globally (QS 2026)",
      tuition: "AUD $32,000 - $42,000 / yr",
      cricos: "00301J",
      migrationNotes: "Perth. Excellent engineering/mining programs. Direct link into WA state occupation lists.",
      campuses: ["Bentley", "Perth City", "Kalgoorlie"],
    },
  ],
  TAS_OTH: [
    {
      name: "University of Tasmania",
      group: "Sandstone (Independent)",
      rank: "#283 globally (QS 2026)",
      tuition: "AUD $29,000 - $38,000 / yr",
      cricos: "00586B",
      migrationNotes: "100% regional. Highly attractive TAS state nomination gateway (study pathway priority).",
      campuses: ["Hobart", "Launceston", "Cradle Coast"],
    },
    {
      name: "Australian National University",
      group: "Go8 (Group of Eight)",
      rank: "#30 globally (QS 2026)",
      tuition: "AUD $42,000 - $55,000 / yr",
      cricos: "00120C",
      migrationNotes: "Canberra. ACT Matrix points system priority; critical skills list bonuses apply.",
      campuses: ["Acton (Canberra)", "Kioloa"],
    },
    {
      name: "Charles Darwin University",
      group: "IRU (Research)",
      rank: "#500-600 (QS 2026)",
      tuition: "AUD $28,000 - $35,000 / yr",
      cricos: "00300K",
      migrationNotes: "Darwin NT. Category 3 regional. High visa conversion rate for NT resident graduates.",
      campuses: ["Darwin Casuarina", "Palmerston", "Alice Springs"],
    },
  ],
};

export default function UniversitiesTab() {
  const [activeTab, setActiveTab] = useState<string>("VIC");

  const tabs = [
    { id: "VIC", label: "Victoria (VIC)" },
    { id: "NSW", label: "New South Wales (NSW)" },
    { id: "QLD", label: "Queensland (QLD)" },
    { id: "SA", label: "South Australia (SA)" },
    { id: "WA", label: "Western Australia (WA)" },
    { id: "TAS_OTH", label: "Tasmania & Terr." },
  ];

  return (
    <div className="w-full">
      {/* State Tabs selector */}
      <div className="flex border-b border-slate-200 dark:border-navy-700 overflow-x-auto no-scrollbar gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-4 py-3 text-sm font-display font-semibold transition-all duration-200 border-b-2 -mb-[2px] ${
              activeTab === tab.id
                ? "border-gold text-[#C9A227] dark:text-[#C9A227]"
                : "border-transparent text-[#5A6478] hover:text-[#0A1F44] hover:border-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* University Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {universitiesData[activeTab].map((uni, idx) => (
          <div
            key={idx}
            className="group relative bg-white dark:bg-[#0A1F44] border border-slate-200 dark:border-navy-700 rounded-xl p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Top gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div>
              {/* Header */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-2 text-[#2E5FA3] dark:text-[#2E5FA3]">
                  <GraduationCap className="w-5 h-5 text-[#C9A227] shrink-0" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {uni.group}
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-[#0A1F44]/5 dark:bg-white/5 border border-[#0A1F44]/10 dark:border-white/10 rounded text-[10px] font-mono font-medium text-slate-500">
                  CRICOS: {uni.cricos}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-lg font-display font-bold text-[#0A1F44] dark:text-white mt-2 mb-3 group-hover:text-[#C9A227] transition-colors duration-200">
                {uni.name}
              </h4>

              {/* Campus Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {uni.campuses.map((camp, cIdx) => (
                  <span
                    key={cIdx}
                    className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 bg-slate-100 dark:bg-[#1B4178] text-[#5A6478] dark:text-slate-300 rounded"
                  >
                    <MapPin className="w-2.5 h-2.5 text-[#2E5FA3]" />
                    {camp}
                  </span>
                ))}
              </div>

              {/* Stats Block */}
              <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-slate-100 dark:border-navy-700 mb-4 bg-slate-50 dark:bg-[#0A1F44]/30 rounded-lg p-2.5">
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">
                    Global Rank
                  </span>
                  <span className="text-xs font-bold text-[#0A1F44] dark:text-white flex items-center gap-1 mt-0.5">
                    <Award className="w-3.5 h-3.5 text-[#C9A227]" />
                    {uni.rank}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">
                    Est. Tuition Band
                  </span>
                  <span className="text-xs font-bold text-[#0A1F44] dark:text-white mt-0.5 block">
                    {uni.tuition}
                  </span>
                </div>
              </div>
            </div>

            {/* Migration & PR Notes */}
            <div className="bg-[#F2F5FA]/60 dark:bg-navy-800/40 border border-[#2E5FA3]/10 p-3 rounded-lg flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-[#2A3348] dark:text-slate-300 leading-relaxed">
                <strong className="text-[#0A1F44] dark:text-white block mb-0.5 text-[11px]">
                  Migration Opportunity Note
                </strong>
                {uni.migrationNotes}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="#book-consultation"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A1F44] hover:bg-[#1B4178] text-white text-sm font-semibold rounded-lg shadow-md transition-all duration-300 font-display border border-gold/40 hover:border-gold"
        >
          Compare All 43 Universities
        </a>
      </div>
    </div>
  );
}
