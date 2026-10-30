import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { StorytellingSection } from "@/components/home/StorytellingSection";
import { AdvisorEnginesSection } from "@/components/home/AdvisorEnginesSection";
import { NavCalculatorSection } from "@/components/home/NavCalculatorSection";
import { CardComparisonSection } from "@/components/home/CardComparisonSection";
import { PointsBreakevenSection } from "@/components/home/PointsBreakevenSection";
import { CibilSimulatorSection } from "@/components/home/CibilSimulatorSection";
import { WalletOptimizerSection } from "@/components/home/WalletOptimizerSection";
import { PortfolioTrackerSection } from "@/components/home/PortfolioTrackerSection";
import { AwardAvailabilitySection } from "@/components/home/AwardAvailabilitySection";
import { SocialProofAndFaqSection } from "@/components/home/SocialProofAndFaqSection";

export default function HomePage() {
  return (
    <div className="relative w-full">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Count-Up Stats */}
      <StatsSection />

      {/* 3. Pinned 4-State Storytelling */}
      <StorytellingSection />

      {/* 4. Advisor Engines (Trip Planner, Purchase, Redemption, Wallet Router) */}
      <AdvisorEnginesSection />

      {/* 5. Net Annual Value (NAV) Calculator */}
      <NavCalculatorSection />

      {/* 6. Side-by-Side Card Comparison Matrix */}
      <CardComparisonSection />

      {/* 7. Points vs Cash Breakeven Calculator */}
      <PointsBreakevenSection />

      {/* 8. CIBIL Underwriting & Approval Odds Simulator */}
      <CibilSimulatorSection />

      {/* 9. Wallet Multiplier Router & Downgrade Optimizer */}
      <WalletOptimizerSection />

      {/* 10. Portfolio & Milestone Tracker */}
      <PortfolioTrackerSection />

      {/* 11. Award Seat Availability Tracker */}
      <AwardAvailabilitySection />

      {/* 12. Verified Contributors, FAQ & Legal */}
      <SocialProofAndFaqSection />
    </div>
  );
}
