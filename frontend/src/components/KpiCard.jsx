"use client";

export default function KpiCard({ title, value, subtitle, icon: Icon, color = "blue" }) {
  const colorMap = {
    blue: "rgba(0,210,255,.14)",
    emerald: "rgba(52,211,153,.12)",
    amber: "rgba(251,191,36,.12)",
    red: "rgba(251,113,133,.12)",
    slate: "rgba(255,255,255,.08)",
  };

  return (
    <div className="liquid-glass rounded-2xl p-5 vridhi-card-hover">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[.16em]">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-white truncate">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-white/35">{subtitle}</p>}
        </div>
        {Icon && (
          <div
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center shrink-0"
            style={{ background: colorMap[color] }}
          >
            <Icon className="w-5 h-5 text-white/80" />
          </div>
        )}
      </div>
    </div>
  );
}
