"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "@/lib/store/useAppStore";

// Helper to generate crisp procedural high-res textures for the metal credit card
function createCardTextures() {
  if (typeof document === "undefined") {
    return { front: null, back: null };
  }

  // --- Front Face Texture ---
  const frontCanvas = document.createElement("canvas");
  frontCanvas.width = 1024;
  frontCanvas.height = 640;
  const fCtx = frontCanvas.getContext("2d");

  if (fCtx) {
    // Base metallic background
    const bgGrad = fCtx.createLinearGradient(0, 0, 1024, 640);
    bgGrad.addColorStop(0, "#080c18");
    bgGrad.addColorStop(0.4, "#0d1428");
    bgGrad.addColorStop(0.7, "#141c33");
    bgGrad.addColorStop(1, "#070b16");
    fCtx.fillStyle = bgGrad;
    fCtx.fillRect(0, 0, 1024, 640);

    // Subtle brushed lines
    fCtx.strokeStyle = "rgba(231, 195, 111, 0.04)";
    fCtx.lineWidth = 1;
    for (let i = 0; i < 640; i += 6) {
      fCtx.beginPath();
      fCtx.moveTo(0, i);
      fCtx.lineTo(1024, i + 8);
      fCtx.stroke();
    }

    // Gold border line
    fCtx.strokeStyle = "rgba(231, 195, 111, 0.35)";
    fCtx.lineWidth = 2;
    fCtx.strokeRect(36, 36, 1024 - 72, 640 - 72);

    // Diagonal gold metallic sheen
    const sheen = fCtx.createLinearGradient(0, 0, 1024, 640);
    sheen.addColorStop(0, "rgba(231, 195, 111, 0)");
    sheen.addColorStop(0.45, "rgba(231, 195, 111, 0.08)");
    sheen.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
    sheen.addColorStop(0.55, "rgba(231, 195, 111, 0.08)");
    sheen.addColorStop(1, "rgba(231, 195, 111, 0)");
    fCtx.fillStyle = sheen;
    fCtx.fillRect(0, 0, 1024, 640);

    // Logo & Wordmark
    fCtx.fillStyle = "#e7c36f";
    fCtx.font = "bold 34px 'Fraunces', Georgia, serif";
    fCtx.fillText("REWARDPATH", 72, 108);

    fCtx.fillStyle = "rgba(238, 240, 246, 0.65)";
    fCtx.font = "600 16px 'Instrument Sans', sans-serif";
    fCtx.fillText("FIRST CLASS ADVISOR", 72, 136);

    // Top right aviation icon / emblem
    fCtx.fillStyle = "rgba(231, 195, 111, 0.8)";
    fCtx.font = "bold 20px 'Instrument Sans', sans-serif";
    fCtx.fillText("✦ INFINITE", 840, 108);

    // EMV Smart Chip
    const chipX = 72;
    const chipY = 220;
    const chipW = 120;
    const chipH = 90;
    const chipGrad = fCtx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
    chipGrad.addColorStop(0, "#d8b257");
    chipGrad.addColorStop(0.5, "#fcedba");
    chipGrad.addColorStop(1, "#a8812a");
    fCtx.fillStyle = chipGrad;
    fCtx.beginPath();
    fCtx.roundRect(chipX, chipY, chipW, chipH, 12);
    fCtx.fill();

    // Chip internal circuit lines
    fCtx.strokeStyle = "rgba(70, 50, 10, 0.7)";
    fCtx.lineWidth = 1.5;
    fCtx.beginPath();
    fCtx.moveTo(chipX + chipW * 0.5, chipY);
    fCtx.lineTo(chipX + chipW * 0.5, chipY + chipH);
    fCtx.moveTo(chipX, chipY + chipH * 0.5);
    fCtx.lineTo(chipX + chipW, chipY + chipH * 0.5);
    fCtx.stroke();

    // Contactless wave symbol
    fCtx.strokeStyle = "rgba(231, 195, 111, 0.7)";
    fCtx.lineWidth = 3;
    fCtx.beginPath();
    fCtx.arc(240, 265, 16, -Math.PI * 0.35, Math.PI * 0.35);
    fCtx.stroke();
    fCtx.beginPath();
    fCtx.arc(240, 265, 26, -Math.PI * 0.35, Math.PI * 0.35);
    fCtx.stroke();
    fCtx.beginPath();
    fCtx.arc(240, 265, 36, -Math.PI * 0.35, Math.PI * 0.35);
    fCtx.stroke();

    // Masked Card Number
    fCtx.fillStyle = "#eef0f6";
    fCtx.font = "bold 32px 'Courier New', monospace";
    fCtx.letterSpacing = "6px";
    fCtx.fillText("••••   ••••   ••••   8892", 72, 400);

    // Cardholder details
    fCtx.fillStyle = "rgba(238, 240, 246, 0.5)";
    fCtx.font = "500 14px 'Instrument Sans', sans-serif";
    fCtx.fillText("CARDHOLDER", 72, 490);
    fCtx.fillText("VALID THRU", 420, 490);

    fCtx.fillStyle = "#eef0f6";
    fCtx.font = "bold 22px 'Instrument Sans', sans-serif";
    fCtx.fillText("FIRST CLASS MEMBER", 72, 530);
    fCtx.fillText("12/30", 420, 530);

    // Network / Metal Holographic badge (Bottom right)
    fCtx.fillStyle = "rgba(231, 195, 111, 0.9)";
    fCtx.font = "italic bold 36px 'Fraunces', serif";
    fCtx.fillText("RP", 880, 540);
  }

  // --- Back Face Texture ---
  const backCanvas = document.createElement("canvas");
  backCanvas.width = 1024;
  backCanvas.height = 640;
  const bCtx = backCanvas.getContext("2d");

  if (bCtx) {
    bCtx.fillStyle = "#070a14";
    bCtx.fillRect(0, 0, 1024, 640);

    // Magnetic Stripe (Matte black with micro-stripes)
    bCtx.fillStyle = "#000000";
    bCtx.fillRect(0, 60, 1024, 120);

    bCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    bCtx.lineWidth = 1;
    for (let x = 0; x < 1024; x += 12) {
      bCtx.beginPath();
      bCtx.moveTo(x, 60);
      bCtx.lineTo(x + 20, 180);
      bCtx.stroke();
    }

    // Signature strip
    bCtx.fillStyle = "#e2e8f0";
    bCtx.fillRect(72, 230, 600, 75);

    // CVV box
    bCtx.fillStyle = "#ffffff";
    bCtx.fillRect(680, 230, 120, 75);
    bCtx.fillStyle = "#0a0e1a";
    bCtx.font = "italic bold 28px 'Courier New', monospace";
    bCtx.fillText("889", 715, 278);

    // Security text
    bCtx.fillStyle = "rgba(238, 240, 246, 0.45)";
    bCtx.font = "12px 'Instrument Sans', sans-serif";
    bCtx.fillText("AUTHORISED SIGNATURE — NOT TRANSFERABLE", 72, 335);
    bCtx.fillText("REWARDPATH COMMAND CENTER AI • INDIAN BANKING REWARDS ENGINE", 72, 375);
    bCtx.fillText("For customer support and concierge assistance: concierge@rewardpath.ai", 72, 400);

    // Hologram chip on back
    const holoGrad = bCtx.createLinearGradient(820, 420, 940, 540);
    holoGrad.addColorStop(0, "rgba(124, 108, 255, 0.4)");
    holoGrad.addColorStop(0.5, "rgba(231, 195, 111, 0.5)");
    holoGrad.addColorStop(1, "rgba(95, 227, 180, 0.4)");
    bCtx.fillStyle = holoGrad;
    bCtx.beginPath();
    bCtx.arc(880, 480, 50, 0, Math.PI * 2);
    bCtx.fill();
    bCtx.fillStyle = "#ffffff";
    bCtx.font = "bold 20px 'Fraunces', serif";
    bCtx.fillText("SECURE", 845, 486);
  }

  const frontTex = new THREE.CanvasTexture(frontCanvas);
  const backTex = new THREE.CanvasTexture(backCanvas);
  frontTex.colorSpace = THREE.SRGBColorSpace;
  backTex.colorSpace = THREE.SRGBColorSpace;
  frontTex.anisotropy = 8;
  backTex.anisotropy = 8;

  return { front: frontTex, back: backTex };
}

