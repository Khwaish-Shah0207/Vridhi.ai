"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileSearch,
  Users,
  SlidersHorizontal,
  Scale,
  Upload,
  Menu,
  X,
  TrendingUp,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Assessment", icon: FileSearch },
  { href: "/dashboard", label: "Risk Dashboard", icon: LayoutDashboard },
  { href: "/portfolio", label: "Portfolio", icon: Users },
  { href: "/simulator", label: "Simulator", icon: SlidersHorizontal },
  { href: "/fairness", label: "Fairness", icon: Scale },
  { href: "/batch", label: "Batch Scoring", icon: Upload },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-slate-800">Vridhi.ai</span>
        </div>
        <button onClick={() => setOpen(!open)} className="p-1.5 rounded-lg hover:bg-slate-100">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 top-12 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-40 transform transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-slate-800 text-lg leading-tight">Vridhi.ai</div>
            <div className="text-xs text-slate-400">Credit Risk Analytics</div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-base ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
          <div className="text-xs text-slate-400">
            <p className="font-medium text-slate-500">Smart India Hackathon</p>
            <p className="mt-1">PS 12: Predictive Credit Risk Analytics for MSMEs</p>
          </div>
        </div>
      </aside>
    </>
  );
}
