"use client";

import { Building2, Landmark, BrainCircuit, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ValueProposition() {
  const cards = [
    {
      badge: "BORROWER INTELLIGENCE",
      title: "For MSMEs",
      desc: "Understand your credit profile, identify risk factors, and build stronger financing readiness with actionable growth guidance.",
      icon: Building2,
      points: [
        "Uncover hidden creditworthiness from GST & UPI signals",
        "Clear step-by-step suggestions to lower risk rating",
        "Transparent eligibility estimates before formal application",
      ],
      color: "cyan",
    },
    {
      badge: "INSTITUTIONAL UNDERWRITING",
      title: "For Lending Teams",
      desc: "Evaluate MSME credit risk using structured financial and alternative-data intelligence to approve high-conviction loans faster.",
      icon: Landmark,
      points: [
        "Instant calibrated risk score & P(default) probability",
        "Automated sanction bounds, pricing, and covenants",
        "Demographic fairness & disparate impact auditing",
      ],
      color: "blue",
    },
    {
      badge: "TRANSPARENT ML",
      title: "Explainable AI",
      desc: "Go beyond a score with transparent risk factors, SHAP game-theoretic attributions, and forward-looking cash flow projections.",
      icon: BrainCircuit,
      points: [
        "Feature-by-feature point attribution breakdown",
        "6-month Holt-Winters cash-flow & liquidity stress forecasts",
        "Interactive scenario simulator for macro stress testing",
      ],
      color: "emerald",
    },
  ];

  return (
    <section id="solutions" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            Engineered For Clarity
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Comprehensive intelligence across the lending lifecycle
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Bridging the information gap between small enterprises and institutional capital providers with transparent alternative data modeling.
          </p>
        </div>

        {/* 3 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="liquid-panel rounded-3xl p-7 md:p-8 flex flex-col justify-between border border-white/[0.08] relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,210,255,0.15)] group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
                    {card.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-normal">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

