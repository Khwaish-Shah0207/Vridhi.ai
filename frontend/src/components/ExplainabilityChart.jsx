"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, ReferenceLine, Tooltip } from "recharts";

export default function ExplainabilityChart({ factors }) {
  if (!factors || factors.length === 0) return null;

  const data = factors.map((f) => ({
    name: f.feature.replace(/_/g, " "),
    value: f.impact_points,
    direction: f.direction,
  }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-sm font-semibold text-slate-600 mb-4">Top 5 Risk Factors (SHAP Explainability)</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} layout="vertical" margin={{ left: 30, right: 20, top: 0, bottom: 0 }}>
          <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "#64748b" }} width={120} />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
            contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
            formatter={(value) => [`${value > 0 ? "+" : ""}${value} pts`, "Impact"]}
          />
          <ReferenceLine x={0} stroke="#94a3b8" />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.value >= 0 ? "#10b981" : "#ef4444"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        {factors.map((f, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${f.direction === "positive" ? "bg-emerald-500" : "bg-red-500"}`} />
            <span className="text-slate-600">{f.plain_english}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
