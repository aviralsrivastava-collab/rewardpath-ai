"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  Loader2,
  ExternalLink,
  Database,
  Plane,
  Gift,
  ShoppingBag,
} from "lucide-react";
import type { NexusResponse, Citation } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

interface ModelStatus {
  version: string;
  buildTimestamp: string;
  modelName: string;
  cardCount: number;
  chunkCount: number;
  status: string;
}

export function AIAssistantModal({ isOpen, onClose, initialQuery = "" }: AIAssistantModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<NexusResponse | null>(null);
  const [modelStatus, setModelStatus] = useState<ModelStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    async function fetchModelStatus() {
      try {
        const res = await fetch("/api/ai/chat");
        if (res.ok) {
          const data = await res.json();
          if (data.modelStatus) setModelStatus(data.modelStatus);
        }
      } catch {
        // Fallback status
      }
    }
    if (isOpen) {
      fetchModelStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSend(customQuery?: string) {
    const q = (customQuery ?? query).trim();
    if (!q) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, walletCards: ["hdfc-infinia-metal", "axis-atlas"] }),
      });

      if (!res.ok) throw new Error("RewardPath Nexus request failed");
      const data = await res.json();
      setResponse(data);
    } catch {
      setError("Unable to process request with RewardPath Nexus. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-white">RewardPath Nexus AI</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  <Database className="h-3 w-3" /> Unified Nexus Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {modelStatus
                  ? `Model: ${modelStatus.modelName} (v${modelStatus.version}) • ${modelStatus.cardCount} Cards & ${modelStatus.chunkCount} T&C Chunks Indexed`
                  : "Deterministic Math + Semantic Embeddings Index"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
            aria-label="Close Modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
          {!response && !loading && (
            <div className="text-center py-8">
              <Sparkles className="h-12 w-12 text-amber-400/40 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">Ask RewardPath Nexus AI Anything</h3>
              <p className="mt-1 text-xs text-slate-400 max-w-md mx-auto">
                Get full structured trip planners, item purchase strategies, point redemption guides, and grounded card recommendations.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  "I want to go to Dubai for vacation",
                  "I want to buy an iPhone 16 Pro on cashback",
                  "How do I redeem my reward points for flights & hotels?",
                  "Best credit cards in India for travel and dining",
                ].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setQuery(preset);
                      handleSend(preset);
                    }}
                    className="rounded-full border border-slate-800 bg-slate-950/80 px-3.5 py-1.5 text-xs text-slate-300 hover:border-amber-500/50 hover:text-amber-400 transition-all cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin text-amber-400 mb-3" />
              <p className="text-xs font-semibold">RewardPath Nexus AI is analyzing query & grounded T&C index...</p>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-800 bg-red-950/40 p-4 text-xs text-red-300">
              {error}
            </div>
          )}

          {response && (
            <div className="space-y-4 text-left animate-slide-up">
              {/* Summary */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-200 leading-relaxed">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  Nexus AI Summary
                </span>
                <p>{response.summary}</p>
              </div>

              {/* Trip Planner */}
              {response.tripPlanner && (
                <div className="rounded-2xl border border-cyan-500/40 bg-slate-950 p-4 space-y-3 text-xs">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Plane className="h-4 w-4 text-cyan-400" /> Structured Trip Planner ({response.tripPlanner.destination})
                  </h4>
                  <p>✈️ <strong>Flights:</strong> {response.tripPlanner.flightsStrategy.instruction}</p>
                  <p>🏨 <strong>Hotels:</strong> {response.tripPlanner.hotelsStrategy.instruction}</p>
                  <p>🛍️ <strong>Forex & Shopping:</strong> {response.tripPlanner.shoppingForexStrategy.instruction}</p>
                </div>
              )}

              {/* Purchase Strategy */}
              {response.purchaseStrategy && (
                <div className="rounded-2xl border border-amber-500/40 bg-slate-950 p-4 space-y-2 text-xs">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-amber-400" /> Item Purchase Strategy ({response.purchaseStrategy.targetItem})
                  </h4>
                  <p className="text-slate-300 font-semibold">Recommended Card: {response.purchaseStrategy.recommendedCard}</p>
                  {response.purchaseStrategy.stepByStepProcess.map((step, i) => (
                    <p key={i} className="text-slate-400">• {step}</p>
                  ))}
                </div>
              )}

              {/* Redemption Guide */}
              {response.redemptionGuide && (
                <div className="rounded-2xl border border-emerald-500/40 bg-slate-950 p-4 space-y-2 text-xs">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Gift className="h-4 w-4 text-emerald-400" /> Point Redemption & Utilization Guide
                  </h4>
                  <p className="text-slate-300"><strong>Where to use:</strong> {response.redemptionGuide.whereToUsePoints}</p>
                  {response.redemptionGuide.stepByStepProcess.map((step, i) => (
                    <p key={i} className="text-slate-400">{step}</p>
                  ))}
                </div>
              )}

              {/* Recommendations */}
              {response.recommendations && response.recommendations.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Ranked Recommendations
                  </h4>
                  {response.recommendations.map((rec) => (
                    <div
                      key={rec.cardId}
                      className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-2 hover:border-amber-500/40 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            RANK #{rec.rank}
                          </span>
                          <h5 className="text-base font-bold text-white mt-1">{rec.cardName}</h5>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-semibold text-slate-400">Net Annual Value</span>
                          <p className="text-lg font-black text-emerald-400">{formatCurrency(rec.netAnnualValue)}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{rec.reasoning}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Grounded Citations */}
              {response.citations && response.citations.length > 0 && (
                <details className="border-t border-slate-800 pt-3">
                  <summary className="cursor-pointer text-xs font-bold text-amber-400 hover:underline">
                    View {response.citations.length} Grounded Issuer Source Citations
                  </summary>
                  <div className="mt-3 space-y-2">
                    {response.citations.map((cite: Citation) => (
                      <div key={cite.chunkId} className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-300">
                        <p className="italic text-slate-200">&quot;{cite.excerpt}&quot;</p>
                        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                          <span>Effective: {cite.effectiveDate} | Verified: {cite.lastSourceChecked}</span>
                          <a
                            href={cite.sourceDocumentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-amber-400 hover:underline font-semibold"
                          >
                            Source Document <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          )}
        </div>

        {/* Footer Input Bar */}
        <div className="border-t border-slate-800 bg-slate-950 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask RewardPath Nexus AI about Dubai travel, iPhone purchase, redeeming points..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-xs font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
