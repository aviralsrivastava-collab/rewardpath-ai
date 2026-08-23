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
    <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-36 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Dynamic Ambient Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-emerald-500/10 opacity-60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-400 backdrop-blur-md animate-fade-in shadow-lg">
          <Sparkles className="h-3.5 w-3.5" />
          <span>RewardPath Nexus — Unified Financial AI Engine & Trip Planner</span>
        </div>

        <h1 className="mt-4 animate-slide-up text-balance font-display text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          Turn your everyday spend into <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500 bg-clip-text text-transparent">
            First-Class Travel for Free.
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl animate-slide-up text-balance text-sm sm:text-lg text-slate-300">
          Ask RewardPath Nexus about trip planning (e.g. Dubai, London), item purchases (iPhone), or point redemption strategies. Grounded directly in issuer legal filings with verified citations.
        </p>

        {/* Feature Pills */}
        <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-xs font-semibold">
          <button
            onClick={() => scrollToSection("hero-search")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-slate-800 transition-all cursor-pointer"
          >
            <Plane className="h-4 w-4 text-cyan-400" /> Destination Trip Planner
          </button>
          <button
            onClick={() => scrollToSection("hero-search")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 hover:bg-slate-800 transition-all cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4 text-amber-400" /> Item Purchase Strategy
          </button>
          <button
            onClick={() => scrollToSection("hero-search")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-300 hover:bg-slate-800 transition-all cursor-pointer"
          >
            <Gift className="h-4 w-4 text-emerald-400" /> Point Redemption Guide
          </button>
        </div>

        {/* Quick Action CTAs */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => scrollToSection("hero-search")}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4" /> Search RewardPath Nexus
          </button>
          <button
            onClick={() => scrollToSection("calculator")}
            className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <Calculator className="h-4 w-4 text-amber-400" /> Calculate Spend ROI
          </button>
        </div>

        {/* Unified Search Interactive Widget */}
        <div className="mx-auto mt-8">
          <UnifiedAISearch />
        </div>
      </div>
    </section>
  );
}
