"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Users, TrendingUp, CheckCircle2, AlertTriangle } from "lucide-react";
import KpiCard from "../../components/KpiCard";
import {
  ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis,
  CartesianGrid, Tooltip, ZAxis, Cell, Legend,
} from "recharts";
import RiskBadge from "../../components/RiskBadge";

const RISK_COLORS = { LOW: "#10b981", MEDIUM: "#f59e0b", HIGH: "#ef4444" };

export default function PortfolioPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ sector: "all", region: "all", size: "all", x: "income", y: "risk_score" });

  useEffect(() => {
    load();
  }, [filters]);

  const load = async () => {
    setLoading(true);
    const params = {};
    if (filters.sector !== "all") params.sector = filters.sector;
    if (filters.region !== "all") params.region = filters.region;
    if (filters.size !== "all") params.size = filters.size;
    params.x = filters.x;
    params.y = filters.y;
    const result = await api.segmentation(params);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setData(result.data);
    }
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6">
        {error}
      </div>
    );
  }

  if (!data) return null;

  const scatterData = (data.points || []).map((p) => ({
    x: p.x,
    y: p.y,
    label: p.risk_label,
    business: p.business,
    sector: p.sector,
    region: p.region,
  }));

  const selectClass = "border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Portfolio &amp; Segmentation</h1>
        <p className="text-sm text-slate-500 mt-1">Risk distribution across the MSME portfolio</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard title="Total Businesses" value={data.total} icon={Users} color="blue" />
        <KpiCard title="Avg Score" value={data.average_score} icon={TrendingUp} color="slate" />
        <KpiCard title="LOW" value={data.LOW} icon={CheckCircle2} color="emerald" />
        <KpiCard title="HIGH" value={data.HIGH} icon={AlertTriangle} color="red" />
        <KpiCard title="Approval Rate" value={`${data.approval_rate}%`} icon={CheckCircle2} color="emerald" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Sector</label>
          <select className={selectClass} value={filters.sector} onChange={(e) => setFilters({ ...filters, sector: e.target.value })}>
            <option value="all">All</option>
            {(data.available_sectors || []).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Region</label>
          <select className={selectClass} value={filters.region} onChange={(e) => setFilters({ ...filters, region: e.target.value })}>
            <option value="all">All</option>
            {(data.available_regions || []).map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Business Size</label>
          <select className={selectClass} value={filters.size} onChange={(e) => setFilters({ ...filters, size: e.target.value })}>
            <option value="all">All</option>
            {(data.available_sizes || []).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">X Axis</label>
          <select className={selectClass} value={filters.x} onChange={(e) => setFilters({ ...filters, x: e.target.value })}>
            {(data.x_options || ["income"]).map((o) => <option key={o} value={o}>{o.replace(/_/g, " ")}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Y Axis</label>
          <select className={selectClass} value={filters.y} onChange={(e) => setFilters({ ...filters, y: e.target.value })}>
            {(data.y_options || ["risk_score"]).map((o) => <option key={o} value={o}>{o.replace(/_/g, " ")}</option>)}
          </select>
        </div>
      </div>

      {/* Scatter Plot */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-600 mb-4">
          {filters.x.replace(/_/g, " ")} vs {filters.y.replace(/_/g, " ")}
        </h3>
        {scatterData.length === 0 ? (
          <p className="text-center text-slate-400 py-12">No data for the selected filters.</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                type="number"
                dataKey="x"
                name={filters.x}
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickFormatter={(v) => v >= 100000 ? `${(v / 100000).toFixed(0)}L` : v.toFixed(0)}
              />
              <YAxis
                type="number"
                dataKey="y"
                name={filters.y}
                tick={{ fontSize: 11, fill: "#64748b" }}
              />
              <ZAxis range={[60, 60]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
                formatter={(value, name) => {
                  if (name === filters.x || name === filters.y) {
                    return [Number(value).toLocaleString("en-IN"), name];
                  }
                  return [value, name];
                }}
                labelFormatter={(_, payload) => {
                  if (payload && payload[0]?.payload) {
                    return payload[0].payload.business;
                  }
                  return "";
                }}
              />
              <Legend />
              {["LOW", "MEDIUM", "HIGH"].map((label) => (
                <Scatter
                  key={label}
                  name={label}
                  data={scatterData.filter((d) => d.label === label)}
                  fill={RISK_COLORS[label]}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Risk Distribution Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["LOW", "MEDIUM", "HIGH"].map((label) => {
          const count = label === "LOW" ? data.LOW : label === "MEDIUM" ? data.MEDIUM : data.HIGH;
          const pct = data.total > 0 ? ((count / data.total) * 100).toFixed(1) : 0;
          return (
            <div key={label} className="bg-white rounded-xl border border-slate-200 p-5 card-hover">
              <div className="flex items-center justify-between">
                <RiskBadge label={label} />
                <span className="text-2xl font-bold text-slate-800">{count}</span>
              </div>
              <div className="mt-3 w-full bg-slate-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: RISK_COLORS[label] }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">{pct}% of portfolio</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
