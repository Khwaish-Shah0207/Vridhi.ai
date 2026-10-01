"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Cpu, Activity, Database, CheckCircle2, ArrowUpRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const pipelineSteps = [
    {
      step: "01",
      title: "MSME DATA",
      desc: "Financials, GST, UPI & Vendor Settlements",
      icon: Database,
      tag: "Multi-Source Ingestion",
    },
    {
      step: "02",
      title: "AI CREDIT ANALYSIS",
      desc: "XGBoost Engine & Behavioral Modeling",
      icon: Cpu,
      tag: "Vectorized Scoring",
    },
    {
      step: "03",
      title: "RISK INTELLIGENCE",
      desc: "SHAP Game-Theoretic Factor Decomposition",
      icon: Sparkles,
      tag: "Explainable Attribution",
    },
    {
      step: "04",
      title: "LENDING DECISION",
      desc: "Calibrated Limits & Underwriting Terms",
      icon: ShieldCheck,
      tag: "Instant Facility Guidance",
    },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background glow meshes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#00d2ff]/15 via-[#3D81E3]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(0,210,255,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Next-Generation MSME Underwriting Intelligence</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
        >
          AI-Powered Credit Intelligence for{" "}
          <span className="bg-gradient-to-r from-[#00d2ff] via-[#3D81E3] to-[#A4F4FD] bg-clip-text text-transparent">
            MSMEs
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-zinc-300/80 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          Vridhi.ai transforms financial and alternative business data into transparent, explainable credit intelligence — helping MSMEs access financing and enabling lenders to make data-driven decisions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Link
            href="/auth"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00d2ff] via-[#3D81E3] to-[#2563eb] text-black font-extrabold text-sm uppercase tracking-wider shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:brightness-110 active:scale-95 transition-all"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
          </Link>
          <a
            href="#platform"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl liquid-glass hover:bg-white/[0.08] border border-white/[0.12] text-white font-bold text-sm transition-all"
          >
            <span>Explore Platform</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-400" />
          </a>
        </motion.div>

        {/* Flow Visualization: MSME DATA -> AI CREDIT ANALYSIS -> RISK INTELLIGENCE -> LENDING DECISION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-12 md:pt-16"
        >
          <div className="liquid-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-1/4 w-96 h-24 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] text-zinc-400 mb-6 text-left flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00d2ff]" />
                <span>Automated Decision Pipeline</span>
              </div>
              <span className="text-cyan-400">Zero Black-Box Scoring</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {pipelineSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.step}
                    className="liquid-glass rounded-2xl p-5 text-left relative group hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 font-bold">{step.step}</span>
                    </div>

                    <div className="text-xs font-extrabold text-white tracking-wider uppercase mb-1">
                      {step.title}
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed min-h-[32px]">
                      {step.desc}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-white/[0.04] flex items-center justify-between">
                      <span className="text-[9px] font-mono text-cyan-400/80 bg-cyan-500/10 px-2 py-0.5 rounded">
                        {step.tag}
                      </span>
                      {idx < 3 && (
                        <ArrowRight className="hidden lg:block w-3.5 h-3.5 text-zinc-400 -mr-1" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

