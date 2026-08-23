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
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-lg rounded-2xl border border-surface-border bg-white p-5 shadow-card-hover sm:inset-x-6"
    >
      <p className="text-sm leading-relaxed text-slate-700">
        We use cookies and analytics (Google Analytics) to understand how you
        use RewardPath. No credit card numbers are ever stored.{" "}
        <a href="/privacy" className="text-brand-600 underline">
          Privacy Policy
        </a>
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => handleChoice(true)}
          className="flex-1 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => handleChoice(false)}
          className="flex-1 rounded-full border border-surface-border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
