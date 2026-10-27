"use client";

import { useState, useEffect } from "react";
import { setAnalyticsConsent } from "@/lib/analytics";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("analytics-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleChoice(granted: boolean) {
    setAnalyticsConsent(granted);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie and privacy consent"
      className="fixed inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-4 z-50 mx-auto max-w-lg rounded-2xl border border-slate-800 bg-slate-900/98 p-4 sm:p-5 shadow-2xl backdrop-blur-xl animate-slide-up"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
          <span className="text-base">🍪</span>
        </div>
        <div className="flex-1">
          <h4 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-amber-400">Cookie & Privacy Notice</h4>
          <p className="mt-1 text-xs leading-relaxed text-slate-300">
            We use cookies and IP-anonymized analytics to improve RewardPath AI. Zero 16-digit card numbers, CVVs, or financial credentials are ever requested or stored.{" "}
            <a href="/privacy" className="text-amber-400 underline font-semibold hover:text-amber-300">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
      <div className="mt-3 sm:mt-4 flex flex-col xs:flex-row gap-2">
        <button
          type="button"
          onClick={() => handleChoice(true)}
          className="flex-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:from-amber-400 hover:to-amber-500 active:scale-98 transition-all cursor-pointer text-center"
        >
          Accept Analytics
        </button>
        <button
          type="button"
          onClick={() => handleChoice(false)}
          className="flex-1 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white active:scale-98 transition-all cursor-pointer text-center"
        >
          Decline (Essential Only)
        </button>
      </div>
    </div>
  );
}
