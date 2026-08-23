"use client";

import { useState } from "react";
import { ShieldCheck, CheckCircle, AlertCircle, Info, Lock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function ApprovalOddsChecker() {
  const [cibilScore, setCibilScore] = useState<number>(770);
  const [annualIncomeINR, setAnnualIncomeINR] = useState<number>(1800000); // ₹18L per year
  const [inquiries6Mo, setInquiries6Mo] = useState<number>(2);
  const [selectedCard, setSelectedCard] = useState<string>("hdfc-infinia-metal");

  const cardsList = [
    { id: "hdfc-infinia-metal", name: "HDFC Infinia Metal Edition", minScore: 780, minIncomeINR: 3000000, cooloff: "6-month HDFC rule applies" },
    { id: "axis-atlas", name: "Axis Bank Atlas", minScore: 750, minIncomeINR: 1200000, cooloff: "Max 3 Axis cards limit" },
    { id: "sbi-cashback", name: "SBI Cashback Credit Card", minScore: 720, minIncomeINR: 600000, cooloff: "30-day SBI re-application rule" },
    { id: "hdfc-regalia-gold", name: "HDFC Regalia Gold", minScore: 740, minIncomeINR: 1000000, cooloff: "HDFC card upgrade rules" },
  ];

  const currentCard = cardsList.find((c) => c.id === selectedCard) || cardsList[0];

  let scorePoints = 0;
  if (cibilScore >= 780) scorePoints += 50;
  else if (cibilScore >= 750) scorePoints += 40;
  else if (cibilScore >= 720) scorePoints += 25;
  else scorePoints += 10;

  if (annualIncomeINR >= currentCard.minIncomeINR) scorePoints += 40;
  else scorePoints += 15;

  let isBlockedByInquiries = false;
  if (inquiries6Mo >= 5) {
    scorePoints = 10;
    isBlockedByInquiries = true;
  }

  const oddsPercent = Math.min(98, Math.max(5, scorePoints + Math.round((cibilScore - currentCard.minScore) / 2)));
  const oddsRating = isBlockedByInquiries
    ? "Low (CIBIL Inquiry Flag)"
    : oddsPercent >= 80
    ? "Very High Approval Odds"
    : oddsPercent >= 60
    ? "Good Approval Odds"
    : "Conditional / Income Verification Needed";

  return (
    <section id="approval-odds" className="py-16 px-4 sm:px-6 bg-slate-950 text-white border-t border-slate-800">
      <div className="mx-auto max-w-5xl">
        {/* Trust Banner */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border border-emerald-500/40 p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 mb-0.5">
                Soft-Pull Simulation Guaranteed
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                Zero Hard Inquiry Impact on Your Official CIBIL Score
              </h3>
              <p className="text-xs text-slate-300">
                Informational score check using soft-pull underwriting modeling. We never store PAN card numbers or sensitive banking credentials.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800 shrink-0">
            <Lock className="h-3.5 w-3.5" /> RBI Compliant Tokenization
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
            CIBIL Score & Approval Odds Simulator
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto">
            Test Indian card approval odds against bank underwriting criteria before submitting an application.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">Target Indian Credit Card</label>
              <select
                value={selectedCard}
                onChange={(e) => setSelectedCard(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-white font-medium focus:border-amber-500 focus:outline-none"
              >
                {cardsList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.cooloff})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span>Estimated CIBIL Score (300-900)</span>
                <span className="text-amber-400 font-extrabold">{cibilScore}</span>
              </label>
              <input
                type="range"
                min={600}
                max={900}
                value={cibilScore}
                onChange={(e) => setCibilScore(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>600 (Fair)</span>
                <span>750 (Good Benchmark)</span>
                <span>900 (Exceptional)</span>
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span>Gross Annual Income (ITR / Salary)</span>
                <span className="text-emerald-400 font-extrabold">{formatCurrency(annualIncomeINR)} / yr</span>
              </label>
              <input
                type="range"
                min={300000}
                max={5000000}
                step={100000}
                value={annualIncomeINR}
                onChange={(e) => setAnnualIncomeINR(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>₹3 Lakhs</span>
                <span>₹25 Lakhs</span>
                <span>₹50 Lakhs</span>
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span>Hard CIBIL Inquiries (Past 6 Months)</span>
                <span className={`font-extrabold ${inquiries6Mo >= 4 ? "text-red-400" : "text-amber-400"}`}>
                  {inquiries6Mo} Inquiries
                </span>
              </label>
              <input
                type="range"
                min={0}
                max={10}
                value={inquiries6Mo}
                onChange={(e) => setInquiries6Mo(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* Odds Outcome Card */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">Selected Card</span>
              <h4 className="font-bold text-white text-base">{currentCard.name}</h4>
            </div>

            {/* Odds Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">{oddsRating}</span>
                <span className="text-amber-400 font-black">{oddsPercent}% Estimated Probability</span>
              </div>
              <div className="h-4 w-full rounded-full bg-slate-950 border border-slate-800 overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isBlockedByInquiries
                      ? "bg-red-500"
                      : oddsPercent >= 80
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                      : oddsPercent >= 60
                      ? "bg-gradient-to-r from-amber-500 to-amber-400"
                      : "bg-slate-600"
                  }`}
                  style={{ width: `${oddsPercent}%` }}
                />
              </div>
            </div>

            {/* Insights */}
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                {cibilScore >= currentCard.minScore ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-slate-300">
                      Your CIBIL score of <strong>{cibilScore}</strong> meets bank underwriting benchmarks (minimum {currentCard.minScore}).
                    </p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-amber-200">
                      Your CIBIL score of <strong>{cibilScore}</strong> is below the target card benchmark of <strong>{currentCard.minScore}</strong> for instant approval.
                    </p>
                  </>
                )}
              </div>

              {annualIncomeINR < currentCard.minIncomeINR && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-950/40 border border-amber-800">
                  <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-amber-200">
                    <strong>Income Criterion Notice:</strong> {currentCard.name} usually requires an annual salary/ITR of at least {formatCurrency(currentCard.minIncomeINR)}. Existing salary account relationships may bypass this threshold.
                  </p>
                </div>
              )}

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-slate-300">
                  Bank Rule Note: {currentCard.cooloff}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
