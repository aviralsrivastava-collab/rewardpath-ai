"use client";

import { useState } from "react";
import { Plane, Bell, RefreshCw, Trophy, CheckCircle2, Flame } from "lucide-react";

export function AwardAlertsAndCaching() {
  const [activeSubTab, setActiveSubTab] = useState<"cache" | "alerts" | "tracker" | "feed">("cache");
  const [newRoute, setNewRoute] = useState("JFK -> CDG");
  const [alertSuccess, setAlertSuccess] = useState(false);

  const cachedSeats = [
    { id: "c1", route: "JFK -> CDG (Paris)", airline: "Air France", program: "Flying Blue", points: 50000, cabin: "Business", seats: 2, ttlMins: 4 },
    { id: "c2", route: "LAX -> HND (Tokyo)", airline: "ANA", program: "Virgin Atlantic", points: 45000, cabin: "Business", seats: 1, ttlMins: 2 },
    { id: "c3", route: "ORD -> LHR (London)", airline: "British Airways", program: "Avios", points: 47500, cabin: "Business", seats: 4, ttlMins: 11 },
    { id: "c4", route: "SFO -> HNL (Hawaii)", airline: "United", program: "Turkish Miles", points: 15000, cabin: "Economy", seats: 6, ttlMins: 1 },
  ];

  const communityFeed = [
    { user: "@traveler_alex", trip: "JFK -> CDG Business", program: "Flying Blue", points: 50000, cashSaved: 3620, cpp: 7.24 },
    { user: "@points_ninja", trip: "SFO -> HND First Class", program: "Virgin Atlantic", points: 55000, cashSaved: 8400, cpp: 15.2 },
    { user: "@globetrotter_m", trip: "MIA -> CUN Economy", program: "Southwest", points: 8200, cashSaved: 280, cpp: 3.41 },
  ];

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertSuccess(true);
    setTimeout(() => setAlertSuccess(false), 4000);
  };

  return (
    <section id="award-caching" className="py-16 px-3.5 sm:px-6 sm:py-20 bg-slate-950 text-white border-t border-slate-800">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400 mb-2">
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Phase 3 — Scale & Trust Infrastructure</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black text-white">
            Award Caching & Realized Value Engine
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Live award-flight seat availability caching layer (Seat.aero / AwardTool TTL simulation), route alerts, and post-booking realized value tracker.
          </p>
        </div>

        {/* Navigation with smooth touch scroll */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center mb-6 sm:mb-8 border-b border-slate-800 pb-2 sm:pb-3">
          {[
            { id: "cache", label: "Seat.aero Live Cache", icon: RefreshCw },
            { id: "alerts", label: "Route Award Alerts", icon: Bell },
            { id: "tracker", label: "Trip Tracker (Saved $)", icon: Plane },
            { id: "feed", label: "Community Leaderboard", icon: Trophy },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeSubTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveSubTab(t.id as typeof activeSubTab)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold border transition-all shrink-0 cursor-pointer ${
                  active
                    ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                }`}
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: LIVE CACHE */}
        {activeSubTab === "cache" && (
          <div className="space-y-4">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 gap-1.5">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Cache Status: Active (API Gateway — TTL 15 mins)</span>
              </span>
              <span>Updated &lt;5 mins ago</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cachedSeats.map((seat) => (
                <div key={seat.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-cyan-400">{seat.airline}</span>
                      <h4 className="font-bold text-white text-sm sm:text-base">{seat.route}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-black shrink-0">
                      {seat.seats} Seat(s) Available
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs border-t border-slate-800 pt-3">
                    <span className="text-slate-400">Cabin: <strong className="text-white">{seat.cabin}</strong></span>
                    <span className="text-amber-400 font-extrabold">{seat.points.toLocaleString()} {seat.program} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ROUTE ALERTS */}
        {activeSubTab === "alerts" && (
          <div className="max-w-xl mx-auto rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6 space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Bell className="h-4 w-4 text-cyan-400 shrink-0" /> Create Route Award Alert
            </h3>
            <form onSubmit={handleCreateAlert} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Target Route</label>
                <input
                  type="text"
                  value={newRoute}
                  onChange={(e) => setNewRoute(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 sm:px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
                  placeholder="e.g. JFK -> CDG Business Class"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-950 font-bold text-xs hover:from-cyan-400 hover:to-cyan-500 active:scale-98 transition-all cursor-pointer"
              >
                Set Real-Time Alert
              </button>
            </form>

            {alertSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Alert activated! We will notify you when award space opens under 60k points.</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TRACKER */}
        {activeSubTab === "tracker" && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6 text-center space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white">Post-Booking Realized Value Tracker</h3>
            <div className="inline-block p-4 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 max-w-sm w-full">
              <span className="text-xs uppercase font-bold text-slate-400">Total Lifetime Savings Realized</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">$4,850.00</div>
              <p className="text-xs text-slate-300 mt-1">Across 3 booked flight awards vs cash fares</p>
            </div>
          </div>
        )}

        {/* TAB 4: LEADERBOARD */}
        {activeSubTab === "feed" && (
          <div className="space-y-3">
            {communityFeed.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900 p-3.5 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5 sm:gap-3 text-xs">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs shrink-0">
                    <Flame className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-xs sm:text-sm">{item.user}</span>
                    <p className="text-slate-300 text-[11px] sm:text-xs">{item.trip} via {item.program}</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-emerald-400 font-black text-xs sm:text-sm">Saved ${item.cashSaved}</span>
                  <p className="text-amber-400 font-bold text-[10px] sm:text-[11px]">{item.cpp}¢ / pt ({item.points.toLocaleString()} pts)</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
