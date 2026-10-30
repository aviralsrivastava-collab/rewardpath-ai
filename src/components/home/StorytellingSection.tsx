"use client";

import React, { useState } from "react";
import { Plane, Utensils, ShoppingCart, Fuel, ArrowRight, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";

interface SuperpowerTier {
  id: string;
  category: string;
  multiplier: string;
  title: string;
  description: string;
  topCards: { name: string; rate: string; perk: string }[];
  partnerLogos: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const SUPERPOWERS: SuperpowerTier[] = [
  {
    id: "travel",
    category: "Travel & Flights",
    multiplier: "Up to 10x Return",
    title: "Fly Singapore Suites & Virgin Upper Class for Taxes Only",
    description:
      "Route international flight and luxury hotel stays via HDFC SmartBuy (10x points = 33.3% return) or Axis Travel Edge (5x EDGE Miles). Transfer 1:1 to Singapore KrisFlyer or 1:2 to Accor ALL.",
    topCards: [
      { name: "HDFC Infinia Metal", rate: "10x Points (33.3%)", perk: "1:1 Singapore, Air India, Virgin" },
      { name: "Axis Bank Atlas", rate: "5x EDGE Miles (10%)", perk: "1:2 Accor, Flying Blue, Qatar" },
    ],
    partnerLogos: ["Singapore Airlines", "Emirates", "Accor ALL", "Air India", "Virgin Atlantic"],
    icon: Plane,
  },
  {
    id: "dining",
    category: "Dining & Gourmet",
    multiplier: "5x Multipliers",
    title: "5x Uncapped Rewards at Restaurants & Food Delivery",
    description:
      "Never settle for 1% cashback on dining. HDFC Diners Club Black and Infinia yield 5x reward points on all Swiggy, Zomato, and restaurant POS swipes with zero monthly capping.",
    topCards: [
      { name: "HDFC Diners Black Metal", rate: "5x Points (16.6%)", perk: "Complimentary Club Marriott" },
      { name: "Amex MR Gold", rate: "5x Points on Gyftr", perk: "1,000 bonus pts on 6x ₹1k swipes" },
    ],
    partnerLogos: ["Swiggy", "Zomato", "EazyDiner", "Marriott Bonvoy"],
    icon: Utensils,
  },
  {
    id: "groceries",
    category: "Groceries & Daily Essentials",
    multiplier: "5% Flat Cashback",
    title: "Automatic Statement Credits on Quick-Commerce",
    description:
      "Blinkit, Zepto, and Instamart orders qualify for direct 5% monthly statement cashback via SBI Cashback Card. No voucher gymnastics or portal checkouts required.",
    topCards: [
      { name: "SBI Cashback Card", rate: "5% Online Cashback", perk: "Capped at ₹5,000 monthly" },
      { name: "ICICI Amazon Pay", rate: "5% on Amazon Fresh", perk: "Lifetime Free, zero fee" },
    ],
    partnerLogos: ["Blinkit", "Zepto", "Instamart", "Amazon Fresh", "Nature's Basket"],
    icon: ShoppingCart,
  },
  {
    id: "fuel",
    category: "Forex & Fuel Surcharges",
    multiplier: "2.0% Forex & 0% Surcharge",
    title: "Zero Friction Abroad and at the Pump",
    description:
      "Standard Indian cards charge 3.5% + 18% GST on international card swipes. Top tier cards slash forex markup to 2.0% or 0%, while fuel surcharge waivers protect every highway roadtrip.",
    topCards: [
      { name: "HDFC Infinia / DCB", rate: "2.0% Forex Fee", perk: "3.3% base reward offsets fee" },
      { name: "Axis Atlas", rate: "Fuel Surcharge Waived", perk: "1% waiver on ₹400-₹4,000 swipes" },
    ],
    partnerLogos: ["Priority Pass", "DreamFolks", "Indian Oil", "HPCL", "BPCL"],
    icon: Fuel,
  },
];

export function StorytellingSection() {
  const [activeTierIndex, setActiveTierIndex] = useState(0);
  const { openAdvisor } = useAppStore();
  const activeTier = SUPERPOWERS[activeTierIndex];
  const Icon = activeTier.icon;

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet/30 bg-violet/10 text-violet text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            The 4 Unfolded Superpowers
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-text tracking-tight mb-4">
            One metallic card. <br />
            <span className="italic font-normal text-gold">Four category multipliers.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            As you navigate daily life, your card transforms to extract maximum value from every merchant category code (MCC).
          </p>
        </div>

        {/* Tier Selector Pills */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-8">
          {SUPERPOWERS.map((tier, idx) => {
            const TierIcon = tier.icon;
            const isActive = idx === activeTierIndex;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setActiveTierIndex(idx)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "border-gold bg-gold/15 text-gold shadow-gold"
                    : "border-line bg-surface/60 text-text-muted hover:border-gold/40 hover:text-text"
                }`}
              >
                <TierIcon className="w-4 h-4" />
                <span>{tier.category}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface border border-line/60">
                  {tier.multiplier}
                </span>
              </button>
            );
          })}
        </div>

        {/* Storytelling Active State Card */}
        <div className="glass-panel p-6 sm:p-10 border-gold/30 bg-surface/85 relative overflow-hidden shadow-glass">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-wider text-gold uppercase">
                    Stage {activeTierIndex + 1} of 4 • {activeTier.category}
                  </span>
                  <div className="text-xs text-text-muted">{activeTier.multiplier}</div>
                </div>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-text leading-tight">
                {activeTier.title}
              </h3>

              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                {activeTier.description}
              </p>

              {/* Recommended Top Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {activeTier.topCards.map((card) => (
                  <div
                    key={card.name}
                    className="p-4 rounded-xl border border-line bg-surface/70 hover:border-gold/40 transition-colors"
                  >
                    <div className="font-bold text-text text-sm mb-1">{card.name}</div>
                    <div className="text-xs font-semibold text-gold mb-1">{card.rate}</div>
                    <div className="text-[11px] text-text-muted">{card.perk}</div>
                  </div>
                ))}
              </div>

              {/* Partner Logos Chips */}
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider text-text-muted block mb-2 font-semibold">
                  Key Transfer & Merchant Partners:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTier.partnerLogos.map((p) => (
                    <span
                      key={p}
                      className="px-2.5 py-1 rounded-lg text-xs bg-line/40 border border-line text-text font-medium"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openAdvisor(`How do I optimize ${activeTier.category} spend for maximum rewards?`)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gold hover:text-gold-light transition-colors"
                >
                  <span>Ask AI how to maximize {activeTier.category}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Side Visual Graphic */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl border border-line/60 bg-gradient-to-br from-surface to-slate-950/80 text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-4 animate-float-gentle">
                <Icon className="w-8 h-8" />
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-gold mb-1">
                Active Reward Multiplier
              </div>
              <div className="font-serif text-4xl sm:text-5xl font-light text-text mb-2">
                {activeTier.multiplier.split(" ")[0]}
              </div>
              <p className="text-xs text-text-muted max-w-xs mb-6">
                Verified against current RBI master guidelines and August 2025 bank devaluations.
              </p>
              <div className="w-full flex items-center justify-between text-xs px-4 py-2.5 rounded-xl border border-line bg-surface/50 text-text-muted">
                <span>Next Milestone:</span>
                <span className="font-bold text-text">₹4L Annual Spend</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
