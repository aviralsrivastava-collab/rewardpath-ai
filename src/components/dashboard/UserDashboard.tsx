"use client";

import { useState } from "react";
import {
  Wallet,
  Calendar,
  Award,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState<"balances" | "milestones" | "fees" | "churning">("balances");

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
    <section id="dashboard" className="py-16 px-4 sm:px-6 bg-slate-900 text-white border-t border-slate-800">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
              <Wallet className="h-3.5 w-3.5" />
              <span>Phase 2 — Portfolio & Retention Hub (India)</span>
            </div>
            <h2 className="font-display text-3xl font-black text-white">
              Indian Rewards Portfolio & Milestone Tracker
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Estimated Value</span>
              <p className="text-xl font-black text-emerald-400">{formatCurrency(portfolio.totalValueINR)}</p>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Points</span>
              <p className="text-xl font-black text-amber-400">{portfolio.totalPoints.toLocaleString()} pts</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 mb-6">
          {[
            { id: "balances", label: "Points Balances & Expiry", icon: Wallet },
            { id: "milestones", label: "Annual Spend Milestones", icon: Award },
            { id: "fees", label: "Annual Fee & Waiver Calendar", icon: Calendar },
            { id: "churning", label: "Indian Bank Rules (HDFC/Axis)", icon: RefreshCw },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  active
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-950 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon className="h-4 w-4" />
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
                  className={`rounded-2xl border p-5 bg-slate-950/80 ${
                    b.warning ? "border-amber-500/50" : "border-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white text-base">{b.program}</h4>
                      <p className="text-2xl font-black text-amber-400 mt-1">{b.points.toLocaleString()} pts</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                      ≈ {formatCurrency(b.valINR)}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs border-t border-slate-800/80 pt-3">
                    <span className="text-slate-400">Expiration Status:</span>
                    <span className={b.warning ? "text-amber-400 font-bold flex items-center gap-1" : "text-slate-300"}>
                      {b.warning && <AlertTriangle className="h-3.5 w-3.5" />}
                      {b.expiry}
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
                <div key={m.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-amber-400">Annual Milestone Progress</span>
                      <h4 className="font-bold text-white text-lg">{m.cardName}</h4>
                    </div>
                    <div className="text-right">
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

        {/* TAB 3: FEES */}
        {activeTab === "fees" && (
          <div className="space-y-4">
            {portfolio.upcomingFees.map((fee, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-base">{fee.cardName}</h4>
                    <span className="text-xs font-bold text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-800">
                      Fee: {formatCurrency(fee.fee)} + GST
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Renewal Date: {fee.dueDate}</p>
                  <p className="text-xs text-amber-300 mt-2 font-medium">💡 Waiver Rule: {fee.recommendation}</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white hover:bg-slate-800 shrink-0">
                  Set Renewal Alert
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: CHURNING */}
        {activeTab === "churning" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <span className="text-[10px] uppercase font-bold text-amber-400">HDFC 6-Month Cooling Rule</span>
              <div className="text-xl font-bold text-white mt-1">{portfolio.churning.hdfcCooloff.resetDate}</div>
              <p className="text-xs text-slate-300 mt-2">HDFC Bank enforces a 6-month gap between fresh card applications to avoid internal rejections.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <span className="text-[10px] uppercase font-bold text-cyan-400">Axis Bank 3-Card Limit</span>
              <div className="text-xl font-bold text-white mt-1">{portfolio.churning.axisHoldingLimit.status}</div>
              <p className="text-xs text-slate-400 mt-2">Axis Bank limits individuals to holding a maximum of 3 active credit cards.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
