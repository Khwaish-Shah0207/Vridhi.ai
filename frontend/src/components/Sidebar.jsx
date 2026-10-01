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
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/assess", label: "Assessment", icon: FileSearch },
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
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-black/45 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-full px-5 md:px-7 flex items-center justify-between">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,210,255,.12)]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-white tracking-tight leading-none">Vridhi.ai</div>
              <div className="text-[10px] text-white/40 mt-1 uppercase tracking-[.18em]">Credit Intelligence</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all ${
                    active
                      ? "bg-white text-black"
                      : "text-white/55 hover:text-white hover:bg-white/[.06]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 rounded-full border border-white/10 bg-white/[.05] flex items-center justify-center text-white"
            aria-label="Toggle navigation"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[11px] text-white/35">MSME CREDIT RISK</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
          </div>
        </div>
      </header>

      {open && (
        <>
          <div className="lg:hidden fixed inset-0 top-16 z-40 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="lg:hidden fixed top-16 left-0 right-0 z-50 border-b border-white/10 bg-[#0d0e10]/95 backdrop-blur-2xl p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm mb-1 ${
                    active ? "bg-white text-black" : "text-white/65 hover:bg-white/[.06] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3"><Icon className="w-4 h-4" />{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
