export default function HeroLoader() {
  return (
    <div className="relative grid min-h-[360px] w-full place-items-center rounded-[34px] border border-[#081F4D]/10 bg-white/70 shadow-[0_30px_100px_rgba(8,31,77,0.10)] backdrop-blur-2xl">
      <div className="relative h-44 w-44 rounded-[34px] border border-[#C89B24]/35 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.96),rgba(200,155,36,0.14)_36%,rgba(22,74,138,0.12)_72%)] shadow-[0_0_90px_rgba(200,155,36,0.20)]">
        <div className="absolute inset-7 rounded-[26px] border border-[#081F4D]/12" />
      </div>
      <p className="absolute bottom-7 text-[10px] font-black uppercase tracking-[0.24em] text-[#63708a]">
        Loading Australia pathway map
      </p>
    </div>
  );
}
