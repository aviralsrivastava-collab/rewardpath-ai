"use client";

import { useState, useCallback, useEffect } from "react";
import { Calculator, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import type { ROICalculation, SpendProfile } from "@/lib/types";
import { DEFAULT_SPEND } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const SPEND_FIELDS: { key: keyof SpendProfile; label: string; max: number; step: number }[] = [
  { key: "dining", label: "Dining & Food Delivery (Swiggy/Zomato)", max: 100000, step: 2500 },
  { key: "groceries", label: "Groceries & Supermarkets (Blinkit/Zepto)", max: 150000, step: 2500 },
  { key: "travel", label: "Airfare, Hotels & Cabs (Uber/MakeMyTrip)", max: 200000, step: 5000 },
  { key: "gas", label: "Fuel & EV Charging", max: 50000, step: 1000 },
  { key: "other", label: "Everyday Shopping (Amazon/Flipkart)", max: 300000, step: 5000 },
];

const PRESET_PROFILES: { label: string; profile: SpendProfile }[] = [
  {
    label: "Salaried Professional (₹50k/mo)",
    profile: { dining: 8000, groceries: 12000, travel: 10000, gas: 5000, other: 15000 },
  },
  {
    label: "High Travel & Dining (₹1.5L/mo)",
    profile: { dining: 30000, groceries: 25000, travel: 50000, gas: 10000, other: 35000 },
  },
  {
    label: "Online Shopper (₹80k/mo)",
    profile: { dining: 15000, groceries: 30000, travel: 10000, gas: 5000, other: 20000 },
  },
];

export function ROICalculator() {
  const [spend, setSpend] = useState<SpendProfile>(DEFAULT_SPEND);
  const [results, setResults] = useState<ROICalculation[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const calculate = useCallback(async (currentSpend: SpendProfile) => {
    setLoading(true);
    trackEvent("roi_calculate");

    try {
      const res = await fetch("/api/roi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentSpend),
      });
      const data = await res.json();
      setResults(data.results ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    calculate(spend);
  }, [spend, calculate]);

  const toggleExpand = (cardId: string) => {
    setExpandedCardId((prev) => (prev === cardId ? null : cardId));
  };

  return (
    <section id="calculator" className="bg-slate-950 px-3.5 py-16 sm:px-6 sm:py-20 border-t border-slate-800 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
            <Calculator className="h-3.5 w-3.5" />
            <span>Spend-Based Math Engine (India)</span>
          </div>
          <h2 className="font-display text-2xl font-black text-white sm:text-4xl">
            Net Annual Value (NAV) Calculator
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Net Annual Value = Annual Rewards Value − Annual Fee. Click any card row below to expand category breakdown.
          </p>
        </div>

        {/* Quick Profile Presets with smooth touch scroll */}
        <div className="mb-6 sm:mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center py-1">
          {PRESET_PROFILES.map((p) => (
            <button
              key={p.label}
              onClick={() => setSpend(p.profile)}
              className="px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-900 text-xs font-bold text-slate-300 hover:border-amber-500 hover:text-amber-400 transition-all cursor-pointer shrink-0 active:scale-98"
            >
              ⚡ {p.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Sliders / Inputs */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-2">
              Step 1: Enter Monthly Spend (₹/mo)
            </h3>
            {SPEND_FIELDS.map(({ key, label, max, step }) => (
              <div key={key} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs font-bold">
                  <span className="text-slate-300">{label}</span>
                  <span className="text-amber-400 font-extrabold whitespace-nowrap">{formatCurrency(spend[key])}/mo</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={max}
                  step={step}
                  value={spend[key]}
                  onChange={(e) =>
                    setSpend((s) => ({
                      ...s,
                      [key]: Number(e.target.value) || 0,
                    }))
                  }
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  aria-label={label}
                />
              </div>
            ))}
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-2 flex items-center justify-between">
              <span>Ranked Net Annual Value</span>
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />}
            </h3>

            {results.length > 0 ? (
              results.map((r, i) => {
                const isExpanded = expandedCardId === r.cardId;
                return (
                  <div
                    key={r.cardId}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    aria-label={`${r.cardName}, Net Annual Value ${formatCurrency(r.netAnnualValue)}. Click to toggle details.`}
                    onClick={() => toggleExpand(r.cardId)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleExpand(r.cardId);
                      }
                    }}
                    className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 sm:p-4 shadow-xl transition-all hover:border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-xs font-black text-amber-400 border border-amber-500/30 shrink-0">
                          #{i + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5 truncate">
                            <span className="truncate">{r.cardName}</span>
                            {isExpanded ? <ChevronUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400 shrink-0" /> : <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500 shrink-0" />}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            Rewards {formatCurrency(r.annualRewards)} − Fee {formatCurrency(r.annualFee)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">NAV</span>
                        <p
                          className={`text-base sm:text-lg font-black ${
                            r.netAnnualValue >= 0 ? "text-emerald-400" : "text-red-400"
                          }`}
                        >
                          {formatCurrency(r.netAnnualValue)}
                        </p>
                      </div>
                    </div>

                    {/* Expandable Breakdown */}
                    {isExpanded && r.breakdown && (
                      <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300 animate-fade-in">
                        <span className="text-[10px] uppercase font-bold text-amber-400 block">Category Rewards Breakdown</span>
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                          {r.breakdown.map((b) => (
                            <div key={b.category} className="p-2 rounded bg-slate-950 border border-slate-800">
                              <span className="capitalize font-semibold text-white">{b.category}: </span>
                              <span className="text-emerald-400 font-bold">{formatCurrency(b.cashValue)}</span>
                              <span className="text-[10px] text-slate-400 block">({b.multiplier}x multiplier)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center p-8 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
                Calculating rewards...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
