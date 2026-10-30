import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { HeroCardCanvas } from "@/components/canvas/HeroCardCanvas";
import { ScrollProvider } from "@/components/providers/ScrollProvider";
import { AIAdvisorSlideover } from "@/components/home/AIAdvisorSlideover";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05070f",
};

export const metadata: Metadata = {
  title: "RewardPath — Everyday spend, flown first class",
  description:
    "Private banking & aviation rewards advisor for India. Optimize points across HDFC, Axis, Amex, and SBI with real-time transfer sweet spots, CIBIL approval simulation, and deterministic NAV math.",
  keywords: [
    "credit card rewards India",
    "HDFC Infinia travel points",
    "Axis Atlas Accor ALL transfer",
    "CIBIL score approval simulator",
    "Virgin Atlantic sweet spot Mumbai London",
    "RewardPath AI advisor",
  ],
  openGraph: {
    title: "RewardPath — Everyday spend, flown first class",
    description:
      "Private-banking meets aviation first class. Transparent, deterministic credit card rewards optimization for India.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-text selection:bg-gold selection:text-slate-950 antialiased relative">
        <ScrollProvider>
          {/* Top Scroll Progress Indicator */}
          <ScrollProgressBar />

          {/* Fixed Full-Viewport 3D Credit Card Background Canvas */}
          <HeroCardCanvas />

          {/* Sticky Frosted Glass Navigation */}
          <Navbar />

          {/* Main Content Layers */}
          <main className="relative z-10 w-full overflow-x-hidden">{children}</main>

          {/* Footer with Legal & Compliance */}
          <Footer />

          {/* Slide-over AI Advisor Chat Panel */}
          <AIAdvisorSlideover />
        </ScrollProvider>
      </body>
    </html>
  );
}
