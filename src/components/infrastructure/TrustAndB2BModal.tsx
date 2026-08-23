"use client";

import { useState } from "react";
import { Shield, Code2, Copy, Check } from "lucide-react";

export function TrustAndB2BModal() {
  const [showTrustModal, setShowTrustModal] = useState(false);
  const [showB2BModal, setShowB2BModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const embedCodeSnippet = `<script src="https://cdn.rewardpath.ai/v1/widget.js" data-mode="roi-calculator" data-theme="dark"></script>`;

  const copySnippet = () => {
    navigator.clipboard.writeText(embedCodeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="bg-slate-950 py-12 px-4 border-t border-slate-800 text-center text-white">
      <div className="mx-auto max-w-4xl flex flex-wrap justify-center items-center gap-4">
        <button
          onClick={() => setShowTrustModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-bold text-slate-300 hover:border-emerald-500/40 hover:text-emerald-400 transition-all"
        >
          <Shield className="h-4 w-4 text-emerald-400" />
          <span>SOC 2 & Trust Infrastructure Center</span>
        </button>

        <button
          onClick={() => setShowB2BModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-bold text-slate-300 hover:border-amber-500/40 hover:text-amber-400 transition-all"
        >
          <Code2 className="h-4 w-4 text-amber-400" />
          <span>B2B White-Label Widget Generator</span>
        </button>
      </div>

      {/* SOC 2 MODAL */}
      {showTrustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="max-w-lg w-full rounded-2xl bg-slate-900 border border-slate-800 p-6 text-left space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" /> SOC 2 & Security Compliance Center
              </h3>
              <button onClick={() => setShowTrustModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="font-bold text-emerald-400">Zero Full Credit Card Number Storage</h4>
                <p className="mt-1">We enforce strict database schema validation ensuring full 16-digit card numbers, PINs, and CVVs are NEVER captured or saved. Only public card metadata/issuers are tracked.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="font-bold text-emerald-400">Formal Data Retention & Deletion Program</h4>
                <p className="mt-1">Users can initiate complete one-click account deletion and data wiping in compliance with SOC 2 Type II and GDPR standards.</p>
              </div>
            </div>

            <button
              onClick={() => setShowTrustModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400"
            >
              Close Trust Center
            </button>
          </div>
        </div>
      )}

      {/* B2B MODAL */}
      {showB2BModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="max-w-lg w-full rounded-2xl bg-slate-900 border border-slate-800 p-6 text-left space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Code2 className="h-5 w-5 text-amber-400" /> White-Label Widget Embed Generator
              </h3>
              <button onClick={() => setShowB2BModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-slate-300">
              Embed our ROI Calculator & Wallet Optimizer onto your financial blog or advisory platform with full custom white-label branding.
            </p>

            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono text-[11px] text-amber-300">
              <code>{embedCodeSnippet}</code>
              <button
                onClick={copySnippet}
                className="absolute right-2 top-2 p-1.5 rounded bg-slate-800 text-slate-200 hover:text-white"
              >
                {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>

            <button
              onClick={() => setShowB2BModal(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
            >
              Close Generator
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
