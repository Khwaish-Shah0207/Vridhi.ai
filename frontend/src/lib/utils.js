export function formatCurrency(value) {
  if (value === null || value === undefined) return "N/A";
  const num = Number(value);
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
  return `₹${num.toFixed(0)}`;
}

export function formatNumber(value, decimals = 1) {
  if (value === null || value === undefined) return "N/A";
  return Number(value).toFixed(decimals);
}

export function formatPercent(value, decimals = 1) {
  if (value === null || value === undefined) return "N/A";
  return `${Number(value).toFixed(decimals)}%`;
}

export function getRiskColor(label) {
  if (label === "LOW") return "#34d399";
  if (label === "MEDIUM") return "#fbbf24";
  return "#fb7185";
}

export function getRiskBg(label) {
  if (label === "LOW") return "bg-emerald-400/10 text-emerald-300 border-emerald-400/20";
  if (label === "MEDIUM") return "bg-amber-400/10 text-amber-300 border-amber-400/20";
  return "bg-rose-400/10 text-rose-300 border-rose-400/20";
}
