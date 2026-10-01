"use client";

import Link from "next/link";
import { TrendingUp, Github, Shield, Lock, Activity } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#080809]/80 backdrop-blur-2xl text-white/50 text-xs">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.2)]">
                <TrendingUp className="w-4 h-4 text-black" />
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight">Vridhi.ai</span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-cyan-400/80 font-medium">Credit Intelligence</span>
              </div>
            </Link>
            <p className="text-white/40 text-xs leading-relaxed max-w-sm">
              AI-native MSME credit risk intelligence platform. Transforming traditional balance sheets and alternative data into actionable underwriting decisions.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>API Engine Operational</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] text-white/60">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>256-Bit Encrypted</span>
              </div>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/assess" className="hover:text-white transition-colors">Risk Assessment</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">Risk Dashboard</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio Analytics</Link>
              </li>
              <li>
                <Link href="/simulator" className="hover:text-white transition-colors">Stress Simulator</Link>
              </li>
              <li>
                <Link href="/fairness" className="hover:text-white transition-colors">Fairness Audit</Link>
              </li>
              <li>
                <Link href="/batch" className="hover:text-white transition-colors">Batch Ingestion</Link>
              </li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Solutions</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/auth?role=borrower" className="hover:text-white transition-colors">For MSME Borrowers</Link>
              </li>
              <li>
                <Link href="/auth?role=lender" className="hover:text-white transition-colors">For Lending Officers</Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">Credit Score AI</a>
              </li>
              <li>
                <a href="#preview" className="hover:text-white transition-colors">Explainable SHAP</a>
              </li>
              <li>
                <a href="#preview" className="hover:text-white transition-colors">Sanction Matrix</a>
              </li>
            </ul>
          </div>

          {/* Nav Col 3 */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Governance</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>Fair Lending Act Compliance</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-cyan-400" />
                <span>Algorithmic Bias Guard</span>
              </li>
              <li>
                <span className="text-white/30">Disparate Impact Ratio &ge; 0.80</span>
              </li>
              <li>
                <span className="text-white/30">Equal Opportunity Metric</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/35">
          <p>© {new Date().getFullYear()} Vridhi.ai MSME Credit Intelligence. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

