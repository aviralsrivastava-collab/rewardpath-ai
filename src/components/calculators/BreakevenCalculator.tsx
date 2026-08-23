"use client";

import { useState } from "react";
import { Coins, CheckCircle2, AlertTriangle, Plane } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const ROUTE_PRESETS = [
  {
    name: "Mumbai ✈️ London (Business Class)",
    cashPrice: 185000,
    pointsRequired: 45000,
    taxesAndFees: 9500,
    baseline: 1.0,
  },
  {
    name: "Delhi ✈️ Singapore (KrisFlyer)",
    cashPrice: 65000,
    pointsRequired: 20000,
    taxesAndFees: 4500,
    baseline: 1.5,
  },
  {
    name: "Bengaluru ✈️ Dubai (Economy)",
    cashPrice: 35000,
    pointsRequired: 12500,
    taxesAndFees: 3000,
    baseline: 1.0,
  },
];

export function BreakevenCalculator() {
  const [cashPrice, setCashPrice] = useState<number>(185000);
  const [pointsRequired, setPointsRequired] = useState<number>(45000);
  const [taxesAndFees, setTaxesAndFees] = useState<number>(9500);
  const [baselineReVal, setBaselineReVal] = useState<number>(1.0);

  const netCashSaved = Math.max(0, cashPrice - taxesAndFees);
  const rupeePerPoint = pointsRequired > 0 ? netCashSaved / pointsRequired : 0;
  const isSweetSpot = rupeePerPoint >= baselineReVal;
  const pointOpportunityValINR = pointsRequired * baselineReVal;
  const netAdvantageINR = netCashSaved - pointOpportunityValINR;

  const applyPreset = (p: typeof ROUTE_PRESETS[0]) => {
    setCashPrice(p.cashPrice);
    setPointsRequired(p.pointsRequired);
    setTaxesAndFees(p.taxesAndFees);
    setBaselineReVal(p.baseline);
  };

  return (
    <section id="breakeven" className="py-16 px-4 sm:px-6 bg-slate-900 text-white border-t border-slate-800">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400 mb-2">
            <Coins className="h-3.5 w-3.5" />
            <span>Redemption Math Grounding</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
            Cash vs. Points Breakeven Calculator (India)
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Click any route preset below or adjust inputs to calculate exact Rupee-per-point (₹/pt) value.
          </p>
        </div>

        {/* Route Presets */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {ROUTE_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-950 text-xs font-bold text-slate-300 hover:border-cyan-500 hover:text-cyan-400 transition-all cursor-pointer"
            >
              <Plane className="h-3.5 w-3.5 text-cyan-400" /> {p.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl space-y-5">
            <div>
              <label className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span>Flight or Hotel Cash Fare</span>
                <span className="text-amber-400 font-extrabold">{formatCurrency(cashPrice)}</span>
              </label>
              <input
                type="range"
                min={10000}
                max={500000}
                step={5000}
                value={cashPrice}
                onChange={(e) => setCashPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div>
              <label className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span>Reward Points / Miles Required</span>
                <span className="text-cyan-400 font-extrabold">{pointsRequired.toLocaleString()} pts</span>
              </label>
              <input
                type="range"
                min={5000}
                max={200000}
                step={2500}
                value={pointsRequired}
                onChange={(e) => setPointsRequired(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            <div>
              <label className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span>Taxes & Airline Surcharges</span>
                <span className="text-slate-200 font-extrabold">{formatCurrency(taxesAndFees)}</span>
              </label>
              <input
                type="range"
                min={500}
                max={35000}
                step={500}
                value={taxesAndFees}
                onChange={(e) => setTaxesAndFees(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-2 block">
                Target Baseline Point Valuation
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "HDFC Infinia (₹1.0)", val: 1.0 },
                  { label: "Accor ALL (₹1.8)", val: 1.8 },
                  { label: "KrisFlyer (₹1.5)", val: 1.5 },
                ].map((b) => (
                  <button
                    key={b.label}
                    onClick={() => setBaselineReVal(b.val)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      baselineReVal === b.val
                        ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Column */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Point Value Yield</span>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black border ${
                  isSweetSpot
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                }`}
              >
                {isSweetSpot ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                {isSweetSpot ? "HIGH VALUE SWEET SPOT" : "BELOW BASELINE THRESHOLD"}
              </span>
            </div>

            <div className="text-center p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-5xl font-black text-white">₹{rupeePerPoint.toFixed(2)}<span className="text-2xl text-amber-400"> / pt</span></div>
              <p className="mt-2 text-xs text-slate-400">
                Each point yields <strong>₹{rupeePerPoint.toFixed(2)}</strong> in real ticket value vs baseline threshold of <strong>₹{baselineReVal}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Point Opportunity Cost</span>
                <span className="text-base font-bold text-white">{formatCurrency(pointOpportunityValINR)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Net Rupee Advantage</span>
                <span className={`text-base font-bold ${netAdvantageINR >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {netAdvantageINR >= 0 ? `+${formatCurrency(netAdvantageINR)}` : formatCurrency(netAdvantageINR)}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-white">💡 Decision Recommendation:</p>
              <p>
                {isSweetSpot
                  ? `Book with Points! You are getting ₹${rupeePerPoint.toFixed(2)}/pt value, saving ${formatCurrency(netCashSaved)} in cash.`
                  : `Consider Paying Cash. The redemption value (₹${rupeePerPoint.toFixed(2)}/pt) is under your target baseline of ₹${baselineReVal}/pt.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