export function HeroCardScene() {
  const { viewport } = useThree();
  const cardGroupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const scrollProgress = useAppStore((s) => s.scrollProgress);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Textures
  const textures = useMemo(() => createCardTextures(), []);

  // Materials for the 6 faces of the BoxGeometry
  const materials = useMemo(() => {
    const edgeMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#e7c36f"),
      metalness: 0.95,
      roughness: 0.14,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    const frontMaterial = new THREE.MeshPhysicalMaterial({
      map: textures.front,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
      reflectivity: 0.8,
    });

    const backMaterial = new THREE.MeshPhysicalMaterial({
      map: textures.back,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
      reflectivity: 0.8,
    });

    // Box faces: [+X, -X, +Y, -Y, +Z (Front), -Z (Back)]
    return [
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      frontMaterial,
      backMaterial,
    ];
  }, [textures]);

  // ~700 Gold particle field
  const particleGeo = useMemo(() => {
    const count = 700;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  // Frame animation loop with damped lerp (0.06 damping)
  useFrame((state, delta) => {
    if (!cardGroupRef.current) return;

    if (prefersReducedMotion) {
      // Static elegant resting state
      cardGroupRef.current.position.set(viewport.width > 7 ? 2.0 : 0, 0, 0);
      cardGroupRef.current.rotation.set(0.1, -0.4, 0.05);
      return;
    }

    const t = state.clock.getElapsedTime();
    const p = scrollProgress; // 0 to 1

    // Rotation: card Y-rotation = scrollProgress * 5 * Math.PI
    const targetRotY = p * 5 * Math.PI + mouseRef.current.x * 0.15;
    // X-tilt and Z-roll follow smooth sine curves
    const targetRotX = Math.sin(p * Math.PI * 4) * 0.35 + mouseRef.current.y * 0.15;
    const targetRotZ = Math.sin(p * Math.PI * 3) * 0.16 + mouseRef.current.x * 0.1;

    // X-position swings left/right so it frames text gracefully
    const isDesktop = viewport.width > 7;
    let targetX = 0;
    if (isDesktop) {
      if (p < 0.18) {
        // Hero: sits on the right
        targetX = 2.2;
      } else if (p < 0.38) {
        // Pinned Storytelling: centers for 4-state unfolding
        targetX = 0;
      } else if (p < 0.58) {
        // Engines & NAV Calculator: swings left
        targetX = -2.2;
      } else if (p < 0.78) {
        // Comparison & Simulator: swings right
        targetX = 2.2;
      } else {
        // Bottom: rests slightly right
        targetX = 1.8;
      }
    } else {
      // Mobile: centered with subtle depth
      targetX = 0;
    }

    // Y position includes gentle idle float
    const idleY = Math.sin(t * 1.6) * 0.08;
    const targetY = (p < 0.38 && p >= 0.18 ? 0.3 : 0) + idleY;

    // Camera dolly in at mid-page (z: 3.8 to 5.2)
    const targetCamZ = isDesktop
      ? 5.2 - Math.sin(p * Math.PI) * 1.4
      : 6.2 - Math.sin(p * Math.PI) * 1.0;

    // Lerp damping factor
    const damping = Math.min(1, delta * 4.5);

    cardGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      cardGroupRef.current.rotation.y,
      targetRotY,
      damping
    );
    cardGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      cardGroupRef.current.rotation.x,
      targetRotX,
      damping
    );
    cardGroupRef.current.rotation.z = THREE.MathUtils.lerp(
      cardGroupRef.current.rotation.z,
      targetRotZ,
      damping
    );

    cardGroupRef.current.position.x = THREE.MathUtils.lerp(
      cardGroupRef.current.position.x,
      targetX,
      damping
    );
    cardGroupRef.current.position.y = THREE.MathUtils.lerp(
      cardGroupRef.current.position.y,
      targetY,
      damping
    );

    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetCamZ,
      damping
    );

    // Particle drift
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.03 + p * 0.8;
      particlesRef.current.rotation.x = Math.sin(t * 0.02) * 0.1;
    }
  });

  return (
    <>
      {/* Lighting: Gold point light + Violet rim light */}
      <ambientLight intensity={1.1} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[3, 2, 4]} intensity={3.5} color="#e7c36f" distance={15} />
      <pointLight position={[-4, -2, -3]} intensity={4.5} color="#7c6cff" distance={18} />
      <pointLight position={[0, -4, 2]} intensity={1.8} color="#5fe3b4" distance={10} />

      {/* Gold Particle Field */}
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial
          size={0.045}
          color="#e7c36f"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Hero Metal Credit Card (3.4 x 2.125 x 0.07) */}
      <group ref={cardGroupRef} position={[2.2, 0, 0]}>
        <mesh material={materials} castShadow receiveShadow>
          <boxGeometry args={[3.4, 2.125, 0.07]} />
        </mesh>
      </group>
    </>
  );
}
