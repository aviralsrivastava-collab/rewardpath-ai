import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar, Footer, CookieConsent } from "@/components/layout";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#020617",
};

export const metadata: Metadata = {
  title: "RewardPath — AI Credit Card & Travel Rewards Advisor",
  description:
    "Pick the right credit card, track points, and get AI-generated strategies to book travel for near-free. Every recommendation cited to real issuer terms.",
  keywords: [
    "credit card rewards",
    "travel points",
    "AI financial advisor",
    "points redemption",
    "credit card comparison",
  ],
  openGraph: {
    title: "RewardPath — AI Credit Card & Travel Rewards Advisor",
    description:
      "Ask 'How do I get to Paris for free?' and get a structured, cited answer — not a keyword search result.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
        <Navbar />
        <main className="w-full overflow-x-hidden">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
