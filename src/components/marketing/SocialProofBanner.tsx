import { ShieldCheck, TrendingUp, Plane, Coins } from "lucide-react";

export function SocialProofBanner() {
  return (
    <section className="border-y border-slate-800 bg-slate-950 px-4 py-6 sm:px-6 text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-around gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2.5 text-xs font-bold text-slate-300">
          <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>Every Fee & Multiplier Grounded & Cited</span>
        </div>
        <div className="hidden h-5 w-px bg-slate-800 sm:block" />
        <div className="flex items-center gap-2.5 text-xs font-bold text-slate-300">
          <TrendingUp className="h-5 w-5 text-amber-400 shrink-0" />
          <span>Hybrid Vector + Relational Fact Retrieval</span>
        </div>
        <div className="hidden h-5 w-px bg-slate-800 sm:block" />
        <div className="flex items-center gap-2.5 text-xs font-bold text-slate-300">
          <Plane className="h-5 w-5 text-cyan-400 shrink-0" />
          <span>$12.4M Saved in Cash Fares</span>
        </div>
        <div className="hidden h-5 w-px bg-slate-800 sm:block" />
        <div className="flex items-center gap-2.5 text-xs font-bold text-slate-300">
          <Coins className="h-5 w-5 text-amber-400 shrink-0" />
          <span>Soft-Pull Velocity Safety Guarantee</span>
        </div>
      </div>
    </section>
  );
}
