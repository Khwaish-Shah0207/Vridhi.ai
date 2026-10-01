"use client";

import Link from "next/link";
import { Building2, Landmark, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function RoleSection() {
  return (
    <section id="for-lenders" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div id="for-msmes" className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            Tailored Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Built for both sides of the MSME lending ecosystem
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Choose your workflow to access tailored tools designed for borrowers or underwriting teams.
          </p>
        </div>

        {/* 2 Interactive Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: MSME Borrower */}
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="liquid-panel rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-white/[0.08] hover:border-cyan-500/40 relative overflow-hidden group transition-all duration-300 shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/[0.06] rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-all" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.2)] group-hover:scale-105 transition-transform">
                  <Building2 className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  Role 01
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  MSME Borrower
                </h3>
                <p className="text-sm text-zinc-300/80 mt-3 leading-relaxed">
                  Understand where your business stands and what can strengthen your financing readiness.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Interactive self-assessment using GST, UPI, and financial health</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Explainable SHAP factor breakdowns to improve creditworthiness</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Forward-looking cash flow forecast &amp; credit capacity benchmarks</span>
                </div>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <Link
                href="/auth?role=borrower"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white/[0.06] hover:bg-gradient-to-r hover:from-[#00d2ff] hover:to-[#3D81E3] text-white hover:text-black font-extrabold text-xs uppercase tracking-wider border border-white/[0.1] hover:border-transparent transition-all shadow-lg group-hover:shadow-cyan-500/25"
              >
                <span>Continue as MSME Borrower</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Lending Officer */}
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="liquid-panel rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-white/[0.08] hover:border-blue-500/40 relative overflow-hidden group transition-all duration-300 shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/[0.06] rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-all" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shadow-[0_0_20px_rgba(61,129,227,0.2)] group-hover:scale-105 transition-transform">
                  <Landmark className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                  Role 02
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Lending Officer
                </h3>
                <p className="text-sm text-zinc-300/80 mt-3 leading-relaxed">
                  Evaluate borrowers, analyze risk, and make informed lending decisions with explainable intelligence.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Batch CSV scoring pipeline for high-throughput portfolio ingestion</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Macroeconomic scenario simulator with multi-parameter stress tests</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Regulatory demographic fairness &amp; Four-Fifths compliance audit</span>
                </div>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <Link
                href="/auth?role=lender"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white/[0.06] hover:bg-gradient-to-r hover:from-[#3D81E3] hover:to-[#00d2ff] text-white hover:text-black font-extrabold text-xs uppercase tracking-wider border border-white/[0.1] hover:border-transparent transition-all shadow-lg group-hover:shadow-blue-500/25"
              >
                <span>Continue as Lending Officer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

