"use client";

import { useState } from "react";
import { Search, Loader2, Sparkles, ExternalLink } from "lucide-react";
import type { MatchmakerResponse } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const EXAMPLE_QUERIES = [
  "How do I get to Paris for free?",
  "Best card for dining and travel",
  "No annual fee cash back options",
];

export function MatchmakerSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchmakerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(searchQuery?: string) {
    const q = (searchQuery ?? query).trim();
    if (q.length < 3) return;

    setLoading(true);
    setError(null);
    trackEvent("matchmaker_search", { query_length: q.length });

    try {
      const res = await fetch("/api/matchmaker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });

      if (!res.ok) throw new Error("Search failed");
      const data: MatchmakerResponse = await res.json();
      setResult(data);
      if (!searchQuery) setQuery(q);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="hero-search" className="w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder='Try "How do I get to Paris for free?"'
          className="w-full rounded-2xl border border-surface-border bg-white py-4 pl-12 pr-32 text-base shadow-card transition-shadow focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100 sm:text-lg"
          aria-label="Ask the AI Matchmaker"
        />
        <button
          type="button"
          onClick={() => handleSearch()}
          disabled={loading || query.trim().length < 3}
          className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-brand-700 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          Ask AI
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {EXAMPLE_QUERIES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => handleSearch(example)}
            className="rounded-full border border-surface-border bg-white px-3 py-1 text-xs text-slate-600 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
          >
            {example}
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-6 animate-slide-up rounded-2xl border border-surface-border bg-white p-6 shadow-card">
          <div className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-brand-600">
                The Matchmaker
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                {result.summary}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {result.recommendations.map((rec) => (
              <div
                key={rec.cardId}
                className="rounded-xl border border-surface-border p-4 transition-shadow hover:shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-medium text-brand-600">
                      #{rec.rank}
                    </span>
                    <h3 className="font-semibold text-slate-900">
                      {rec.cardName}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Net Annual Value</p>
                    <p
                      className={`text-lg font-bold ${
                        rec.netAnnualValue >= 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(rec.netAnnualValue)}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-600">{rec.reasoning}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>Rewards: {formatCurrency(rec.annualRewards)}/yr</span>
                  <span>Fee: {formatCurrency(rec.annualFee)}/yr</span>
                </div>
              </div>
            ))}
          </div>

          {result.citations.length > 0 && (
            <details className="mt-5">
              <summary className="cursor-pointer text-xs font-medium text-slate-500 hover:text-brand-600">
                View {result.citations.length} source citations
              </summary>
              <ul className="mt-2 space-y-2">
                {result.citations.map((cite) => (
                  <li
                    key={cite.chunkId}
                    className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600"
                  >
                    <p className="line-clamp-2">{cite.excerpt}</p>
                    <div className="mt-1 flex items-center gap-2 text-slate-400">
                      <span>Verified: {cite.lastSourceChecked}</span>
                      <a
                        href={cite.sourceDocumentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-brand-600 hover:underline"
                      >
                        Source <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          )}

          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            {result.disclaimer}
          </p>
          <p className="mt-1 text-xs text-amber-600">
            {result.affiliateDisclosure}
          </p>
        </div>
      )}
    </div>
  );
}
