"use client";

export default function KpiCard({ title, value, subtitle, icon: Icon, color = "blue" }) {
  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    emerald: "from-emerald-500 to-emerald-600",
    amber: "from-amber-500 to-amber-600",
    red: "from-red-500 to-red-600",
    slate: "from-slate-600 to-slate-700",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap[color]} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
