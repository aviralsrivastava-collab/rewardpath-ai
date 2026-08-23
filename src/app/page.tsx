import { Hero, SocialProofBanner, FeatureGrid, TestimonialsAndTeam, FAQ } from "@/components/marketing";
import { ROICalculator, ComparisonMatrix, BreakevenCalculator, ApprovalOddsChecker, WalletOptimizer } from "@/components/calculators";
import { UserDashboard } from "@/components/dashboard";
import { AwardAlertsAndCaching, TrustAndB2BModal } from "@/components/infrastructure";
import { AICopilotBar } from "@/components/ai";

export default function HomePage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-amber-500 selection:text-slate-950">
      <Hero />
      <SocialProofBanner />
      <FeatureGrid />
      <ROICalculator />
      <ComparisonMatrix />
      <BreakevenCalculator />
      <ApprovalOddsChecker />
      <WalletOptimizer />
      <UserDashboard />
      <AwardAlertsAndCaching />
      <TestimonialsAndTeam />
      <TrustAndB2BModal />
      <FAQ />
      <AICopilotBar />
    </div>
  );
}
