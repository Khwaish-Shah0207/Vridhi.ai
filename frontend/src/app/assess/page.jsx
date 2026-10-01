"use client";

import AssessmentForm from "../../components/AssessmentForm";
import { useAssessment } from "../../context/AssessmentContext";
import { useRouter } from "next/navigation";
import { FileSearch, ArrowRight, ShieldCheck, Sparkles, Cpu, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function AssessmentPage() {
  const { prediction } = useAssessment();
  const router = useRouter();

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[.025] backdrop-blur-xl px-6 py-10 md:px-10 md:py-14">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(700px_circle_at_20%_0%,rgba(0,210,255,.14),transparent_65%)]" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[.2em] text-white/45 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
            AI-native MSME credit intelligence
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Understand credit risk.
            <br />
            <span className="bg-gradient-to-r from-[#00d2ff] via-[#3D81E3] to-[#A4F4FD] bg-clip-text text-transparent">
              Make it explainable.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm md:text-base leading-7 text-white/55">
            Vridhi.ai combines financial and alternative-data signals to generate an
            explainable risk assessment, confidence score, recommendations, and downstream
            analytics for MSME lending decisions.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {["XGBoost prediction", "SHAP explainability", "Alternative data", "Fairness-aware analytics"].map((item) => (
              <span key={item} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[.035] text-xs text-white/60">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
        <section className="liquid-glass rounded-[24px] p-5 md:p-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
              <FileSearch className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Credit Risk Assessment</h2>
              <p className="text-xs text-white/40 mt-1">Enter borrower information to run the model.</p>
            </div>
          </div>
          <AssessmentForm />
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="liquid-glass rounded-[20px] p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/75">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              What Vridhi evaluates
            </div>
            <div className="mt-4 space-y-3">
              {[
                ["Financial capacity", "Income and requested loan"],
                ["Digital activity", "UPI transaction volume"],
                ["Compliance", "GST compliance rate"],
                ["Business trust", "Vendor trust and AFHI"],
              ].map(([a, b]) => (
                <div key={a} className="border-t border-white/8 pt-3">
                  <div className="text-sm text-white/75">{a}</div>
                  <div className="text-xs text-white/35 mt-1">{b}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[20px] border border-cyan-300/15 bg-cyan-300/[.04] p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-100">
              <ShieldCheck className="w-4 h-4" />
              Explainable by design
            </div>
            <p className="text-xs leading-5 text-white/40 mt-2">
              After assessment, open the dashboard for risk factors, forecast signals,
              recommendation details, and the AI assistant.
            </p>
          </div>
        </aside>
      </div>

      {prediction && (
        <div className="liquid-glass rounded-[20px] p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-emerald-300/80 font-medium uppercase tracking-wider">Assessment complete</p>
            <p className="text-xl md:text-2xl font-semibold text-white mt-1">
              {prediction.business_name} · Score {prediction.risk_score} · {prediction.risk_label} Risk
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="shrink-0 rounded-full bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90 transition-base flex items-center justify-center gap-2"
          >
            Open Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

