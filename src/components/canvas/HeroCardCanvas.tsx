"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroCardScene } from "./HeroCardScene";

function FallbackCard() {
  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none opacity-40">
      <div className="w-[320px] h-[200px] rounded-2xl border border-gold/40 bg-gradient-to-br from-surface via-slate-900 to-black p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex justify-between items-start">
          <span className="font-serif text-gold text-lg tracking-wider font-bold">REWARDPATH</span>
          <span className="text-[10px] text-gold/70 font-sans tracking-widest">FIRST CLASS</span>
        </div>
        <div className="mt-8 w-10 h-7 rounded bg-amber-400/80 border border-amber-300" />
        <div className="mt-6 text-sm font-mono tracking-widest text-slate-300">•••• •••• •••• 8892</div>
      </div>
    </div>
  );
}

export function HeroCardCanvas() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Test WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    // Visibility listener to pause rendering when tab is hidden
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {hasWebGL && isTabVisible ? (
        <Suspense fallback={<FallbackCard />}>
          <Canvas
            camera={{ position: [0, 0, 5.2], fov: 45 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              powerPreference: "high-performance",
              alpha: true,
            }}
            className="w-full h-full"
          >
            <HeroCardScene />
          </Canvas>
        </Suspense>
      ) : (
        <FallbackCard />
      )}
    </div>
  );
}
