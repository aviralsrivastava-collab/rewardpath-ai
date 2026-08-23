"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Is this licensed financial advice?",
    answer:
      "No. RewardPath provides purely educational and informational content grounded in verified issuer terms. Every numeric claim, fee, and multiplier links back to cited source documents. Always verify current offers on the credit card issuer's website before submitting an application.",
  },
  {
    question: "How does RewardPath Command Center AI work?",
    answer:
      "Our RAG pipeline combines a vector index for reasoning with a deterministic metadata database for exact NAV math. It evaluates credit card selections, wallet category multipliers, airline/hotel point transfer sweet spots, and CIBIL credit risk guidelines.",
  },
  {
    question: "Does the Approval Odds Checker affect my credit score?",
    answer:
      "Never. All CIBIL bureau simulations and approval probability tools are strictly educational soft checks. We never perform hard credit inquiries, nor do we request or store PAN card numbers.",
  },
  {
    question: "Do you store full credit card numbers?",
    answer:
      "No. Full credit card numbers (16 digits, CVVs, PINs) are never requested, collected, or stored in our database. We only store card names/issuers in your local browser session.",
  },
  {
    question: "What is Rupee per Point (₹/pt) Breakeven Math?",
    answer:
      "Rupee per Point (₹/pt) measures real flight or hotel ticket value earned per point used: Value = (Cash Fare − Taxes & Fees) / Points Required. A redemption is a sweet spot when the yield exceeds baseline valuation (e.g. ₹1.0/pt for HDFC Infinia SmartBuy, ₹1.8/pt for Accor ALL hotel transfers).",
  },
  {
    question: "How do affiliate disclosures work?",
    answer:
      "We may earn an affiliate commission when you apply for a credit card through our links. This disclosure is displayed directly on every recommendation component itself — not hidden in legal footers. Commission relationships do not influence our AI ranking math.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-slate-950 px-4 py-20 sm:px-6 border-t border-slate-800 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Transparency & Disclosure Standards</span>
          </div>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-bold text-white hover:text-amber-400 transition-colors"
                aria-expanded={openIndex === i}
              >
                <span className="pr-4 text-sm sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-amber-400 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="border-t border-slate-800/80 px-6 py-4 bg-slate-950">
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
