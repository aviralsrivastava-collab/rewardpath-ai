"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Layers, Search, CheckSquare, Square, X, Award, CheckCircle2, ShieldCheck, Sparkles, ArrowRightLeft } from "lucide-react";
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCompareModalOpen(false);
      }
    };
    if (isCompareModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isCompareModalOpen]);

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

  const colGridClass =
    selectedCardsData.length === 1
      ? "grid-cols-[140px_1fr]"
      : selectedCardsData.length === 2
      ? "grid-cols-[140px_1fr_1fr]"
      : "grid-cols-[140px_1fr_1fr_1fr]";

  return (
    <section id="compare" className="relative px-3.5 py-16 sm:px-6 sm:py-20 bg-slate-900 text-white border-t border-slate-800">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
            <Layers className="h-3.5 w-3.5" />
            <span>Structured Relational Fact Store</span>
          </div>
          <h2 className="font-display text-2xl font-black text-white sm:text-4xl">
            Dynamic Card Comparison Decision Engine
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Search, filter, or select up to 3 cards for an active side-by-side comparison with dynamic metric winner highlighting.
          </p>
        </div>

        {/* Search & Filter Bar: Responsive across Laptop & Mobile */}
        <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cards by name or issuer..."
              className="w-full rounded-xl bg-slate-900 border border-slate-800 py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Issuer Filters with smooth mobile horizontal scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {issuers.map((iss) => (
              <button
                key={iss}
                onClick={() => setSelectedIssuer(iss)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all shrink-0 cursor-pointer ${
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
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-extrabold shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <Sparkles className="h-4 w-4" /> Compare Now ({selectedForCompare.length}/3)
            </button>
          )}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden text-center text-[11px] text-slate-400 pb-2 flex items-center justify-center gap-1.5">
          <ArrowRightLeft className="h-3 w-3 text-amber-400" />
          <span>Swipe table horizontally to view all card parameters</span>
        </div>

        {loading ? (
          <div className="mt-10 text-center text-xs text-slate-400 py-12">
            Fetching verified card database…
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
            <table className="w-full min-w-[650px] text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900 text-slate-300">
                  <th className="px-4 sm:px-5 py-3.5 sm:py-4 font-bold">Select</th>
                  <th className="px-4 sm:px-5 py-3.5 sm:py-4 font-bold">Card & Issuer</th>
                  <th className="px-4 sm:px-5 py-3.5 sm:py-4 font-bold">Annual Fee & Waiver</th>
                  <th className="px-4 sm:px-5 py-3.5 sm:py-4 font-bold">Forex Markup</th>
                  <th className="px-4 sm:px-5 py-3.5 sm:py-4 font-bold">Welcome Bonus</th>
                  <th className="px-4 sm:px-5 py-3.5 sm:py-4 font-bold">Cited Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredCards.map((card) => {
                  const isSelected = selectedForCompare.includes(card.id);
                  return (
                    <tr key={card.id} className="transition-colors hover:bg-slate-900/60">
                      <td className="px-4 sm:px-5 py-3 sm:py-4">
                        <button
                          onClick={() => toggleSelectCard(card.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                        >
                          {isSelected ? (
                            <CheckSquare className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-amber-400 shrink-0" />
                          ) : (
                            <Square className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-slate-600 shrink-0" />
                          )}
                          <span className="whitespace-nowrap">{isSelected ? "Selected" : "+ Compare"}</span>
                        </button>
                      </td>
                      <td className="px-4 sm:px-5 py-3 sm:py-4">
                        <p className="font-bold text-white text-sm sm:text-base">{card.name}</p>
                        <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                          <span className="text-[11px] font-semibold text-amber-400">{card.issuer}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-extrabold text-emerald-300">
                            Verified Aug 2025
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-5 py-3 sm:py-4 font-bold">
                        {card.annualFee === 0 ? (
                          <span className="text-emerald-400 font-extrabold block">₹0 (No Fee)</span>
                        ) : (
                          <span className="text-slate-200 block">{formatCurrency(card.annualFee)}</span>
                        )}
                        {card.feeWaiverThresholdINR > 0 && (
                          <span className="text-[10px] text-slate-400 block font-normal">
                            Waived on {formatCurrency(card.feeWaiverThresholdINR)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 sm:px-5 py-3 sm:py-4 font-bold">
                        {card.forexMarkup === 0 ? (
                          <span className="text-emerald-400 font-bold">0% (No Forex)</span>
                        ) : (
                          <span className="text-slate-400">{card.forexMarkup}%</span>
                        )}
                      </td>
                      <td className="px-4 sm:px-5 py-3 sm:py-4">
                        <p className="font-bold text-amber-400">{card.welcomeBonus}</p>
                        <p className="text-[11px] text-slate-400">{card.welcomeBonusDetails}</p>
                      </td>
                      <td className="px-4 sm:px-5 py-3 sm:py-4">
                        <a
                          href={card.sourceDocumentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-amber-400 hover:underline text-xs"
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

        {/* STEP 1: STICKY COMPARE TRAY (Responsive & Non-blocking) */}
        {selectedForCompare.length > 0 && (
          <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] sm:w-full max-w-2xl px-2 sm:px-4 animate-slide-up">
            <div className="rounded-2xl border border-amber-500/40 bg-slate-950/95 p-3 sm:p-4 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar min-w-0">
                <span className="text-[11px] sm:text-xs font-bold text-amber-400 shrink-0 hidden xs:inline">Compare:</span>
                {selectedCardsData.map((c) => (
                  <span
                    key={c.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] sm:text-xs font-bold text-white shrink-0 max-w-[140px] sm:max-w-none truncate"
                  >
                    <span className="truncate">{c.name}</span>
                    <button onClick={() => toggleSelectCard(c.id)} className="text-slate-400 hover:text-red-400 shrink-0">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all shrink-0 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles className="h-3.5 w-3.5" /> Compare ({selectedForCompare.length}/3)
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 & STEP 3: SIDE-BY-SIDE MODAL WITH DYNAMIC WINNER HIGHLIGHTING */}
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-2.5 sm:p-4 backdrop-blur-md overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="comparison-modal-title">
            <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-900 p-4 sm:p-6 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                    3-Step Decision Engine Flow
                  </span>
                  <h3 id="comparison-modal-title" className="text-base sm:text-lg font-black text-white mt-1">Side-by-Side Card Comparison Matrix</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCompareModalOpen(false)}
                  aria-label="Close comparison modal"
                  className="rounded-xl p-2 bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* HORIZONTALLY SCROLLABLE MATRIX ON MOBILE / ADAPTIVE GRID ON LAPTOP */}
              <div className="mt-4 sm:mt-6 overflow-x-auto">
                <div className={`min-w-[550px] space-y-4 text-xs sm:text-sm`}>
                  {/* ROW 1: CARD ART & NAME */}
                  <div className={`grid ${colGridClass} gap-3 border-b border-slate-800 pb-4 items-center`}>
                    <div className="font-bold text-slate-400 uppercase text-[11px] sm:text-xs">Card & Issuer</div>
                    {selectedCardsData.map((c) => (
                      <div key={c.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <p className="font-extrabold text-white text-sm sm:text-base leading-snug">{c.name}</p>
                        <span className="text-amber-400 font-bold text-xs block">{c.issuer}</span>
                        <span className="text-[10px] text-emerald-400 block">Verified Aug 2025</span>
                      </div>
                    ))}
                  </div>

                  {/* ROW 2: ANNUAL FEE & WAIVER CRITERIA */}
                  <div className={`grid ${colGridClass} gap-3 border-b border-slate-800 pb-4 items-center`}>
                    <div className="font-bold text-slate-400 uppercase text-[11px] sm:text-xs">Annual Fee & Waiver</div>
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
                          <p className="font-extrabold text-white text-xs sm:text-sm">
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

                  {/* ROW 3: REWARD MULTIPLIERS */}
                  <div className={`grid ${colGridClass} gap-3 border-b border-slate-800 pb-4 items-center`}>
                    <div className="font-bold text-slate-400 uppercase text-[11px] sm:text-xs">Category Multipliers</div>
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

                  {/* ROW 4: LOUNGE ACCESS */}
                  <div className={`grid ${colGridClass} gap-3 border-b border-slate-800 pb-4 items-center`}>
                    <div className="font-bold text-slate-400 uppercase text-[11px] sm:text-xs">Lounge Access</div>
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
                              <ShieldCheck className="h-3.5 w-3.5" /> Unlimited Access
                            </span>
                          )}
                          <p className="font-bold text-white text-xs leading-relaxed">{c.loungeAccessSummary}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* ROW 5: BEST TRANSFER PARTNERS & POINT VALUATION */}
                  <div className={`grid ${colGridClass} gap-3 items-center`}>
                    <div className="font-bold text-slate-400 uppercase text-[11px] sm:text-xs">Transfer & Point Yield</div>
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
                          <p className="font-extrabold text-amber-400 text-xs sm:text-sm">₹{val.toFixed(2)} / point value</p>
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
          </div>
        )}
      </div>
    </section>
  );
}
