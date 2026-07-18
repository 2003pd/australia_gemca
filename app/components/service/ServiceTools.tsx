"use client";

import {
  BadgeCheck,
  BriefcaseBusiness,
  Calculator,
  Check,
  ChevronRight,
  ClipboardCheck,
  Info,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";

const pointOptions = {
  age: [
    { label: "18-24", value: 25 },
    { label: "25-32", value: 30 },
    { label: "33-39", value: 25 },
    { label: "40-44", value: 15 },
  ],
  english: [
    { label: "Competent", value: 0 },
    { label: "Proficient", value: 10 },
    { label: "Superior", value: 20 },
  ],
  education: [
    { label: "Diploma / Trade", value: 10 },
    { label: "Bachelor / Master", value: 15 },
    { label: "Doctorate", value: 20 },
  ],
  nomination: [
    { label: "189", value: 0 },
    { label: "190", value: 5 },
    { label: "491", value: 15 },
  ],
};

const eligibilityChecks = [
  "Age under 45 at invitation",
  "Occupation appears on a relevant skilled list",
  "Positive skills assessment available or planned",
  "Competent English or higher",
  "EOI points can reach at least 65",
  "Health, character and document evidence can be prepared",
];

const occupations = [
  { title: "Software Engineer", code: "261313", list: "MLTSSL", authority: "ACS", visas: "189 / 190 / 491" },
  { title: "Developer Programmer", code: "261312", list: "MLTSSL", authority: "ACS", visas: "189 / 190 / 491" },
  { title: "Registered Nurse", code: "2544xx", list: "MLTSSL", authority: "ANMAC", visas: "189 / 190 / 491" },
  { title: "Civil Engineer", code: "233211", list: "MLTSSL", authority: "Engineers Australia", visas: "189 / 190 / 491" },
  { title: "Accountant", code: "221111", list: "MLTSSL", authority: "CPA / CA / IPA", visas: "189 / 190 / 491" },
  { title: "Chef", code: "351311", list: "MLTSSL", authority: "TRA", visas: "190 / 491 / 482" },
  { title: "Early Childhood Teacher", code: "241111", list: "MLTSSL", authority: "AITSL", visas: "189 / 190 / 491" },
  { title: "Motor Mechanic", code: "321211", list: "MLTSSL", authority: "TRA", visas: "190 / 491 / 482" },
  { title: "Marketing Specialist", code: "225113", list: "STSOL", authority: "VETASSESS", visas: "190 / 491" },
  { title: "ICT Business Analyst", code: "261111", list: "MLTSSL", authority: "ACS", visas: "189 / 190 / 491" },
  { title: "Construction Project Manager", code: "133111", list: "MLTSSL", authority: "VETASSESS", visas: "189 / 190 / 491" },
  { title: "Social Worker", code: "272511", list: "MLTSSL", authority: "AASW", visas: "189 / 190 / 491" },
];

function SelectPill({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: number;
  options: Array<{ label: string; value: number }>;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#66748a]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={`${label}-${option.label}`}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-full border px-3 py-2 text-xs font-black transition ${
              value === option.value
                ? "border-[#c9a227]/60 bg-[#fff7df] text-[#0a1f44]"
                : "border-[#0a1f44]/10 bg-white text-[#536079] hover:border-[#2e5fa3]/25"
            }`}
          >
            {option.label} <span className="text-[#2e5fa3]">{option.value}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ServiceTools() {
  const [activeTool, setActiveTool] = useState<"points" | "eligibility" | "occupations">("points");
  const [age, setAge] = useState(30);
  const [english, setEnglish] = useState(10);
  const [education, setEducation] = useState(15);
  const [nomination, setNomination] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [occupationQuery, setOccupationQuery] = useState("");

  const totalPoints = age + english + education + nomination + bonus;
  const completedChecks = eligibilityChecks.filter((item) => checkedItems[item]).length;

  const filteredOccupations = useMemo(() => {
    const query = occupationQuery.trim().toLowerCase();
    if (!query) return occupations;

    return occupations.filter((occupation) =>
      [occupation.title, occupation.code, occupation.list, occupation.authority, occupation.visas]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [occupationQuery]);

  return (
    <section id="migration-tools" className="mt-20 rounded-[34px] border border-[#0a1f44]/10 bg-white/86 p-5 shadow-[0_34px_100px_rgba(10,31,68,0.10)] backdrop-blur-xl sm:p-7 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
        <div className="rounded-[26px] bg-[#071b3f] p-6 text-white">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c9a227]/35 bg-[#c9a227]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#f1d170]">
            <ShieldCheck size={14} />
            Migration tools
          </div>
          <h2 className="text-3xl font-black uppercase leading-tight">
            Check your PR position before booking.
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/64">
            Quick tools for points, basic eligibility and occupation matching. Use them as a guide before a full consultation.
          </p>
          <div className="mt-6 grid gap-3 text-xs font-bold text-white/70">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <span className="text-white/40">Current signal</span>
              <p className="mt-1 text-2xl font-black text-[#f1d170]">{activeTool === "points" ? `${totalPoints} pts` : activeTool === "eligibility" ? `${completedChecks}/6` : `${filteredOccupations.length} jobs`}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            {[
              { key: "points", label: "PR Points Calculator", icon: Calculator },
              { key: "eligibility", label: "Eligibility Checker", icon: ClipboardCheck },
              { key: "occupations", label: "Occupation List", icon: BriefcaseBusiness },
            ].map((tool) => {
              const Icon = tool.icon;
              const selected = activeTool === tool.key;

              return (
                <button
                  key={tool.key}
                  type="button"
                  onClick={() => setActiveTool(tool.key as typeof activeTool)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-black uppercase tracking-[0.1em] transition ${
                    selected
                      ? "border-[#2e5fa3]/30 bg-[#eaf2fb] text-[#0a1f44]"
                      : "border-[#0a1f44]/10 bg-white text-[#66748a] hover:border-[#2e5fa3]/25"
                  }`}
                >
                  <Icon size={14} />
                  {tool.label}
                </button>
              );
            })}
          </div>

          {activeTool === "points" ? (
            <div className="rounded-[26px] border border-[#0a1f44]/10 bg-[#f7f9fc] p-5">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#2e5fa3]">PR Points Calculator</p>
                  <h3 className="mt-1 text-2xl font-black uppercase text-[#0a1f44]">{totalPoints} estimated points</h3>
                </div>
                <span className={`rounded-full px-4 py-2 text-xs font-black uppercase ${totalPoints >= 65 ? "bg-emerald-100 text-emerald-700" : "bg-[#fff7df] text-[#8a650d]"}`}>
                  {totalPoints >= 65 ? "65 threshold met" : `${65 - totalPoints} more needed`}
                </span>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <SelectPill label="Age" value={age} options={pointOptions.age} onChange={setAge} />
                <SelectPill label="English" value={english} options={pointOptions.english} onChange={setEnglish} />
                <SelectPill label="Education" value={education} options={pointOptions.education} onChange={setEducation} />
                <SelectPill label="Nomination" value={nomination} options={pointOptions.nomination} onChange={setNomination} />
              </div>
              <div className="mt-5">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#66748a]">Bonus points</p>
                <div className="flex flex-wrap gap-2">
                  {[0, 5, 10, 15].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setBonus(value)}
                      className={`rounded-full border px-3 py-2 text-xs font-black transition ${bonus === value ? "border-[#c9a227]/60 bg-[#fff7df] text-[#0a1f44]" : "border-[#0a1f44]/10 bg-white text-[#536079]"}`}
                    >
                      {value} bonus
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {activeTool === "eligibility" ? (
            <div className="rounded-[26px] border border-[#0a1f44]/10 bg-[#f7f9fc] p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#2e5fa3]">Eligibility Checker</p>
                  <h3 className="mt-1 text-2xl font-black uppercase text-[#0a1f44]">{completedChecks} of {eligibilityChecks.length} checks ready</h3>
                </div>
                <BadgeCheck className="text-[#c9a227]" size={30} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {eligibilityChecks.map((item) => {
                  const checked = !!checkedItems[item];
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCheckedItems((current) => ({ ...current, [item]: !current[item] }))}
                      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                        checked ? "border-[#2e5fa3]/25 bg-[#eaf2fb] text-[#0a1f44]" : "border-[#0a1f44]/10 bg-white text-[#536079]"
                      }`}
                    >
                      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border ${checked ? "border-[#2e5fa3] bg-[#2e5fa3] text-white" : "border-[#0a1f44]/15 bg-white"}`}>
                        {checked ? <Check size={13} /> : null}
                      </span>
                      <span className="text-sm font-bold leading-6">{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {activeTool === "occupations" ? (
            <div className="rounded-[26px] border border-[#0a1f44]/10 bg-[#f7f9fc] p-5">
              <div className="mb-5 grid gap-4 md:grid-cols-[1fr_0.8fr] md:items-end">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#2e5fa3]">Occupation List</p>
                  <h3 className="mt-1 text-2xl font-black uppercase text-[#0a1f44]">Search common skilled occupations</h3>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#66748a]" size={16} />
                  <input
                    value={occupationQuery}
                    onChange={(event) => setOccupationQuery(event.target.value)}
                    placeholder="Search ANZSCO, job, authority..."
                    className="w-full rounded-full border border-[#0a1f44]/10 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-[#0a1f44] outline-none transition focus:border-[#2e5fa3]/35"
                  />
                </div>
              </div>
              <div className="max-h-[430px] overflow-y-auto pr-1">
                <div className="grid gap-3">
                  {filteredOccupations.map((occupation) => (
                    <article key={`${occupation.code}-${occupation.title}`} className="rounded-2xl border border-[#0a1f44]/10 bg-white p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h4 className="font-black uppercase text-[#0a1f44]">{occupation.title}</h4>
                          <p className="mt-1 text-xs font-bold text-[#66748a]">ANZSCO {occupation.code} • {occupation.authority}</p>
                        </div>
                        <span className="w-fit rounded-full bg-[#fff7df] px-3 py-1 text-[11px] font-black text-[#8a650d]">{occupation.list}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-[#2e5fa3]">
                        <span className="rounded-full bg-[#eaf2fb] px-3 py-1.5">{occupation.visas}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex gap-3 rounded-2xl border border-[#0a1f44]/10 bg-white p-4 text-sm leading-6 text-[#536079]">
                <Info className="mt-1 shrink-0 text-[#c9a227]" size={18} />
                <p>This is a quick reference subset. Always verify the current occupation, visa and assessing authority on the official Home Affairs skilled occupation list.</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
