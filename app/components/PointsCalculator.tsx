"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Info, Award } from "lucide-react";
import confetti from "canvas-confetti";

export default function PointsCalculator() {
  const [age, setAge] = useState<number>(30); // Default 25-32 (30 points)
  const [english, setEnglish] = useState<number>(10); // Default Proficient (10 points)
  const [overseasExp, setOverseasExp] = useState<number>(0);
  const [ausExp, setAusExp] = useState<number>(0);
  const [qualification, setQualification] = useState<number>(15); // Default Bachelor (15 points)
  
  // Extra credentials
  const [partnerStatus, setPartnerStatus] = useState<number>(10); // Default Single or Citizen/PR partner (10 points)
  const [studyRequirement, setStudyRequirement] = useState<boolean>(false); // Australian Study (5 points)
  const [regionalStudy, setRegionalStudy] = useState<boolean>(false); // Regional Study (5 points)
  const [naatiCcl, setNaatiCcl] = useState<boolean>(false); // Community Language (5 points)
  const [profYear, setProfYear] = useState<boolean>(false); // Professional Year (5 points)
  const [stemSpec, setStemSpec] = useState<boolean>(false); // STEM Specialist (10 points)
  const [nomination, setNomination] = useState<number>(0); // 189 = 0, 190 = 5, 491 = 15

  const prevPointsRef = useRef<number>(65);

  // Derived state calculation
  let totalPoints = age + english + overseasExp + ausExp + qualification + partnerStatus + nomination;
  if (studyRequirement) totalPoints += 5;
  if (regionalStudy) totalPoints += 5;
  if (naatiCcl) totalPoints += 5;
  if (profYear) totalPoints += 5;
  if (stemSpec) totalPoints += 10;

  useEffect(() => {
    // Trigger confetti if points transition from < 65 to >= 65
    if (totalPoints >= 65 && prevPointsRef.current < 65) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#C9A227", "#0A1F44", "#2E5FA3"],
      });
    }
    prevPointsRef.current = totalPoints;
  }, [totalPoints]);

  return (
    <div className="w-full bg-white dark:bg-[#0A1F44] border border-slate-200 dark:border-navy-700 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-[#0A1F44] text-white flex justify-between items-center border-b border-[#C9A227]/30">
        <div>
          <h3 className="text-xl font-display font-semibold text-white tracking-wide flex items-center gap-2">
            <Award className="text-[#C9A227] w-6 h-6" />
            Quick Points Estimator
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Calculate your points for subclass 189, 190, or 491
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-display font-bold text-[#C9A227]">{totalPoints}</div>
          <span className="text-[10px] uppercase tracking-wider text-slate-300 font-medium">
            Estimated Points
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50">
        {/* Left Column: Dropdowns */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0A1F44] mb-1.5 uppercase tracking-wider">
              Age Range
            </label>
            <select
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-navy-500 font-medium"
            >
              <option value={25}>18 to 24 years (25 points)</option>
              <option value={30}>25 to 32 years (30 points)</option>
              <option value={25}>33 to 39 years (25 points)</option>
              <option value={15}>40 to 44 years (15 points)</option>
              <option value={0}>45 years and above (0 points)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0A1F44] mb-1.5 uppercase tracking-wider">
              English Language Ability
            </label>
            <select
              value={english}
              onChange={(e) => setEnglish(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-navy-500 font-medium"
            >
              <option value={20}>Superior (IELTS 8+ equivalent) (20 points)</option>
              <option value={10}>Proficient (IELTS 7+ equivalent) (10 points)</option>
              <option value={0}>Competent (IELTS 6+ equivalent) (0 points)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0A1F44] mb-1.5 uppercase tracking-wider">
              Overseas Skilled Employment
            </label>
            <select
              value={overseasExp}
              onChange={(e) => setOverseasExp(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-navy-500 font-medium"
            >
              <option value={0}>Less than 3 years (0 points)</option>
              <option value={5}>3 to 4 years (5 points)</option>
              <option value={10}>5 to 7 years (10 points)</option>
              <option value={15}>8 years or more (15 points)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0A1F44] mb-1.5 uppercase tracking-wider">
              Australian Skilled Employment
            </label>
            <select
              value={ausExp}
              onChange={(e) => setAusExp(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-navy-500 font-medium"
            >
              <option value={0}>Less than 1 year (0 points)</option>
              <option value={5}>1 to 2 years (5 points)</option>
              <option value={10}>3 to 4 years (10 points)</option>
              <option value={15}>5 to 7 years (15 points)</option>
              <option value={20}>8 years or more (20 points)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0A1F44] mb-1.5 uppercase tracking-wider">
              Educational Qualification
            </label>
            <select
              value={qualification}
              onChange={(e) => setQualification(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-navy-500 font-medium"
            >
              <option value={20}>Doctorate (PhD) (20 points)</option>
              <option value={15}>Bachelor or Master Degree (15 points)</option>
              <option value={10}>Diploma / Trade Qualification (10 points)</option>
              <option value={0}>No recognized qualification (0 points)</option>
            </select>
          </div>
        </div>

        {/* Right Column: Checkboxes & Nom/Partner */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0A1F44] mb-1.5 uppercase tracking-wider">
              Partner Credentials
            </label>
            <select
              value={partnerStatus}
              onChange={(e) => setPartnerStatus(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-navy-500 font-medium"
            >
              <option value={10}>Single / Partner is Australian Citizen/PR (10 points)</option>
              <option value={10}>Partner has Competent English & Skilled Assessment (10 points)</option>
              <option value={5}>Partner has Competent English only (5 points)</option>
              <option value={0}>Partner has neither (0 points)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0A1F44] mb-1.5 uppercase tracking-wider">
              Visa Nomination / Sponsorship
            </label>
            <select
              value={nomination}
              onChange={(e) => setNomination(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-navy-500 font-medium"
            >
              <option value={0}>Subclass 189 - Skilled Independent (0 points)</option>
              <option value={5}>Subclass 190 - State Nominated (+5 points)</option>
              <option value={15}>Subclass 491 - Regional Sponsored (+15 points)</option>
            </select>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
            <span className="block text-xs font-semibold text-[#0A1F44] uppercase tracking-wider mb-2">
              Additional Points
            </span>
            
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#0A1F44]">
              <input
                type="checkbox"
                checked={studyRequirement}
                onChange={(e) => setStudyRequirement(e.target.checked)}
                className="w-4 h-4 text-[#0A1F44] border-slate-300 rounded focus:ring-navy-500 accent-navy-900"
              />
              Australian Study Requirement (+5 pts)
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#0A1F44]">
              <input
                type="checkbox"
                checked={regionalStudy}
                onChange={(e) => setRegionalStudy(e.target.checked)}
                className="w-4 h-4 text-[#0A1F44] border-slate-300 rounded focus:ring-navy-500 accent-navy-900"
              />
              Regional Australian Study (+5 pts)
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#0A1F44]">
              <input
                type="checkbox"
                checked={naatiCcl}
                onChange={(e) => setNaatiCcl(e.target.checked)}
                className="w-4 h-4 text-[#0A1F44] border-slate-300 rounded focus:ring-navy-500 accent-navy-900"
              />
              Accredited Community Language (NAATI) (+5 pts)
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#0A1F44]">
              <input
                type="checkbox"
                checked={profYear}
                onChange={(e) => setProfYear(e.target.checked)}
                className="w-4 h-4 text-[#0A1F44] border-slate-300 rounded focus:ring-navy-500 accent-navy-900"
              />
              Professional Year in Australia (+5 pts)
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#0A1F44]">
              <input
                type="checkbox"
                checked={stemSpec}
                onChange={(e) => setStemSpec(e.target.checked)}
                className="w-4 h-4 text-[#0A1F44] border-slate-300 rounded focus:ring-navy-500 accent-navy-900"
              />
              STEM Specialist Qualification (+10 pts)
            </label>
          </div>
        </div>
      </div>

      {/* Footer / Results */}
      <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {totalPoints >= 65 ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
              <Check className="w-3.5 h-3.5" />
              Eligible (Min 65 points met)
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
              <Info className="w-3.5 h-3.5" />
              Need {65 - totalPoints} more points for 65 threshold
            </div>
          )}
          <a
            href="#book-consultation"
            className="text-xs text-[#2E5FA3] hover:text-[#0A1F44] font-semibold underline flex items-center gap-1"
          >
            How to increase points?
          </a>
        </div>
        <button
          onClick={() => {
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 },
              colors: ["#C9A227", "#0A1F44", "#2E5FA3"],
            });
          }}
          className="w-full sm:w-auto px-5 py-2.5 bg-[#0A1F44] hover:bg-[#1B4178] text-white rounded-lg font-display text-sm font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
        >
          Check Detailed Profile
        </button>
      </div>
    </div>
  );
}
