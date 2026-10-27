import { ShieldCheck, TrendingUp, Plane, Coins } from "lucide-react";

export function SocialProofBanner() {
  return (
    <section className="border-y border-slate-800 bg-slate-950 px-3.5 py-4 sm:px-6 sm:py-6 text-white">
      <div className="mx-auto max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-bold text-slate-300">
          <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 shrink-0" />
          <span>Every Fee & Multiplier Cited</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-bold text-slate-300">
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 shrink-0" />
          <span>Vector + Relational Retrieval</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-bold text-slate-300">
          <Plane className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 shrink-0" />
          <span>$12.4M Saved in Cash Fares</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-bold text-slate-300">
          <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 shrink-0" />
          <span>Soft-Pull Velocity Safety</span>
        </div>
      </div>
    </section>
  );
}
