"use client";

import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { AIAssistantModal } from "./AIAssistantModal";

export function AICopilotBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 animate-bounce-slow">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-2 sm:gap-3 rounded-full border border-amber-500/40 bg-slate-900/95 px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-2xl backdrop-blur-xl hover:border-amber-400 hover:bg-slate-800 transition-all scale-100 hover:scale-105 active:scale-95"
          aria-label="Open RewardPath AI Advisor"
        >
          <div className="relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shrink-0">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-amber-500"></span>
            </span>
          </div>
          <span className="inline xs:hidden">Ask AI</span>
          <span className="hidden xs:inline">Ask RewardPath AI</span>
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <AIAssistantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
