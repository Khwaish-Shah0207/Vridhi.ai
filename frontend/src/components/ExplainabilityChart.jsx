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
    <div className="liquid-glass rounded-2xl p-5 md:p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Top 5 Risk Factors</h3>
          <p className="text-[11px] text-white/35 mt-1">SHAP explainability · model contribution</p>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-white/30 border border-white/10 rounded-full px-2 py-1">Explainable AI</span>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} layout="vertical" margin={{ left: 30, right: 20, top: 0, bottom: 0 }}>
          <XAxis type="number" tick={{ fontSize: 10, fill: "#777" }} />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "#aaa" }} width={120} />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,.03)" }}
            contentStyle={{ borderRadius: 12, border: "1px solid rgba(255,255,255,.12)", background: "#15171a", color: "#fff", fontSize: 12 }}
            formatter={(value) => [`${value > 0 ? "+" : ""}${value} pts`, "Impact"]}
          />
          <ReferenceLine x={0} stroke="rgba(255,255,255,.20)" />
          <Bar dataKey="value" radius={[0, 6, 6, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.value >= 0 ? "#34d399" : "#fb7185"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2">
        {factors.map((f, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${f.direction === "positive" ? "bg-emerald-300" : "bg-rose-300"}`} />
            <span className="text-white/55">{f.plain_english}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
