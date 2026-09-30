"use client";

import { useAssessment } from "../../context/AssessmentContext";
import { api } from "../../lib/api";
import { useEffect, useState } from "react";
import {
  Shield, TrendingUp, Target, AlertTriangle, FileText, CheckCircle2, Info, LineChart as LineChartIcon,
} from "lucide-react";
import KpiCard from "../../components/KpiCard";
import ScoreGauge from "../../components/ScoreGauge";
import RiskBadge from "../../components/RiskBadge";
import ExplainabilityChart from "../../components/ExplainabilityChart";
import Chatbot from "../../components/Chatbot";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts";
import { formatCurrency } from "../../lib/utils";

export default function DashboardPage() {
  const { prediction, chatContext } = useAssessment();
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (prediction && chatContext) {
      // Try to fetch forecast if we have revenue history in the context
      const ctx = chatContext;
      if (ctx.revenue_history && ctx.revenue_history.length >= 6) {
        api.forecast({ revenue_history: ctx.revenue_history, monthly_emi: 0 }).then((r) => {
          if (!r.error) setForecast(r.data);
        });
      }
    }
  }, [prediction]);

  if (!prediction) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Target className="w-12 h-12 text-slate-300 mb-4" />
        <h2 className="text-xl font-semibold text-slate-600">No Assessment Yet</h2>
        <p className="text-slate-400 mt-2 max-w-md">
          Run a credit risk assessment first to see the full dashboard with scores, explainability, and recommendations.
        </p>
        <a href="/" className="mt-6 text-blue-600 font-medium hover:underline">
          Go to Assessment
        </a>
      </div>
    );
  }

  const rec = prediction.recommendation || {};
  const factors = prediction.factors || [];

  // Build forecast chart data
  const forecastData = forecast
    ? [
        ...forecast.historical.map((v, i) => ({ month: `M${i + 1}`, type: "Historical", value: v })),
        ...forecast.forecast.map((v, i) => ({ month: `F${i + 1}`, type: "Forecast", value: v, lower: forecast.lower[i], upper: forecast.upper[i] })),
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Risk Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">{prediction.business_name}</p>
        </div>
        <RiskBadge label={prediction.risk_label} size="lg" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Credit Risk Score" value={prediction.risk_score} subtitle="out of 100" icon={Shield} color="blue" />
        <KpiCard
          title="Risk Label"
          value={prediction.risk_label}
          subtitle={prediction.risk_label === "LOW" ? "Low risk profile" : prediction.risk_label === "MEDIUM" ? "Moderate risk" : "High risk"}
          icon={AlertTriangle}
          color={prediction.risk_label === "LOW" ? "emerald" : prediction.risk_label === "MEDIUM" ? "amber" : "red"}
        />
        <KpiCard title="Confidence" value={`${(prediction.confidence * 100).toFixed(1)}%`} subtitle="Model confidence" icon={Target} color="slate" />
        <KpiCard title="Default Probability" value={`${(prediction.default_probability * 100).toFixed(1)}%`} subtitle="P(default)" icon={TrendingUp} color="red" />
      </div>

      {/* Score Gauge + Explainability */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ScoreGauge score={prediction.risk_score} label={prediction.risk_label} />
        </div>
        <div className="lg:col-span-2">
          <ExplainabilityChart factors={factors} />
        </div>
      </div>

      {/* Loan Recommendation */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-700">Loan Recommendation</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs text-slate-400 uppercase">Eligibility</p>
            <p className="text-sm font-semibold text-slate-700 mt-1">{rec.eligibility || "N/A"}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs text-slate-400 uppercase">Suggested Amount</p>
            <p className="text-sm font-semibold text-slate-700 mt-1">
              {rec.suggested_amount ? formatCurrency(rec.suggested_amount) : "N/A"}
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs text-slate-400 uppercase">Interest Rate Range</p>
            <p className="text-sm font-semibold text-slate-700 mt-1">{rec.interest_rate_range || "N/A"}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs text-slate-400 uppercase">Repayment Period</p>
            <p className="text-sm font-semibold text-slate-700 mt-1">
              {rec.repayment_period_months ? `${rec.repayment_period_months} months` : "N/A"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Reasons</p>
            <ul className="space-y-1.5">
              {(rec.reasons || []).map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Conditions</p>
            <ul className="space-y-1.5">
              {(rec.conditions || []).map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {rec.disclaimer && (
          <p className="mt-4 text-xs text-slate-400 italic">{rec.disclaimer}</p>
        )}
      </div>

      {/* Cash Flow Forecast */}
      {forecast && forecastData.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <LineChartIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-700">6-Month Cash Flow Forecast</h3>
            <span className="text-xs text-slate-400 ml-auto">{forecast.method}</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={forecastData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(v) => v >= 100000 ? `${(v / 100000).toFixed(0)}L` : v.toFixed(0)} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
                formatter={(v) => [formatCurrency(v), ""]}
              />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#histGrad)" strokeWidth={2} name="Revenue" />
            </AreaChart>
          </ResponsiveContainer>
          {forecast.risky_months && forecast.risky_months.length > 0 && (
            <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Risky months detected: {forecast.risky_months.map((m) => `Month ${m + 1}`).join(", ")}
            </div>
          )}
        </div>
      )}

      {/* AI Assistant */}
      <Chatbot context={chatContext} />
    </div>
  );
}
