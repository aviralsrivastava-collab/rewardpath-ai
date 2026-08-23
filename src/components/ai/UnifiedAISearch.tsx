"use client";

import { useState } from "react";
import {
  Search,
  Loader2,
  Sparkles,
  ExternalLink,
  Plane,
  Hotel,
  Car,
  ShoppingBag,
  Gift,
  ShieldCheck,
  Calculator,
  CheckCircle2,
  TrendingUp,
  Award,
} from "lucide-react";
import type { NexusResponse } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const PRESET_QUERIES = [
  "What are my approval odds with 750 CIBIL score?",
  "I want to go to Dubai for vacation",
  "I want to go to Switzerland & Europe",
  "I have 50000 points in my HDFC Infinia card, how to redeem?",
  "Is it profitable to buy a car with a credit card?",
];

export function UnifiedAISearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<NexusResponse | null>(null);

  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  async function handleSearch(searchQuery?: string) {
    let q = (searchQuery ?? query).trim();
    if (!q) {
      q = "What are my approval odds with 750 CIBIL score?";
      setQuery(q);
    }

    setLoading(true);
    setError(null);
    setIsStreaming(true);
    setStreamedText("");
    trackEvent("nexus_search", { query: q });

    try {
      const res = await fetch("/api/matchmaker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          walletCards: ["hdfc-infinia-metal", "axis-atlas"],
        }),
      });

      if (!res.ok) throw new Error("Search failed");
      const data: NexusResponse = await res.json();
      setResult(data);

      const summaryText: string = data.summary || "Analysis complete.";
      let curr = "";
      for (let i = 0; i < summaryText.length; i += 3) {
        curr += summaryText.slice(i, i + 3);
        setStreamedText(curr);
        await new Promise((r) => setTimeout(r, 12));
      }
      setStreamedText(summaryText);
    } catch {
      setError("Unable to process request with RewardPath Command Center AI. Please try again.");
    } finally {
      setLoading(false);
      setIsStreaming(false);
    }
  }

  return (
    <div id="hero-search" className="w-full max-w-4xl mx-auto">
      {/* Title Badge */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold shadow-md">
          <Sparkles className="h-4 w-4" /> RewardPath Command Center AI Engine
        </span>
      </div>

      {/* Input Box */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder='Try "750 CIBIL score approval odds", "I want to go to Dubai", "How to redeem HDFC points?"...'
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/95 py-4 pl-12 pr-40 text-sm sm:text-base text-white shadow-2xl backdrop-blur-xl focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 placeholder:text-slate-500"
          aria-label="Search RewardPath Nexus"
        />
        <button
          type="button"
          onClick={() => handleSearch()}
          disabled={loading}
          className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          AI Search
        </button>
      </div>

      {/* Preset Buttons */}
      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        {PRESET_QUERIES.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setQuery(preset);
              handleSearch(preset);
            }}
            className="rounded-full border border-slate-800 bg-slate-900/80 px-3.5 py-1 text-xs text-slate-300 transition-all hover:border-amber-500/50 hover:bg-slate-800 hover:text-amber-400 cursor-pointer"
          >
            {preset}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-4 rounded-xl bg-red-950/50 border border-red-800 p-3 text-xs text-red-300 text-center">
          {error}
        </div>
      )}

      {/* NEXUS RESULT DISPLAY */}
      {result && (
        <div className="mt-6 text-left animate-slide-up rounded-2xl border border-slate-800 bg-slate-900/90 p-6 text-slate-100 shadow-2xl space-y-6">
          {/* Header Summary */}
          <div className="flex items-start gap-3 border-b border-slate-800 pb-4">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                RewardPath Command Center AI Output
              </span>
              <p className="mt-1 text-sm leading-relaxed text-slate-200">
                {isStreaming ? streamedText : result.summary}
              </p>
              {result.clarifyingQuestion && (
                <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-bold">
                  ❓ <strong>Clarification Request:</strong> {result.clarifyingQuestion}
                </div>
              )}
            </div>
          </div>

          {/* MULTI-INTENT SUB-RESPONSES */}
          {result.multiIntentSubResponses && result.multiIntentSubResponses.length > 0 && (
            <div className="rounded-2xl border border-purple-500/40 bg-slate-950 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                  Multi-Intent Strategy Breakdown
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {result.multiIntentSubResponses.map((sub, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-purple-800/40 space-y-2">
                    <span className="text-xs font-bold text-purple-400 block uppercase">{sub.subIntentType}</span>
                    <p className="font-extrabold text-white text-sm">{sub.title}</p>
                    <div className="space-y-1 text-slate-300">
                      {sub.details.map((d, dIdx) => (
                        <p key={dIdx} className="leading-relaxed flex items-start gap-1.5">
                          <span className="text-purple-400 font-bold">•</span> {d}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CIBIL CREDIT RISK ANALYSIS */}
          {result.creditRiskAnalysis && (
            <div className="rounded-2xl border border-emerald-500/40 bg-slate-950 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  CIBIL Credit Risk & Approval Odds Assessment
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                  {result.creditRiskAnalysis.approvalOddsPercentage}% Odds — {result.creditRiskAnalysis.approvalOddsVerdict}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">CIBIL Score Band</span>
                  <span className="text-emerald-400 font-extrabold text-sm">{result.creditRiskAnalysis.cibilScoreBand}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Hard Inquiry Velocity Risk</span>
                  <span className="text-amber-400 font-extrabold text-sm">{result.creditRiskAnalysis.inquiryVelocityRisk}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Debt-to-Income Assessment</span>
                  <span className="text-emerald-300 font-black text-sm">{result.creditRiskAnalysis.dtiAssessment}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
                📌 <strong>Issuer Rule Evaluation:</strong> {result.creditRiskAnalysis.issuerRulesNotes}
              </p>

              <div className="space-y-1.5 text-xs text-slate-300">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block">Risk Reduction & Optimization Playbook:</span>
                {result.creditRiskAnalysis.mitigationPlaybook.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONSUMER BEHAVIOR & SPEND BENCHMARK */}
          {result.consumerBehaviorInsight && (
            <div className="rounded-2xl border border-amber-500/40 bg-slate-950 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-400" />
                  Indian Consumer Spend Benchmark: <span className="text-amber-400">{result.consumerBehaviorInsight.cityTierCategory}</span>
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
                📊 {result.consumerBehaviorInsight.spendingPatternOverview}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {result.consumerBehaviorInsight.topCategoryMultipliers.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-bold block text-[11px]">{m.category}</span>
                    <p className="text-white font-extrabold text-sm">{m.recommendedCard}</p>
                    <span className="text-emerald-400 text-[11px] font-semibold">{m.yieldText}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 italic">
                ℹ️ {result.consumerBehaviorInsight.rbiUsageTrendNote}
              </p>
            </div>
          )}

          {/* 1. AI STRUCTURED TRIP PLANNER */}
          {result.tripPlanner && (
            <div className="rounded-2xl border border-cyan-500/40 bg-slate-950 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Plane className="h-5 w-5 text-cyan-400" />
                  AI Structured Trip Planner: <span className="text-cyan-400">{result.tripPlanner.destination}</span>
                </h3>
                {result.tripPlanner.recommendedTotalSavingsEstimate && (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                    {result.tripPlanner.recommendedTotalSavingsEstimate}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Flights */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold uppercase text-[10px] flex items-center gap-1">
                    <Plane className="h-3.5 w-3.5" /> 1. Flights Strategy
                  </span>
                  <p className="font-bold text-white text-sm">{result.tripPlanner.flightsStrategy.cardName}</p>
                  <span className="text-amber-400 font-semibold block">{result.tripPlanner.flightsStrategy.multiplierText}</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{result.tripPlanner.flightsStrategy.instruction}</p>
                </div>

                {/* Hotels */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold uppercase text-[10px] flex items-center gap-1">
                    <Hotel className="h-3.5 w-3.5" /> 2. Hotels Strategy
                  </span>
                  <p className="font-bold text-white text-sm">{result.tripPlanner.hotelsStrategy.cardName}</p>
                  <span className="text-emerald-400 font-semibold block">{result.tripPlanner.hotelsStrategy.transferRatio}</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{result.tripPlanner.hotelsStrategy.instruction}</p>
                </div>

                {/* Cabs */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold uppercase text-[10px] flex items-center gap-1">
                    <Car className="h-3.5 w-3.5" /> 3. Local Cabs & Transit
                  </span>
                  <p className="font-bold text-white text-sm">{result.tripPlanner.cabsStrategy.cardName}</p>
                  <span className="text-amber-400 font-semibold block">{result.tripPlanner.cabsStrategy.multiplierText}</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{result.tripPlanner.cabsStrategy.instruction}</p>
                </div>

                {/* Shopping & Forex */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold uppercase text-[10px] flex items-center gap-1">
                    <ShoppingBag className="h-3.5 w-3.5" /> 4. Shopping & Forex
                  </span>
                  <p className="font-bold text-white text-sm">{result.tripPlanner.shoppingForexStrategy.cardName}</p>
                  <span className="text-emerald-400 font-semibold block">{result.tripPlanner.shoppingForexStrategy.forexMarkup}% Forex Fee</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{result.tripPlanner.shoppingForexStrategy.instruction}</p>
                </div>
              </div>

              {/* Airport Lounge & Travel Perks */}
              {result.tripPlanner.loungeAndPerksAdvice && (
                <div className="p-3 rounded-xl bg-slate-900 border border-cyan-800/60 text-xs text-cyan-200">
                  🛫 <strong>Airport Lounge & Travel Insurance:</strong> {result.tripPlanner.loungeAndPerksAdvice}
                </div>
              )}

              {/* Active Wallet Advice */}
              {result.tripPlanner.walletOptimizationAdvice && (
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800 text-xs text-cyan-200">
                  💡 <strong>Active Wallet Advice:</strong> {result.tripPlanner.walletOptimizationAdvice}
                </div>
              )}
            </div>
          )}

          {/* 2. PURCHASE PROFITABILITY ANALYSIS */}
          {result.purchaseProfitability && (
            <div className="rounded-2xl border border-emerald-500/40 bg-slate-950 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  Profitability Analysis: <span className="text-emerald-400">{result.purchaseProfitability.itemType}</span>
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                  {result.purchaseProfitability.verdictTitle}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Estimated Rewards Earned</span>
                  <span className="text-emerald-400 font-extrabold text-sm">{result.purchaseProfitability.rewardsValueEstimate}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Merchant Surcharge Fee</span>
                  <span className="text-amber-400 font-extrabold text-sm">{result.purchaseProfitability.merchantSurchargeEstimate}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Net Profit Advantage</span>
                  <span className="text-emerald-300 font-black text-sm">{result.purchaseProfitability.netProfitOrLoss}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
                💡 <strong>Verdict Rationale:</strong> {result.purchaseProfitability.reasoning}
              </p>

              <div className="space-y-1.5 text-xs text-slate-300">
                <span className="text-[10px] uppercase font-bold text-amber-400 block">Step-by-Step Purchase Process:</span>
                {result.purchaseProfitability.stepByStepProcess.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. POINT REDEMPTION & UTILIZATION GUIDE */}
          {result.redemptionGuide && (
            <div className="rounded-2xl border border-emerald-500/40 bg-slate-950 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Gift className="h-5 w-5 text-emerald-400" />
                  {result.redemptionGuide.programName}
                </h3>
                {result.redemptionGuide.totalRupeeValueEstimate && (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                    Yield: {result.redemptionGuide.totalRupeeValueEstimate}
                  </span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                <p className="text-amber-400 font-bold">📍 Where to Use Points:</p>
                <p>{result.redemptionGuide.whereToUsePoints}</p>
                <p className="text-slate-400 text-[11px] mt-1">Transfer Ratio: <strong className="text-white">{result.redemptionGuide.transferRatio}</strong></p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block">Step-by-Step Point Redemption Guide:</span>
                {result.redemptionGuide.stepByStepProcess.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. RANKED CARD RECOMMENDATIONS */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Ranked Recommended Credit Cards
            </h3>
            {result.recommendations.map((rec) => (
              <div
                key={rec.cardId}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-all hover:border-amber-500/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        RANK #{rec.rank}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-extrabold text-emerald-300">
                        Verified / Devaluation Updated: Aug 2025
                      </span>
                    </div>
                    <h4 className="mt-1 text-base font-bold text-white">{rec.cardName}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-semibold text-slate-400">Net Annual Value</p>
                    <p className="text-xl font-black text-emerald-400">{formatCurrency(rec.netAnnualValue)}</p>
                  </div>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">{rec.reasoning}</p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-3 text-xs">
                  <div className="flex items-center gap-4 font-medium text-slate-400">
                    <span>Rewards: <strong className="text-emerald-400">{formatCurrency(rec.annualRewards)}</strong></span>
                    <span>Fee: <strong className="text-slate-200">{formatCurrency(rec.annualFee)}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => scrollToSection("calculator")}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-amber-400 font-bold hover:bg-slate-800 transition-all text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <Calculator className="h-3 w-3" /> ROI Calculator
                    </button>
                    <button
                      onClick={() => scrollToSection("approval-odds")}
                      className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold hover:bg-emerald-500/20 transition-all text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <ShieldCheck className="h-3 w-3" /> Check Odds
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Source Citations */}
          {result.citations.length > 0 && (
            <details className="border-t border-slate-800 pt-3">
              <summary className="cursor-pointer text-xs font-semibold text-amber-400 hover:underline">
                View {result.citations.length} Grounded Source Citations (Issuer Verification)
              </summary>
              <div className="mt-3 space-y-2">
                {result.citations.map((cite) => (
                  <div key={cite.chunkId} className="rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs text-slate-300">
                    <p className="italic text-slate-200">&quot;{cite.excerpt}&quot;</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Effective: {cite.effectiveDate} | Verified: {cite.lastSourceChecked}</span>
                      <a
                        href={cite.sourceDocumentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-amber-400 hover:underline font-medium"
                      >
                        Issuer Doc <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          )}

          <div className="border-t border-slate-800/80 pt-3 text-[11px] text-slate-400 space-y-1">
            <p>ℹ️ {result.disclaimer}</p>
            <p className="text-amber-400/90 font-medium">🤝 {result.affiliateDisclosure}</p>
          </div>
        </div>
      )}
    </div>
  );
}
