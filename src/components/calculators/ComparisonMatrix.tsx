"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Layers, Search, CheckSquare, Square, X, Award, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface DetailedComparisonCard {
  id: string;
  name: string;
  issuer: string;
  annualFee: number;
  feeWaiverThresholdINR: number;
  baseSpendINR: number;
  pointValueINR: number;
  loungeAccessSummary: string;
  forexMarkup: number;
  welcomeBonus: string;
  welcomeBonusDetails: string;
  transferPartners: string[];
  rewardCategories: Record<string, number>;
  sourceDocumentUrl: string;
  lastSourceChecked: string;
}

export function ComparisonMatrix() {
  const [cards, setCards] = useState<DetailedComparisonCard[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssuer, setSelectedIssuer] = useState<string>("All");
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cards")
      .then((r) => r.json())
      .then((data) => setCards(data.cards ?? []))
      .catch(() => setCards([]))
      .finally(() => setLoading(false));
  }, []);

  const issuers = ["All", ...Array.from(new Set(cards.map((c) => c.issuer)))];

  const filteredCards = cards.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIssuer = selectedIssuer === "All" || c.issuer === selectedIssuer;
    return matchesSearch && matchesIssuer;
  });

  const toggleSelectCard = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter((item) => item !== id));
    } else {
      if (selectedForCompare.length < 3) {
        setSelectedForCompare([...selectedForCompare, id]);
      }
    }
  };

  const selectedCardsData = cards.filter((c) => selectedForCompare.includes(c.id));

  // Determine row winners for dynamic green highlighting
  const minFee = Math.min(...(selectedCardsData.map((c) => c.annualFee).length > 0 ? selectedCardsData.map((c) => c.annualFee) : [0]));
  const maxTravelMult = Math.max(...(selectedCardsData.map((c) => c.rewardCategories.travel ?? 0).length > 0 ? selectedCardsData.map((c) => c.rewardCategories.travel ?? 0) : [0]));
  const maxPointValue = Math.max(...(selectedCardsData.map((c) => c.pointValueINR ?? 1).length > 0 ? selectedCardsData.map((c) => c.pointValueINR ?? 1) : [0]));

  return (
    <section id="compare" className="relative px-4 py-20 sm:px-6 bg-slate-900 text-white border-t border-slate-800">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
            <Layers className="h-3.5 w-3.5" />
            <span>Structured Relational Fact Store</span>
          </div>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
            Dynamic Card Comparison Decision Engine
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl mx-auto">
            Search, filter, or select up to 3 cards for an active side-by-side comparison with dynamic metric winner highlighting.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cards by name or issuer..."
              className="w-full rounded-xl bg-slate-900 border border-slate-800 py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Issuer Filters */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {issuers.map((iss) => (
              <button
                key={iss}
                onClick={() => setSelectedIssuer(iss)}
                className={`px-3 py-1.5 rounded-lg font-bold border transition-all cursor-pointer ${
                  selectedIssuer === iss
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {iss}
              </button>
            ))}
          </div>

          {/* Side-by-Side Trigger */}
          {selectedForCompare.length > 0 && (
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-extrabold shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" /> Compare Now ({selectedForCompare.length}/3)
            </button>
          )}
        </div>

        {loading ? (
          <div className="mt-10 text-center text-xs text-slate-400">
            Fetching verified card database…
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
            <table className="w-full min-w-[700px] text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900 text-slate-300">
                  <th className="px-5 py-4 font-bold">Select</th>
                  <th className="px-5 py-4 font-bold">Card & Issuer</th>
                  <th className="px-5 py-4 font-bold">Annual Fee & Waiver</th>
                  <th className="px-5 py-4 font-bold">Forex Markup</th>
                  <th className="px-5 py-4 font-bold">Welcome Bonus</th>
                  <th className="px-5 py-4 font-bold">Cited Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredCards.map((card) => {
                  const isSelected = selectedForCompare.includes(card.id);
                  return (
                    <tr key={card.id} className="transition-colors hover:bg-slate-900/60">
                      <td className="px-5 py-4">
                        <button
                          onClick={() => toggleSelectCard(card.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                        >
                          {isSelected ? (
                            <CheckSquare className="h-5 w-5 text-amber-400" />
                          ) : (
                            <Square className="h-5 w-5 text-slate-600" />
                          )}
                          <span>{isSelected ? "Selected" : "+ Compare"}</span>
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold text-white text-base">{card.name}</p>
                        <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                          <span className="text-[11px] font-semibold text-amber-400">{card.issuer}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-extrabold text-emerald-300">
                            Verified / Devaluation Updated: Aug 2025
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-bold">
                        {card.annualFee === 0 ? (
                          <span className="text-emerald-400 font-extrabold block">₹0 (No Fee)</span>
                        ) : (
                          <span className="text-slate-200 block">{formatCurrency(card.annualFee)}</span>
                        )}
                        {card.feeWaiverThresholdINR > 0 && (
                          <span className="text-[10px] text-slate-400 block font-normal">
                            Waived on {formatCurrency(card.feeWaiverThresholdINR)} spend
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 font-bold">
                        {card.forexMarkup === 0 ? (
                          <span className="text-emerald-400 font-bold">0% (No Forex Fee)</span>
                        ) : (
                          <span className="text-slate-400">{card.forexMarkup}%</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold text-amber-400">{card.welcomeBonus}</p>
                        <p className="text-xs text-slate-400">{card.welcomeBonusDetails}</p>
                      </td>
                      <td className="px-5 py-4">
                        <a
                          href={card.sourceDocumentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-amber-400 hover:underline"
                        >
                          Issuer Doc <ExternalLink className="h-3 w-3" />
                        </a>
                        <p className="mt-0.5 text-[10px] text-slate-400">Verified {card.lastSourceChecked}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* STEP 1: STICKY COMPARE TRAY */}
        {selectedForCompare.length > 0 && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 animate-slide-up">
            <div className="rounded-2xl border border-amber-500/40 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="text-xs font-bold text-amber-400 shrink-0">Compare Tray:</span>
                {selectedCardsData.map((c) => (
                  <span
                    key={c.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-white shrink-0"
                  >
                    {c.name}
                    <button onClick={() => toggleSelectCard(c.id)} className="text-slate-400 hover:text-red-400">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="h-4 w-4" /> Compare Now ({selectedForCompare.length}/3)
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 & STEP 3: SIDE-BY-SIDE MODAL WITH DYNAMIC WINNER HIGHLIGHTING */}
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md overflow-y-auto">
            <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                    3-Step Decision Engine Flow
                  </span>
                  <h3 className="text-lg font-black text-white mt-1">Side-by-Side Card Comparison Matrix</h3>
                </div>
                <button
                  onClick={() => setIsCompareModalOpen(false)}
                  className="rounded-xl p-2 bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* 5-ROW VERTICAL SIDE-BY-SIDE GRID */}
              <div className="mt-6 space-y-4 text-xs sm:text-sm">
                {/* ROW 1: CARD ART & NAME */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 border-b border-slate-800 pb-4 items-center">
                  <div className="font-bold text-slate-400 uppercase text-xs">Row 1: Card Name & Issuer</div>
                  {selectedCardsData.map((c) => (
                    <div key={c.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <p className="font-extrabold text-white text-base">{c.name}</p>
                      <span className="text-amber-400 font-bold text-xs block">{c.issuer}</span>
                      <span className="text-[10px] text-emerald-400 block">Verified / Updated: Aug 2025</span>
                    </div>
                  ))}
                </div>

                {/* ROW 2: ANNUAL FEE & WAIVER CRITERIA (LOWEST FEE / BEST WAIVER WINNER HIGHLIGHT) */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 border-b border-slate-800 pb-4 items-center">
                  <div className="font-bold text-slate-400 uppercase text-xs">Row 2: Annual Fee & Waiver Criteria</div>
                  {selectedCardsData.map((c) => {
                    const isWinner = c.annualFee === minFee;
                    return (
                      <div
                        key={c.id}
                        className={`p-3 rounded-xl border space-y-1 transition-all ${
                          isWinner
                            ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-md"
                            : "bg-slate-950 border-slate-800 text-slate-300"
                        }`}
                      >
                        {isWinner && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-400 uppercase mb-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Best Fee / Waiver
                          </span>
                        )}
                        <p className="font-extrabold text-white text-sm">
                          {c.annualFee === 0 ? "₹0 (Lifetime Free)" : formatCurrency(c.annualFee)}
                        </p>
                        <p className="text-[11px] text-slate-300">
                          {c.feeWaiverThresholdINR > 0
                            ? `Waived on ${formatCurrency(c.feeWaiverThresholdINR)} spend`
                            : "No annual fee waiver threshold"}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* ROW 3: REWARD MULTIPLIERS (HIGHEST TRAVEL WINNER HIGHLIGHT) */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 border-b border-slate-800 pb-4 items-center">
                  <div className="font-bold text-slate-400 uppercase text-xs">Row 3: Multipliers & Category Earn Rates</div>
                  {selectedCardsData.map((c) => {
                    const travelMult = c.rewardCategories.travel ?? 0;
                    const isWinner = travelMult === maxTravelMult && travelMult > 0;
                    return (
                      <div
                        key={c.id}
                        className={`p-3 rounded-xl border space-y-1 transition-all ${
                          isWinner
                            ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-md"
                            : "bg-slate-950 border-slate-800 text-slate-300"
                        }`}
                      >
                        {isWinner && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-400 uppercase mb-1">
                            <Award className="h-3.5 w-3.5" /> Top Travel Rate
                          </span>
                        )}
                        <p className="font-bold text-white text-xs">✈️ Travel: <strong className="text-amber-400 font-black">{travelMult}x Return</strong></p>
                        <p className="text-[11px]">🍽️ Dining: <strong>{c.rewardCategories.dining ?? 1}x</strong></p>
                        <p className="text-[11px]">🛒 Groceries: <strong>{c.rewardCategories.groceries ?? 1}x</strong></p>
                      </div>
                    );
                  })}
                </div>

                {/* ROW 4: LOUNGE ACCESS (BEST LOUNGE ACCESS WINNER HIGHLIGHT) */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 border-b border-slate-800 pb-4 items-center">
                  <div className="font-bold text-slate-400 uppercase text-xs">Row 4: Domestic vs. International Lounge Access</div>
                  {selectedCardsData.map((c) => {
                    const isWinner = c.loungeAccessSummary.toLowerCase().includes("unlimited");
                    return (
                      <div
                        key={c.id}
                        className={`p-3 rounded-xl border space-y-1 transition-all ${
                          isWinner
                            ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-md"
                            : "bg-slate-950 border-slate-800 text-slate-300"
                        }`}
                      >
                        {isWinner && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-400 uppercase mb-1">
                            <ShieldCheck className="h-3.5 w-3.5" /> Unlimited Lounge Access
                          </span>
                        )}
                        <p className="font-bold text-white text-xs leading-relaxed">{c.loungeAccessSummary}</p>
                      </div>
                    );
                  })}
                </div>

                {/* ROW 5: BEST TRANSFER PARTNERS & POINT VALUATION (HIGHEST VALUATION WINNER HIGHLIGHT) */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                  <div className="font-bold text-slate-400 uppercase text-xs">Row 5: Transfer Partners & Point Value (₹/pt)</div>
                  {selectedCardsData.map((c) => {
                    const val = c.pointValueINR ?? 1;
                    const isWinner = val === maxPointValue;
                    return (
                      <div
                        key={c.id}
                        className={`p-3 rounded-xl border space-y-1 transition-all ${
                          isWinner
                            ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-md"
                            : "bg-slate-950 border-slate-800 text-slate-300"
                        }`}
                      >
                        {isWinner && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-400 uppercase mb-1">
                            <Award className="h-3.5 w-3.5" /> Top Point Yield
                          </span>
                        )}
                        <p className="font-extrabold text-amber-400 text-sm">₹{val.toFixed(2)} / point value</p>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          Partners: {c.transferPartners.join(", ") || "Direct Cashback"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
