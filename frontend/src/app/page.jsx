"use client";

import AssessmentForm from "../components/AssessmentForm";
import { useAssessment } from "../context/AssessmentContext";
import { useRouter } from "next/navigation";
import { FileSearch, ArrowRight, Sparkles } from "lucide-react";

export default function AssessmentPage() {
  const { prediction } = useAssessment();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <FileSearch className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Credit Risk Assessment</h1>
        </div>
        <p className="text-blue-100 text-sm md:text-base max-w-2xl">
          Enter business and financial details to generate an explainable credit-risk score using alternative data sources.
          The XGBoost model evaluates 8 features including GST compliance, UPI volume, and vendor trust.
        </p>
      </div>

      <AssessmentForm />

      {prediction && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-emerald-700 font-medium">Assessment complete for {prediction.business_name}</p>
            <p className="text-2xl font-bold text-emerald-800 mt-1">
              Score: {prediction.risk_score} — {prediction.risk_label} Risk
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-base flex items-center gap-2"
          >
            View Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
