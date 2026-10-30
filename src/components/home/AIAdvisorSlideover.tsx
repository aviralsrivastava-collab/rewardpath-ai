"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, X, Send, Loader2, ExternalLink, ShieldCheck } from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";

interface AdviseResponse {
  answer: string;
  steps: string[];
  citations: { label: string; url: string; excerpt: string }[];
  disclaimer: string;
}

export function AIAdvisorSlideover() {
  const { isAdvisorOpen, advisorQuery, closeAdvisor, walletCardIds } = useAppStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AdviseResponse | null>(null);
  const [streamedAnswer, setStreamedAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // When opened with a query, auto-execute
  useEffect(() => {
    if (isAdvisorOpen) {
      if (advisorQuery) {
        setInput(advisorQuery);
        handleSend(advisorQuery);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdvisorOpen, advisorQuery]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAdvisorOpen) closeAdvisor();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAdvisorOpen, closeAdvisor]);

  const handleSend = async (queryToSend?: string) => {
    const q = (queryToSend ?? input).trim();
    if (!q) return;

    setLoading(true);
    setError(null);
    setResponse(null);
    setStreamedAnswer("");

    try {
      const res = await fetch("/api/advise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, walletCards: walletCardIds }),
      });

      if (!res.ok) throw new Error("Advisor service unavailable");
      const data: AdviseResponse = await res.json();
      setResponse(data);

      // Smooth streaming text effect
      const fullText = data.answer || "Analysis complete.";
      let curr = "";
      for (let i = 0; i < fullText.length; i += 3) {
        curr += fullText.slice(i, i + 3);
        setStreamedAnswer(curr);
        await new Promise((r) => setTimeout(r, 12));
      }
      setStreamedAnswer(fullText);
    } catch {
      setError("Unable to connect to RewardPath Command Center AI. Please check connection and retry.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdvisorOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="RewardPath AI Advisor"
      className="fixed inset-0 z-50 overflow-hidden flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={closeAdvisor}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Slide-over Content Drawer */}
      <div
        ref={containerRef}
        className="relative w-full max-w-xl h-full bg-surface border-l border-line shadow-2xl flex flex-col z-10 animate-slide-up"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-line flex items-center justify-between bg-surface/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-text">
                RewardPath AI Advisor
              </h3>
              <span className="text-[10px] uppercase font-semibold text-gold tracking-wider block">
                Educational Grounded Analysis
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={closeAdvisor}
            aria-label="Close advisor panel"
            className="p-2 rounded-xl text-text-muted hover:text-text hover:bg-line/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Conversation Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Query Bubble */}
          <div className="p-4 rounded-2xl bg-line/30 border border-line text-xs sm:text-sm text-text">
            <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold block mb-1">
              Your Financial Query:
            </span>
            <p className="font-medium text-text">{input}</p>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="flex items-center gap-3 p-6 rounded-2xl glass-panel animate-pulse text-xs text-text-muted">
              <Loader2 className="w-5 h-5 text-gold animate-spin" />
              <span>Analyzing against CIBIL risk underwriting and verified issuer rules...</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-800 text-xs text-red-300">
              {error}
            </div>
          )}

          {/* Structured Output */}
          {response && (
            <div className="space-y-5 animate-fade-in">
              {/* Strategic Answer */}
              <div className="glass-panel p-5 sm:p-6 border-gold/30 space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Strategic Synthesis
                </span>
                <p className="text-xs sm:text-sm text-text leading-relaxed font-sans">
                  {streamedAnswer || response.answer}
                </p>
              </div>

              {/* Numbered Steps Playbook */}
              {response.steps && response.steps.length > 0 && (
                <div className="glass-panel p-5 sm:p-6 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-violet block">
                    Execution Steps
                  </span>
                  <div className="space-y-2.5">
                    {response.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-text">
                        <span className="w-5 h-5 rounded-full bg-line flex items-center justify-center text-[10px] font-bold text-gold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Issuer Citations */}
              {response.citations && response.citations.length > 0 && (
                <div className="glass-panel p-4 sm:p-5 space-y-2.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block">
                    Verified Issuer Citations:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {response.citations.map((c, idx) => (
                      <a
                        key={idx}
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line bg-surface/80 hover:border-gold/40 text-[11px] text-text hover:text-gold transition-colors"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                        <span className="truncate max-w-[200px]">{c.label}</span>
                        <ExternalLink className="w-3 h-3 text-text-muted" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Compliance Notice */}
              <div className="p-3.5 rounded-xl border border-line/60 bg-surface/40 text-[11px] text-text-muted">
                ⚠️ <strong>Not financial advice:</strong> {response.disclaimer} All Net Annual Value math and approval odds are for educational research only.
              </div>
            </div>
          )}
        </div>

        {/* Bottom Input Field */}
        <div className="p-4 border-t border-line bg-surface/95">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a follow-up (e.g. 'How does this compare to Axis Atlas?')..."
              className="flex-1 rounded-xl border border-line bg-surface px-4 py-3 text-xs sm:text-sm text-text focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 rounded-xl bg-gradient-to-r from-gold to-gold-deep text-slate-950 font-bold hover:opacity-90 disabled:opacity-40 transition-all shrink-0 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
