"use client";

import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export default function ScoreGauge({ score, label }) {
  const color = getGaugeColor(score);
  const data = [{ name: "score", value: score, fill: color }];

  return (
    <div className="liquid-glass rounded-2xl p-6 flex flex-col items-center">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Credit Risk Score</h3>
        <span className="text-[10px] uppercase tracking-wider text-white/30">0–100</span>
      </div>

      <div className="relative w-52 h-52 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="70%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar background={{ fill: "rgba(255,255,255,.08)" }} dataKey="value" cornerRadius={12} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-semibold tracking-tight" style={{ color }}>{score}</span>
          <span className="text-[10px] text-white/30 mt-1">risk score</span>
        </div>
      </div>

      {label && (
        <div
          className="mt-1 px-4 py-1.5 rounded-full text-xs font-semibold border"
          style={{ backgroundColor: `${color}14`, borderColor: `${color}35`, color }}
        >
          {label} RISK
        </div>
      )}
    </div>
  );
}

function getGaugeColor(score) {
  if (score >= 70) return "#34d399";
  if (score >= 40) return "#fbbf24";
  return "#fb7185";
}
