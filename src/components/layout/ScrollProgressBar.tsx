"use client";

import React from "react";
import { useAppStore } from "@/lib/store/useAppStore";

export function ScrollProgressBar() {
  const scrollProgress = useAppStore((s) => s.scrollProgress);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-line/20"
    >
      <div
        className="h-full bg-gradient-to-r from-gold via-violet to-success transition-all duration-75 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
      />
    </div>
  );
}
