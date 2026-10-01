"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Glow aura */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[350px] bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-emerald-500/10 rounded-full blur-[110px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 md:p-14 border border-white/15 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent backdrop-blur-2xl text-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* Subtle grid pattern background */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "24px 24px"
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen MSME Underwriting</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-[1.15]">
              Turn MSME data into smarter, faster credit decisions.
            </h2>

            <p className="mt-5 text-base md:text-lg text-white/60 max-w-2xl font-light leading-relaxed">
              Empower MSME borrowers with crystal-clear financing readiness and equip lending officers with institutional-grade predictive risk models.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              <Link
                href="/auth?role=borrower"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>For MSME Borrowers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/auth?role=lender"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm backdrop-blur-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>For Lending Officers</span>
                <Zap className="w-4 h-4 text-cyan-400" />
              </Link>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/40">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero backend risk exposure</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div>Explainable Tree SHAP & LIME</div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div>Fairness & Bias Audited (EO / DP / DIR)</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

