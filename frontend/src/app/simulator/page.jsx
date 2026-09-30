"use client";

import { useState } from "react";
import { api } from "../../lib/api";
import { SlidersHorizontal, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import RiskBadge from "../../components/RiskBadge";

const SCENARIOS = [
  { value: "baseline", label: "Baseline" },
  { value: "recession", label: "Recession" },
  { value: "inflation_spike", label: "Inflation Spike" },
  { value: "interest_rate_hike", label: "Interest Rate Hike" },
  { value: "festive_boom", label: "Festive Boom" },
];

const DEFAULTS = {
  income: 5000000,
  loan_amount: 1500000,
  gst_compliance_rate: 85,
  monthly_upi_volume: 200000,
  utility_delay_days: 5,
  vendor_trust_score: 75,
  sector_type: "Manufacturing",
  afhi_score: 70,
  income_change_pct: 0,
  loan_amount_change_pct: 0,
  gst_compliance_change: 0,
  utility_delay_change: 0,
  upi_volume_change_pct: 0,
  vendor_trust_change: 0,
  macro_scenario: "baseline",
};

export default function SimulatorPage() {
  const [form, setForm] = useState(DEFAULTS);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSimulate = async () => {
    setLoading(true);
    setError(null);
    const r = await api.simulate(form);
    setLoading(false);
    if (r.error) {
      setError(r.error);
    } else {
      setResult(r.data);
    }
  };

  const sliderClass = "w-full";
  const labelClass = "text-sm font-medium text-slate-700 mb-1 block";
  const valueClass = "text-sm text-blue-600 font-semibold";

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-800">Scenario Simulator</h1>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Adjust business parameters and macro scenarios to see how credit scores change.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h3 className="text-sm font-semibold text-slate-700">Business Parameters</h3>

          <div>
            <div className="flex justify-between"><label className={labelClass}>Income Change</label><span className={valueClass}>{form.income_change_pct > 0 ? "+" : ""}{form.income_change_pct}%</span></div>
            <input type="range" className={sliderClass} min="-80" max="200" step="5" value={form.income_change_pct} onChange={(e) => update("income_change_pct", +e.target.value)} />
          </div>

          <div>
            <div className="flex justify-between"><label className={labelClass}>Loan Amount Change</label><span className={valueClass}>{form.loan_amount_change_pct > 0 ? "+" : ""}{form.loan_amount_change_pct}%</span></div>
            <input type="range" className={sliderClass} min="-80" max="200" step="5" value={form.loan_amount_change_pct} onChange={(e) => update("loan_amount_change_pct", +e.target.value)} />
          </div>

          <div>
            <div className="flex justify-between"><label className={labelClass}>GST Compliance Change</label><span className={valueClass}>{form.gst_compliance_change > 0 ? "+" : ""}{form.gst_compliance_change}</span></div>
            <input type="range" className={sliderClass} min="-50" max="50" step="1" value={form.gst_compliance_change} onChange={(e) => update("gst_compliance_change", +e.target.value)} />
          </div>

          <div>
            <div className="flex justify-between"><label className={labelClass}>Utility Delay Change</label><span className={valueClass}>{form.utility_delay_change > 0 ? "+" : ""}{form.utility_delay_change} days</span></div>
            <input type="range" className={sliderClass} min="-60" max="120" step="1" value={form.utility_delay_change} onChange={(e) => update("utility_delay_change", +e.target.value)} />
          </div>

          <div>
            <div className="flex justify-between"><label className={labelClass}>UPI Volume Change</label><span className={valueClass}>{form.upi_volume_change_pct > 0 ? "+" : ""}{form.upi_volume_change_pct}%</span></div>
            <input type="range" className={sliderClass} min="-80" max="200" step="5" value={form.upi_volume_change_pct} onChange={(e) => update("upi_volume_change_pct", +e.target.value)} />
          </div>

          <div>
            <div className="flex justify-between"><label className={labelClass}>Vendor Trust Change</label><span className={valueClass}>{form.vendor_trust_change > 0 ? "+" : ""}{form.vendor_trust_change}</span></div>
            <input type="range" className={sliderClass} min="-50" max="50" step="1" value={form.vendor_trust_change} onChange={(e) => update("vendor_trust_change", +e.target.value)} />
          </div>

          <div>
            <label className={labelClass}>Macro Scenario</label>
            <select
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={form.macro_scenario}
              onChange={(e) => update("macro_scenario", e.target.value)}
            >
              {SCENARIOS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          <button
            onClick={handleSimulate}
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-base"
          >
            {loading ? "Simulating..." : "Run Simulation"}
          </button>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2 text-sm">{error}</div>}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Simulation Results</h3>
                <div className="flex items-center justify-around mb-6">
                  <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase mb-1">Before</p>
                    <p className="text-3xl font-bold text-slate-800">{result.original_score}</p>
                    <div className="mt-2"><RiskBadge label={result.old_label} size="sm" /></div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-slate-300" />
                  <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase mb-1">After</p>
                    <p className="text-3xl font-bold" style={{ color: result.delta >= 0 ? "#10b981" : "#ef4444" }}>{result.new_score}</p>
                    <div className="mt-2"><RiskBadge label={result.new_label} size="sm" /></div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {result.delta >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`text-lg font-bold ${result.delta >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {result.delta > 0 ? "+" : ""}{result.delta} pts
                  </span>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600">{result.message}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Applied Values</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(result.applied_multipliers || {}).map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-slate-100 py-1">
                      <span className="text-slate-500">{k.replace(/_/g, " ")}</span>
                      <span className="font-medium text-slate-700">{typeof v === "number" ? v.toLocaleString("en-IN", { maximumFractionDigits: 0 }) : v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Adjust the sliders and run a simulation to see results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
