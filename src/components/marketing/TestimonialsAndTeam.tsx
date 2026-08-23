import { Star } from "lucide-react";

export function TestimonialsAndTeam() {
  const testimonials = [
    {
      name: "Vikram Malhotra",
      role: "Frequent Business Traveler (Mumbai)",
      quote: "The Arbitrageur engine transferred my Axis Atlas EDGE Miles to Accor ALL (1:2 ratio) for a luxury stay at Sofitel Dubai Downtown. Saved over ₹4.2 Lakhs on my family trip!",
      savings: "₹4.2 Lakhs saved",
      verified: true,
    },
    {
      name: "Ananya Sharma",
      role: "Product Manager (Bengaluru)",
      quote: "The Matchmaker beat every comparison blog because it showed exact Rupee NAV math instead of generic sponsored ratings. Grounded directly in HDFC Infinia & SBI Cashback terms.",
      savings: "₹1.8 Lakhs saved",
      verified: true,
    },
    {
      name: "Rohan Gupta",
      role: "Rewards Strategist (Delhi NCR)",
      quote: "The Guardian engine flagged my hard CIBIL inquiries before I applied for Axis Atlas, saving me from an inquiry velocity rejection. Extremely trustworthy engineering.",
      savings: "₹95,000 saved",
      verified: true,
    },
  ];

  const team = [
    { name: "Aviral Srivastava", title: "Founder & CEO" },
    { name: "Ansh Kumar Rai", title: "Head of AI Product Engineering & Co-Founder" },
  ];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 bg-slate-900 text-white border-t border-slate-800">
      <div className="mx-auto max-w-6xl">
        {/* Testimonials */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
            <Star className="h-3.5 w-3.5" />
            <span>Verified Community Proof</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
            Trusted by Smart Cardholders Across India
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between space-y-4 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">&quot;{t.quote}&quot;</p>
              </div>

              <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">{t.name}</h4>
                  <span className="text-[10px] text-slate-400">{t.role}</span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-extrabold">
                  {t.savings}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="text-center mb-8 border-t border-slate-800 pt-12">
          <h3 className="font-display text-2xl font-bold text-white">Built by Financial Infrastructure Veterans</h3>
          <p className="text-xs text-slate-400 mt-1">Combining algorithmic precision, hybrid retrieval RAG, and strict disclosure compliance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {team.map((member, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center shadow-lg hover:border-slate-700 transition-colors">
              <h4 className="font-bold text-white text-base">{member.name}</h4>
              <span className="text-xs font-semibold text-amber-400 block mt-1">{member.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
