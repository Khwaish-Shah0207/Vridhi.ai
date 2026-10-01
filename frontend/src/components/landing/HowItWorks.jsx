"use client";

import { UploadCloud, Cpu, BrainCircuit, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Data Ingestion",
      desc: "Ingest structured turnover, requested credit, GST compliance history, UPI transaction velocity, and vendor trade records.",
      icon: UploadCloud,
    },
    {
      num: "02",
      title: "Credit Risk Analysis",
      desc: "Vectorized XGBoost model evaluates 8 distinct financial and behavioral features to compute a calibrated 0-100 risk score.",
      icon: Cpu,
    },
    {
      num: "03",
      title: "Explainable AI",
      desc: "SHAP attribution decomposes individual feature contributions into clear positive and negative impact points with narrative clarity.",
      icon: BrainCircuit,
    },
    {
      num: "04",
      title: "Portfolio Intelligence",
      desc: "Holt-Winters forecasting models 6-month revenue trajectories while fairness engines test demographic parity compliance.",
      icon: BarChart3,
    },
    {
      num: "05",
      title: "Lending Decision",
      desc: "Institutional policies generate sanction limits, risk-adjusted interest rates, tenor terms, and covenant checklists.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            System Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            How Vridhi.ai executes underwriting
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            A continuous pipeline from multi-signal telemetry ingestion to policy-backed sanction decisions.
          </p>
        </div>

        {/* 5-Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="liquid-panel rounded-3xl p-6 flex flex-col justify-between border border-white/[0.08] relative group hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-cyan-400">
                      {step.num}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:text-cyan-300 group-hover:bg-cyan-500/10 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.04] text-[10px] font-mono text-zinc-400">
                  Step {idx + 1} of 5
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

