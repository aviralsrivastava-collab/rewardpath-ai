"use client";

import { UnifiedAISearch } from "@/components/ai/UnifiedAISearch";
import { Sparkles, Calculator, Plane, ShoppingBag, Gift } from "lucide-react";

export function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden px-3.5 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Dynamic Ambient Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[450px] w-[90vw] max-w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500/20 via-cyan-500/15 to-emerald-500/10 opacity-70 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-bold text-amber-400 backdrop-blur-md animate-fade-in shadow-lg max-w-full truncate">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">RewardPath Nexus — Unified Financial AI Engine & Trip Planner</span>
        </div>

        {/* Responsive Heading */}
        <h1 className="mt-4 sm:mt-5 animate-slide-up text-balance font-display text-3xl font-extrabold tracking-tight xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.15]">
          Turn your everyday spend into <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500 bg-clip-text text-transparent">
            First-Class Travel for Free.
          </span>
        </h1>

        <p className="mx-auto mt-3 sm:mt-4 max-w-2xl animate-slide-up text-balance text-xs sm:text-base sm:leading-relaxed text-slate-300">
          Ask RewardPath Nexus about trip planning (e.g. Dubai, London), item purchases (iPhone), or point redemption strategies. Grounded directly in issuer legal filings with verified citations.
        </p>

        {/* Feature Navigation Pills */}
        <div className="mt-5 sm:mt-6 flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-xs font-semibold">
          <button
            onClick={() => scrollToSection("hero-search")}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-slate-800 transition-all cursor-pointer text-[11px] sm:text-xs"
          >
            <Plane className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-400 shrink-0" /> Destination Trip Planner
          </button>
          <button
            onClick={() => scrollToSection("hero-search")}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 hover:bg-slate-800 transition-all cursor-pointer text-[11px] sm:text-xs"
          >
            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400 shrink-0" /> Item Purchase Strategy
          </button>
          <button
            onClick={() => scrollToSection("hero-search")}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-300 hover:bg-slate-800 transition-all cursor-pointer text-[11px] sm:text-xs"
          >
            <Gift className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" /> Point Redemption Guide
          </button>
        </div>

        {/* Quick Action CTAs */}
        <div className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-2.5 sm:gap-3">
          <button
            onClick={() => scrollToSection("hero-search")}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-lg hover:from-amber-400 hover:to-amber-500 active:scale-98 transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4 shrink-0" /> Search RewardPath Nexus
          </button>
          <button
            onClick={() => scrollToSection("calculator")}
            className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 active:scale-98 transition-all cursor-pointer"
          >
            <Calculator className="h-4 w-4 text-amber-400 shrink-0" /> Calculate Spend ROI
          </button>
        </div>

        {/* Unified Search Interactive Widget */}
        <div className="mx-auto mt-6 sm:mt-8">
          <UnifiedAISearch />
        </div>
      </div>
    </section>
  );
}
