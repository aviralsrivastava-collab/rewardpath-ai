import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer, CookieConsent } from "@/components/layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
