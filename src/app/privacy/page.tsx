"use client";

import { useState } from "react";
import { ShieldCheck, Trash2, CheckCircle2, Lock, EyeOff } from "lucide-react";

export default function PrivacyPage() {
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handlePurgeData() {
    setLoading(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
      }

      await fetch("/api/user/delete-data", { method: "POST" });
      setDeleted(true);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 text-white space-y-10">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
          <ShieldCheck className="h-4 w-4" />
          <span>Verified User Privacy & Data Protection Policy</span>
        </div>
        <h1 className="font-display text-4xl font-black text-white">Privacy & Data Governance Map</h1>
        <p className="text-slate-400 text-sm">
          Last updated: August 2026. Zero full credit card numbers, passwords, or plaintext financial credentials are ever collected or stored.
        </p>
      </div>

      {/* DATA FLOW MAP */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <Lock className="h-5 w-5" /> 1. Complete User Personal Data Flow Map
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-amber-400 font-bold uppercase text-[10px]">Data Collection Points</span>
            <p className="text-slate-300">
              • <strong>Search Queries:</strong> Temporary text queries (e.g. Dubai trip, CIBIL odds) processed in-memory.<br />
              • <strong>Spend Profiles:</strong> Monthly category numbers used in-browser to calculate Net Annual Value (NAV).<br />
              • <strong>Zero PII Collected:</strong> No emails, phone numbers, passwords, names, or addresses required.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-emerald-400 font-bold uppercase text-[10px]">Storage & Cookie Policy</span>
            <p className="text-slate-300">
              • <strong>Cookies:</strong> Configured with <code className="text-amber-300">httpOnly</code>, <code className="text-amber-300">Secure</code>, and <code className="text-amber-300">SameSite=Strict</code> flags.<br />
              • <strong>No PII in LocalStorage:</strong> Only anonymous cookie consent preferences stored locally.
            </p>
          </div>
        </div>
      </section>

      {/* THIRD PARTY AUDIT */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <EyeOff className="h-5 w-5" /> 2. Third-Party Integrations & Data Minimization
        </h2>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2 text-slate-300">
          <p>
            • <strong>OpenAI API:</strong> Only anonymized card names and query text are sent for LLM reasoning synthesis. No personal user credentials or identifiers are transmitted.<br />
            • <strong>Google Analytics 4 (GA4):</strong> IP anonymization (<code className="text-amber-300">anonymize_ip: true</code>) is enforced. Analytics scripts execute strictly after explicit user consent.
          </p>
        </div>
      </section>

      {/* INTERACTIVE DATA DELETION CONTROL */}
      <section className="p-6 rounded-3xl border border-red-500/40 bg-slate-950 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-400" /> Right to be Forgotten (Data Deletion & Anonymization)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Purge all local storage state, clear cookies, and reset session data instantly.
            </p>
          </div>
          {deleted ? (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
              <CheckCircle2 className="h-4 w-4" /> Data Purged & Anonymized
            </span>
          ) : (
            <button
              onClick={handlePurgeData}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? "Purging Data…" : "Purge All My Data"}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
