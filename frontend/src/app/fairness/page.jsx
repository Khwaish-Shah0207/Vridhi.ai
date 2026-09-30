"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Scale, AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

export default function FairnessPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const r = await api.fairness();
    setLoading(false);
    if (r.error) {
      setError(r.error);
    } else {
      setData(r.data);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6">{error}</div>;
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Scale className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-800">Fairness &amp; Bias Analysis</h1>
        </div>
        <p className="text-sm text-slate-500 mt-1">Audit-level analysis of credit decisions across demographic groups</p>
      </div>

      {/* Important note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          Fairness attributes (owner gender, region, sector type) are used for audit and analysis only and are
          <strong> not model input features</strong>. The ML model uses 8 financial/alternative-data features exclusively.
        </p>
      </div>

      {/* Portfolio summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-xs text-slate-400 uppercase">Portfolio Average Score</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{data.portfolio_avg_score}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-xs text-slate-400 uppercase">Portfolio Approval Rate</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{data.portfolio_approval_rate}%</p>
          <p className="text-xs text-slate-400 mt-1">Threshold: score &ge; {data.approval_threshold}</p>
        </div>
      </div>

      {/* Analyses per attribute */}
      {(data.analyses || []).map((analysis) => (
        <div key={analysis.attribute} className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700 capitalize">
              {analysis.attribute.replace(/_/g, " ")} Analysis
            </h3>
            <span className="text-xs text-slate-400">{analysis.note}</span>
          </div>

          {/* Approval rate chart */}
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analysis.groups} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="group" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} unit="%" />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
                formatter={(v, name) => [`${v}${name === "approval_rate" ? "%" : ""}`, name.replace(/_/g, " ")]}
              />
              <Bar dataKey="approval_rate" radius={[4, 4, 0, 0]} name="Approval Rate">
                {analysis.groups.map((g, i) => (
                  <Cell key={i} fill={g.bias_alert ? "#ef4444" : "#3b82f6"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Group table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs text-slate-500 uppercase">
                  <th className="text-left py-2 px-2">Group</th>
                  <th className="text-right py-2 px-2">Count</th>
                  <th className="text-right py-2 px-2">Avg Score</th>
                  <th className="text-right py-2 px-2">Approval %</th>
                  <th className="text-right py-2 px-2">Deviation</th>
                  <th className="text-right py-2 px-2">DI Ratio</th>
                  <th className="text-center py-2 px-2">4/5 Rule</th>
                  <th className="text-center py-2 px-2">Bias Alert</th>
                </tr>
              </thead>
              <tbody>
                {analysis.groups.map((g) => (
                  <tr key={g.group} className="border-b border-slate-50">
                    <td className="py-2 px-2 font-medium text-slate-700">{g.group}</td>
                    <td className="text-right py-2 px-2 text-slate-600">{g.count}</td>
                    <td className="text-right py-2 px-2 text-slate-600">{g.average_score}</td>
                    <td className="text-right py-2 px-2 text-slate-600">{g.approval_rate}%</td>
                    <td className={`text-right py-2 px-2 font-medium ${Math.abs(g.deviation) > 15 ? "text-red-600" : "text-slate-600"}`}>
                      {g.deviation > 0 ? "+" : ""}{g.deviation}
                    </td>
                    <td className="text-right py-2 px-2 text-slate-600">{g.disparate_impact_ratio}</td>
                    <td className="text-center py-2 px-2">
                      {g.four_fifths_pass ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-2 px-2">
                      {g.bias_alert ? (
                        <span className="inline-flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-3 h-3" /> Alert
                        </span>
                      ) : (
                        <span className="text-xs text-emerald-600">OK</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-500 space-y-1">
        <p><strong>Disparate Impact Ratio</strong> = group approval rate / highest group approval rate. Below 0.8 fails the four-fifths rule.</p>
        <p><strong>Deviation</strong> = group average score - portfolio average score. Bias alert triggered when deviation exceeds 15 points.</p>
      </div>
    </div>
  );
}
