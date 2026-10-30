"use client";

import React, { useState, useMemo } from "react";
import { Calculator, ChevronDown, ChevronUp, Trophy, ExternalLink } from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";
import { SEED_CARDS } from "@/lib/data/seed-cards";
import { calculateROI } from "@/lib/calculator/roi";
import { formatCurrency } from "@/lib/utils";

export function NavCalculatorSection() {
  const { spend, setSpendCategory, applyPreset } = useAppStore();
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Compute live ROIs for all seed cards
  const rankedCards = useMemo(() => {
    const spendProfile = {
      dining: spend.dining,
      groceries: spend.groceries,
      travel: spend.travel,
      gas: spend.gas,
      other: spend.shopping,
    };

    return SEED_CARDS.map((card) => {
      const roi = calculateROI(card, spendProfile);
      return { card, roi };
    }).sort((a, b) => b.roi.netAnnualValue - a.roi.netAnnualValue);
  }, [spend]);

  const maxNav = Math.max(1, rankedCards[0]?.roi.netAnnualValue || 1);

  const toggleExpand = (cardId: string) => {
    setExpandedCardId(expandedCardId === cardId ? null : cardId);
  };

  return (
    <section id="calculator" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Deterministic NAV Math
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-text tracking-tight mb-4">
            Net Annual Value <br />
            <span className="italic font-normal text-gold">calculator & fee-waiver simulation.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Move sliders to your estimated monthly expenses. Net Annual Value (NAV) equals total annual points cash value plus milestone bonuses, minus the effective annual fee.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sliders & Presets (5 cols) */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                Spend Profile Presets
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => applyPreset("salaried")}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium border border-line bg-surface/70 hover:border-gold/40 text-text hover:text-gold transition-colors cursor-pointer"
                >
                  Salaried
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("travel")}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium border border-line bg-surface/70 hover:border-gold/40 text-text hover:text-gold transition-colors cursor-pointer"
                >
                  Travel Pro
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("shopper")}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium border border-line bg-surface/70 hover:border-gold/40 text-text hover:text-gold transition-colors cursor-pointer"
                >
                  Shopper
                </button>
              </div>
            </div>

            {/* Slider 1: Dining */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-text">
                <span>Dining & Food Delivery:</span>
                <span className="text-gold font-bold">{formatCurrency(spend.dining)}/mo</span>
              </div>
              <input
                type="range"
                min={0}
                max={100000}
                step={2000}
                value={spend.dining}
                onChange={(e) => setSpendCategory("dining", Number(e.target.value))}
                className="w-full accent-gold h-1.5 bg-line rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 2: Groceries */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-text">
                <span>Groceries & Supermarkets:</span>
                <span className="text-gold font-bold">{formatCurrency(spend.groceries)}/mo</span>
              </div>
              <input
                type="range"
                min={0}
                max={100000}
                step={2000}
                value={spend.groceries}
                onChange={(e) => setSpendCategory("groceries", Number(e.target.value))}
                className="w-full accent-gold h-1.5 bg-line rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 3: Travel */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-text">
                <span>Flights, Hotels & Vacations:</span>
                <span className="text-gold font-bold">{formatCurrency(spend.travel)}/mo</span>
              </div>
              <input
                type="range"
                min={0}
                max={150000}
                step={5000}
                value={spend.travel}
                onChange={(e) => setSpendCategory("travel", Number(e.target.value))}
                className="w-full accent-gold h-1.5 bg-line rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 4: Fuel */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-text">
                <span>Fuel & EV Charging:</span>
                <span className="text-gold font-bold">{formatCurrency(spend.gas)}/mo</span>
              </div>
              <input
                type="range"
                min={0}
                max={50000}
                step={1000}
                value={spend.gas}
                onChange={(e) => setSpendCategory("gas", Number(e.target.value))}
                className="w-full accent-gold h-1.5 bg-line rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 5: Online Shopping */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-text">
                <span>Online Shopping & Vouchers:</span>
                <span className="text-gold font-bold">{formatCurrency(spend.shopping)}/mo</span>
              </div>
              <input
                type="range"
                min={0}
                max={150000}
                step={5000}
                value={spend.shopping}
                onChange={(e) => setSpendCategory("shopping", Number(e.target.value))}
                className="w-full accent-gold h-1.5 bg-line rounded-lg cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl border border-line bg-surface/50 text-xs text-text-muted space-y-1">
              <div className="flex justify-between text-text font-bold">
                <span>Total Annual Spend:</span>
                <span className="text-gold">
                  {formatCurrency((spend.dining + spend.groceries + spend.travel + spend.gas + spend.shopping) * 12)}/yr
                </span>
              </div>
              <p className="text-[11px] text-text-muted/80">
                Spends above ₹8L - ₹10L automatically qualify for 100% annual fee waivers across super-premium cards.
              </p>
            </div>
          </div>

          {/* Right Column: Live Ranked Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-text-muted px-2">
              <span>Card & Net Return</span>
              <span>Net Annual Value (NAV)</span>
            </div>

            {rankedCards.slice(0, 6).map(({ card, roi }, idx) => {
              const isWinner = idx === 0;
              const isExpanded = expandedCardId === card.id;
              const percentageOfMax = Math.max(12, Math.min(100, (roi.netAnnualValue / maxNav) * 100));

              return (
                <div
                  key={card.id}
                  className={`glass-panel p-5 transition-all ${
                    isWinner ? "border-gold/50 bg-gold/5 shadow-gold" : "hover:border-line/90"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isWinner ? "bg-gold text-slate-950 font-black" : "bg-line text-text-muted"
                        }`}
                      >
                        {isWinner ? <Trophy className="w-3 h-3" /> : idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-text text-sm sm:text-base">{card.name}</h4>
                          {isWinner && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold/20 text-gold border border-gold/40">
                              #1 Highest Yield
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-text-muted">
                          {card.issuer} • Fee: {card.annualFee === 0 ? "₹0 Lifetime Free" : formatCurrency(roi.annualFee)}
                        </span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="font-serif text-xl sm:text-2xl font-light text-success">
                        {formatCurrency(roi.netAnnualValue)}
                      </div>
                      <span className="text-[11px] text-text-muted">
                        Rewards: {formatCurrency(roi.annualRewards)} − Fee
                      </span>
                    </div>
                  </div>

                  {/* Animated Bar Indicator */}
                  <div className="w-full h-2 rounded-full bg-line/60 overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${
                        isWinner ? "bg-gradient-to-r from-gold via-gold-light to-amber-300" : "bg-violet"
                      }`}
                      style={{ width: `${percentageOfMax}%` }}
                    />
                  </div>

                  {/* Accordion Toggle */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-line/40">
                    <button
                      type="button"
                      onClick={() => toggleExpand(card.id)}
                      className="inline-flex items-center gap-1 text-text-muted hover:text-gold font-medium cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide category breakdown" : "View per-category breakdown"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <a
                      href={card.sourceDocumentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-gold/80 hover:text-gold underline"
                    >
                      <span>Issuer terms PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Expandable Breakdown Drawer */}
                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-line/60 space-y-2 text-xs text-text animate-fade-in">
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {roi.breakdown.map((b) => (
                          <div key={b.category} className="p-2.5 rounded-lg bg-surface/70 border border-line">
                            <span className="text-[10px] uppercase font-semibold text-text-muted block">
                              {b.category}
                            </span>
                            <span className="font-bold text-success text-xs block mt-0.5">
                              {formatCurrency(b.cashValue)}
                            </span>
                            <span className="text-[10px] text-text-muted">{b.pointsEarned.toLocaleString()} pts</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 text-[11px] text-text-muted flex justify-between items-center">
                        <span>
                          Transfer Partners: {card.transferPartners.slice(0, 3).join(", ") || "Direct Cashback"}
                        </span>
                        <span className="text-gold font-medium">Verified: {card.lastSourceChecked}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="p-3 rounded-xl border border-line/60 bg-surface/40 text-[11px] text-text-muted">
              * Affiliate disclosure: We may earn compensation from verified bank issuer application links. All Net Annual Value calculations are non-sponsored and strictly deterministic.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
