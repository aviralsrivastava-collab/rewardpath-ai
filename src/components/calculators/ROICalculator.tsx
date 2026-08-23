"use client";

import { useState, useCallback, useEffect } from "react";
import { Calculator, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import type { ROICalculation, SpendProfile } from "@/lib/types";
import { DEFAULT_SPEND } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const SPEND_FIELDS: { key: keyof SpendProfile; label: string; max: number; step: number }[] = [
  { key: "dining", label: "Dining & Food Delivery (Swiggy/Zomato)", max: 100000, step: 2500 },
  { key: "groceries", label: "Supermarkets & Online Groceries (Blinkit/Zepto)", max: 150000, step: 2500 },
  { key: "travel", label: "Airfare, Hotels & Cabs (Uber/MakeMyTrip)", max: 200000, step: 5000 },
  { key: "gas", label: "Fuel & EV Charging", max: 50000, step: 1000 },
  { key: "other", label: "Everyday Purchases & Shopping (Amazon/Flipkart)", max: 300000, step: 5000 },
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
    <section id="calculator" className="bg-slate-950 px-4 py-20 sm:px-6 border-t border-slate-800 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
            <Calculator className="h-3.5 w-3.5" />
            <span>Spend-Based Math Engine (India)</span>
          </div>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
            Net Annual Value (NAV) Calculator
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl mx-auto">
            Net Annual Value = Annual Rewards Value − Annual Fee. Click any card row below to expand category breakdown.
          </p>
        </div>

        {/* Quick Profile Presets */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {PRESET_PROFILES.map((p) => (
            <button
              key={p.label}
              onClick={() => setSpend(p.profile)}
              className="px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-900 text-xs font-bold text-slate-300 hover:border-amber-500 hover:text-amber-400 transition-all cursor-pointer"
            >
              ⚡ {p.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sliders / Inputs */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-2">
              Step 1: Enter Monthly Spend (₹/mo)
            </h3>
            {SPEND_FIELDS.map(({ key, label, max, step }) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">{label}</span>
                  <span className="text-amber-400 font-extrabold">{formatCurrency(spend[key])}/mo</span>
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
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            ))}
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-2 flex items-center justify-between">
              <span>Ranked Card Net Annual Value (Click to expand)</span>
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />}
            </h3>

            {results.length > 0 ? (
              results.map((r, i) => {
                const isExpanded = expandedCardId === r.cardId;
                return (
                  <div
                    key={r.cardId}
                    onClick={() => toggleExpand(r.cardId)}
                    className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl transition-all hover:border-amber-500/40"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-xs font-black text-amber-400 border border-amber-500/30">
                          #{i + 1}
                        </span>
                        <div>
                          <p className="font-bold text-white text-sm flex items-center gap-1.5">
                            {r.cardName}
                            {isExpanded ? <ChevronUp className="h-4 w-4 text-amber-400" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                          </p>
                          <p className="text-xs text-slate-400">
                            Rewards {formatCurrency(r.annualRewards)} − Fee {formatCurrency(r.annualFee)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400">NAV</span>
                        <p
                          className={`text-lg font-black ${
                            r.netAnnualValue >= 0 ? "text-emerald-400" : "text-red-400"
                          }`}
                        >
                          {formatCurrency(r.netAnnualValue)}
                        </p>
                      </div>
                    </div>

                    {/* Expandable Breakdown */}
                    {isExpanded && r.breakdown && (
                      <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300 animate-fade-in">
                        <span className="text-[10px] uppercase font-bold text-amber-400 block">Category Rewards Breakdown</span>
                        <div className="grid grid-cols-2 gap-2">
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
