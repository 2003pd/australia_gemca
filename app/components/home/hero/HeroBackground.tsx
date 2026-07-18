"use client";

interface HeroBackgroundProps {
  cursor: { x: number; y: number };
}

export default function HeroBackground({ cursor }: HeroBackgroundProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#F8FAFC]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(8,31,77,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(8,31,77,0.045)_1px,transparent_1px)] bg-[size:52px_52px]" />
      <div className="absolute -left-24 top-20 h-[420px] w-[420px] rounded-full bg-[#164A8A]/10 blur-[115px]" />
      <div className="absolute right-[-120px] top-24 h-[620px] w-[620px] rounded-full bg-[#C89B24]/13 blur-[130px]" />
      <div className="absolute bottom-[-180px] left-[35%] h-[440px] w-[440px] rounded-full bg-[#164A8A]/9 blur-[120px]" />
      <div
        className="absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-3xl transition-transform duration-200"
        style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}
      />
      <svg className="absolute inset-x-0 top-24 h-[520px] w-full opacity-[0.18]" viewBox="0 0 1440 520" fill="none">
        <path d="M-40 210C155 132 280 126 438 178C623 239 734 298 923 205C1085 125 1236 88 1480 144" stroke="#164A8A" strokeWidth="1" />
        <path d="M-20 318C202 254 389 247 548 304C713 363 856 387 1023 292C1166 211 1282 202 1460 258" stroke="#C89B24" strokeWidth="1" />
        <path d="M-20 414C182 358 381 339 584 392C794 447 928 438 1118 350C1266 281 1351 294 1470 338" stroke="#081F4D" strokeWidth="1" />
      </svg>
      <div className="absolute inset-x-0 bottom-[-1px] h-24 bg-[#F8FAFC] [clip-path:ellipse(74%_64%_at_50%_100%)]" />
    </div>
  );
}
