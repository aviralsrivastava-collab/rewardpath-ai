"use client";

import React, { useState } from "react";
import { Search, Sparkles, ArrowRight, ShieldCheck, Plane, CheckCircle2 } from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";

const PROMPT_PRESETS = [
  "Dubai vacation trip with airline miles",
  "750 CIBIL score approval odds",
  "Redeem 50,000 HDFC Infinia points",
  "Is buying a car or phone profitable with card?",
];

export function HeroSection() {
  const [searchInput, setSearchInput] = useState("");
  const { openAdvisor } = useAppStore();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim() || "What is the best credit card for travel & dining?";
    openAdvisor(query);
  };

  const handlePresetClick = (preset: string) => {
    setSearchInput(preset);
    openAdvisor(preset);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center pt-10 pb-20 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Subtle Private Banking Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-md mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-gold">
              Private Aviation & Card Rewards Engine
            </span>
          </div>

          {/* Headline: "Everyday spend, flown first class." */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-text tracking-tight leading-[1.08] mb-6">
            Everyday spend, <br />
            <span className="italic font-normal bg-gradient-to-r from-gold via-gold-light to-amber-200 bg-clip-text text-transparent">
              flown first class.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-8 max-w-xl">
            Engineered for India’s premium cardholders. Optimize points across HDFC, Axis, Amex, and SBI with real-time transfer sweet spots, CIBIL approval simulation, and deterministic NAV math.
          </p>

          {/* AI Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="glass-panel p-2 sm:p-2.5 max-w-2xl flex flex-col sm:flex-row gap-2 shadow-glass border-line/80 focus-within:border-gold/50 transition-all mb-4"
          >
            <div className="flex-1 flex items-center px-3 gap-3">
              <Search className="w-5 h-5 text-gold shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Ask e.g. 'How do I fly to London in Business for ₹12k?'"
                className="w-full bg-transparent text-sm sm:text-base text-text placeholder:text-text-muted/60 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-gold to-gold-deep text-slate-950 font-bold text-sm shadow-gold hover:opacity-95 active:scale-98 transition-all shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Ask AI Copilot</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </form>

          {/* Prompt Presets */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
            <span className="text-[11px] uppercase tracking-wider text-text-muted/70 mr-1">
              Popular:
            </span>
            {PROMPT_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className="px-3 py-1.5 rounded-lg border border-line bg-surface/50 hover:bg-surface-glass hover:border-gold/40 text-text-muted hover:text-gold transition-all text-left"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Trust Micro-Badges */}
          <div className="mt-10 pt-6 border-t border-line/40 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
              <span>100% Issuer Terms Cited</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>Zero Bureau Inquiries</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <Plane className="w-4 h-4 text-violet shrink-0" />
              <span>Real-Time Award Sweet Spots</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
