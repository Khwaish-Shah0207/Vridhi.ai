"use client";

import { getRiskBg } from "../lib/utils";

export default function RiskBadge({ label, size = "md" }) {
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";
  return (
    <span className={`inline-flex items-center rounded-full border font-semibold ${getRiskBg(label)} ${sizeClass}`}>
      {label}
    </span>
  );
}
