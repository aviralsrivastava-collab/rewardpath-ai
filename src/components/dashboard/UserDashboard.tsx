"use client";

import { useState } from "react";
import {
  Wallet,
  Calendar,
  Award,
  AlertTriangle,
  RefreshCw,
  Bell,
  BellRing,
  CheckCircle2,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState<"balances" | "milestones" | "fees" | "churning">("balances");
  const [alertedCards, setAlertedCards] = useState<Record<string, boolean>>({
    "HDFC Infinia Metal Edition": true,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleRenewalAlert = (cardName: string) => {
    setAlertedCards((prev) => {
      const isCurrentlyActive = !!prev[cardName];
      const next = { ...prev, [cardName]: !isCurrentlyActive };
      setToastMessage(
        !isCurrentlyActive
          ? `Renewal reminder active for ${cardName}. We'll notify you 30 days before due date.`
          : `Renewal reminder cancelled for ${cardName}.`
      );
      setTimeout(() => setToastMessage(null), 3500);
      return next;
    });
  };

  const portfolio = {
    totalValueINR: 285000,
    totalPoints: 195000,
    balances: [
      { program: "HDFC Infinia Reward Points", points: 85000, valINR: 85000, expiry: "Expires in 3 years from credit" },
      { program: "Axis EDGE Miles", points: 45000, valINR: 90000, expiry: "Expires in 3 years (1:2 transfer ratio)" },
      { program: "Amex Membership Rewards", points: 50000, valINR: 50000, expiry: "Never Expires" },
      { program: "Air India Maharaja Club", points: 15000, valINR: 15000, expiry: "Expires in 36 months (Action needed!)", warning: true },
    ],
    milestones: [
      {
        id: "m1",
        cardName: "Amex Platinum Travel",
        spendGoal: 400000,
        currentSpend: 285000,
        deadline: "Nov 30, 2026",
        daysRemaining: 120,
        bonusPoints: 40000,
      },
      {
        id: "m2",
        cardName: "Axis Bank Atlas",
        spendGoal: 750000,
        currentSpend: 750000,
        deadline: "Completed",
        daysRemaining: 0,
        bonusPoints: 10000,
        completed: true,
      },
    ],
    upcomingFees: [
      {
        cardName: "HDFC Infinia Metal Edition",
        fee: 12500,
        dueDate: "Sept 15, 2026",
        recommendation: "Fee waived on reaching ₹10 Lakhs annual spend.",
      },
      {
        cardName: "Axis Bank Atlas",
        fee: 5000,
        dueDate: "Oct 20, 2026",
        recommendation: "Retain — annual 5,000 EDGE Miles bonus offsets ₹5,000 fee completely.",
      },
    ],
    churning: {
      hdfcCooloff: { count: 1, resetDate: "Eligible now (6-month rule passed)" },
      axisHoldingLimit: { activeCards: 2, limit: 3, status: "1 slot remaining" },
    },
  };

  return (
    <section id="dashboard" className="py-16 px-3.5 sm:px-6 sm:py-20 bg-slate-900 text-white border-t border-slate-800">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
              <Wallet className="h-3.5 w-3.5" />
              <span>Phase 2 — Portfolio & Retention Hub (India)</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
              Indian Rewards Portfolio & Milestone Tracker
            </h2>
          </div>

          <div className="flex items-center justify-around w-full sm:w-auto gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Estimated Value</span>
              <p className="text-lg sm:text-xl font-black text-emerald-400">{formatCurrency(portfolio.totalValueINR)}</p>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Points</span>
              <p className="text-lg sm:text-xl font-black text-amber-400">{portfolio.totalPoints.toLocaleString()} pts</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation with smooth mobile horizontal scroll */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-800 pb-2 sm:pb-3 mb-6">
          {[
            { id: "balances", label: "Points Balances", icon: Wallet },
            { id: "milestones", label: "Spend Milestones", icon: Award },
            { id: "fees", label: "Fee & Waiver Calendar", icon: Calendar },
            { id: "churning", label: "Bank Rules (HDFC/Axis)", icon: RefreshCw },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  active
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-950 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: BALANCES */}
        {activeTab === "balances" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.balances.map((b, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border p-4 sm:p-5 bg-slate-950/80 ${
                    b.warning ? "border-amber-500/50" : "border-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base">{b.program}</h4>
                      <p className="text-xl sm:text-2xl font-black text-amber-400 mt-1">{b.points.toLocaleString()} pts</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800 shrink-0">
                      ≈ {formatCurrency(b.valINR)}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col xs:flex-row xs:items-center justify-between text-xs border-t border-slate-800/80 pt-3 gap-1">
                    <span className="text-slate-400">Expiration Status:</span>
                    <span className={b.warning ? "text-amber-400 font-bold flex items-center gap-1" : "text-slate-300"}>
                      {b.warning && <AlertTriangle className="h-3.5 w-3.5 shrink-0" />}
                      <span>{b.expiry}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: MILESTONES */}
        {activeTab === "milestones" && (
          <div className="space-y-4">
            {portfolio.milestones.map((m) => {
              const pct = Math.min(100, Math.round((m.currentSpend / m.spendGoal) * 100));
              return (
                <div key={m.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-amber-400">Annual Milestone Progress</span>
                      <h4 className="font-bold text-white text-base sm:text-lg">{m.cardName}</h4>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-xs font-black text-amber-400">+{m.bonusPoints.toLocaleString()} Reward Bonus</span>
                      <p className="text-xs text-slate-400">{m.completed ? "Milestone Reached!" : `${m.daysRemaining} days remaining`}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">{formatCurrency(m.currentSpend)} spent</span>
                      <span className="text-slate-400">{formatCurrency(m.spendGoal)} target ({pct}%)</span>
                    </div>
                    <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          m.completed ? "bg-emerald-500" : "bg-gradient-to-r from-amber-500 to-amber-400"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TOAST FEEDBACK NOTIFICATION */}
        {toastMessage && (
          <div className="mb-6 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 p-3 sm:p-4 text-xs font-bold text-emerald-300 flex items-center gap-2.5 shadow-xl animate-fade-in" role="status">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* TAB 3: FEES */}
        {activeTab === "fees" && (
          <div className="space-y-4" role="tabpanel" aria-label="Annual Fee and Waiver Calendar">
            {portfolio.upcomingFees.map((fee, idx) => {
              const isAlertActive = !!alertedCards[fee.cardName];
              return (
                <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-white text-sm sm:text-base">{fee.cardName}</h4>
                      <span className="text-xs font-bold text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-800">
                        Fee: {formatCurrency(fee.fee)} + GST
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Renewal Date: {fee.dueDate}</p>
                    <p className="text-xs text-amber-300 mt-1.5 font-medium">💡 Waiver Rule: {fee.recommendation}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleRenewalAlert(fee.cardName)}
                    className={`flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 rounded-xl border text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      isAlertActive
                        ? "bg-emerald-950 text-emerald-300 border-emerald-700 hover:bg-emerald-900"
                        : "bg-slate-900 border-slate-700 text-white hover:bg-slate-800"
                    }`}
                  >
                    {isAlertActive ? (
                      <>
                        <BellRing className="h-4 w-4 text-emerald-400" />
                        <span>Alert Active (30-day notice)</span>
                      </>
                    ) : (
                      <>
                        <Bell className="h-4 w-4 text-slate-400" />
                        <span>Set Renewal Alert</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: CHURNING */}
        {activeTab === "churning" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5">
              <span className="text-[10px] uppercase font-bold text-amber-400">HDFC 6-Month Cooling Rule</span>
              <div className="text-lg sm:text-xl font-bold text-white mt-1">{portfolio.churning.hdfcCooloff.resetDate}</div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">HDFC Bank enforces a 6-month gap between fresh card applications to avoid internal rejections.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5">
              <span className="text-[10px] uppercase font-bold text-cyan-400">Axis Bank 3-Card Limit</span>
              <div className="text-lg sm:text-xl font-bold text-white mt-1">{portfolio.churning.axisHoldingLimit.status}</div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">Axis Bank limits individuals to holding a maximum of 3 active credit cards.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
