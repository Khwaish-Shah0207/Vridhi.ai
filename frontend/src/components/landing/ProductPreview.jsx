"use client";

import { Shield, TrendingUp, Target, AlertTriangle, FileText, CheckCircle2, LineChart as LineChartIcon, Sparkles } from "lucide-react";
import RiskBadge from "../RiskBadge";

export default function ProductPreview() {
  const sampleFactors = [
    { name: "GST Compliance Rate", points: "+14.2", positive: true, note: "Consistent on-time GSTR-3B filings over 24 months" },
    { name: "Monthly UPI Volume", points: "+9.8", positive: true, note: "Strong digital transaction throughput indicating healthy velocity" },
    { name: "AFHI Health Score", points: "+6.5", positive: true, note: "Healthy alternative financial index composite" },
    { name: "Utility Delay Lag", points: "-4.1", positive: false, note: "Minor 5-day delay pattern in commercial electricity payments" },
  ];

  return (
    <section id="platform" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            Platform Interface
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Institutional intelligence terminal
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Real-time SHAP factor attribution, forward-looking cash flow projections, and sanction guidance in a unified glass terminal.
          </p>
        </div>

        {/* Dashboard Glass Mockup */}
        <div className="liquid-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/[0.1] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.05] rounded-full blur-[140px] pointer-events-none" />

          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/60" />
                <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <div className="h-4 w-px bg-white/10 mx-1" />
              <span className="text-xs font-mono text-zinc-400">
                VRIDHI RISK DOSSIER · SRI BALAJI ENTERPRISES (MANUFACTURING)
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                MODEL CONFIDENCE: 92.4%
              </span>
              <RiskBadge label="LOW" size="sm" />
            </div>
          </div>

          {/* 4 KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="liquid-glass rounded-2xl p-5">
              <div className="text-[10px] uppercase font-semibold text-zinc-400">Credit Risk Score</div>
              <div className="text-3xl font-black text-white mt-1">78 <span className="text-xs text-zinc-400 font-normal">/ 100</span></div>
              <div className="text-[11px] text-emerald-400 mt-1 font-medium">Prime Tier Rating</div>
            </div>
            <div className="liquid-glass rounded-2xl p-5">
              <div className="text-[10px] uppercase font-semibold text-zinc-400">Default Probability</div>
              <div className="text-3xl font-black text-emerald-400 mt-1">8.2%</div>
              <div className="text-[11px] text-zinc-400 mt-1">12-Mo Expected P(Default)</div>
            </div>
            <div className="liquid-glass rounded-2xl p-5">
              <div className="text-[10px] uppercase font-semibold text-zinc-400">Sanction Ceiling</div>
              <div className="text-3xl font-black text-cyan-400 mt-1">₹15.0 L</div>
              <div className="text-[11px] text-zinc-400 mt-1">11.5% - 13.0% APR</div>
            </div>
            <div className="liquid-glass rounded-2xl p-5">
              <div className="text-[10px] uppercase font-semibold text-zinc-400">AFHI Index</div>
              <div className="text-3xl font-black text-white mt-1">84 <span className="text-xs text-zinc-400 font-normal">/ 100</span></div>
              <div className="text-[11px] text-cyan-400 mt-1">High Behavioral Reliability</div>
            </div>
          </div>

          {/* 2-Column Split: Factor Attribution + Facility Sanction Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* SHAP Factor Breakdown */}
            <div className="lg:col-span-7 liquid-glass rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SHAP Feature Attribution Decomposition</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">Score Impact</span>
              </div>

              <div className="space-y-3">
                {sampleFactors.map((f, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-white">{f.name}</span>
                      <span className={`font-mono font-bold ${f.positive ? "text-emerald-400" : "text-rose-400"}`}>
                        {f.points} pts
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-normal">{f.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sanction Guidance & Forecast Preview */}
            <div className="lg:col-span-5 liquid-glass rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Underwriting Policy Terms</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Approved</span>
                </div>

                <div className="space-y-2.5 text-xs text-zinc-300">
                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Eligible for working capital credit line up to <strong>₹15,00,000</strong></span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Recommended tenor: <strong>24 months</strong> with quarterly review</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Cash flow forecast projects positive working capital liquidity</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400">
                <span>Holt-Winters Trajectory: Steady</span>
                <span className="text-cyan-400 font-mono">0 High-Risk Months</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

