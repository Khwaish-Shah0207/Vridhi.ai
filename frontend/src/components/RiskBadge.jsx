"use client";

import { getRiskBg } from "../lib/utils";

export default function RiskBadge({ label, size = "md" }) {
  const sizeClass = size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-3 py-1";
  return (
    <span className={`inline-flex items-center rounded-full border font-semibold tracking-wide ${getRiskBg(label)} ${sizeClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {label}
    </span>
  );
}
