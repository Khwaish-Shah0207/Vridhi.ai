"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { TrendingUp, Menu, X, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Platform", href: "#platform" },
    { label: "Solutions", href: "#solutions" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "For Lenders", href: "#for-lenders" },
    { label: "For MSMEs", href: "#for-msmes" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090b]/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#00d2ff] via-[#3D81E3] to-[#2563eb] flex items-center justify-center shadow-lg shadow-cyan-500/25 ring-1 ring-white/20 transition-transform group-hover:scale-105">
            <TrendingUp className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-black tracking-wider text-white text-lg font-mono">VRIDHI</span>
            <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,210,255,0.3)]">
              .AI
            </span>
          </div>
        </Link>

        {/* Center Nav Anchors (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full liquid-glass border border-white/[0.08]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth"
            className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/auth"
            className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-[#00d2ff] via-[#3D81E3] to-[#2563eb] rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:brightness-110 active:scale-95 transition-all"
          >
            <span>Get Started</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0c0c0e]/95 backdrop-blur-2xl border-b border-white/[0.08] px-6 py-5 space-y-4"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm text-zinc-300 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
              <Link
                href="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-white/[0.04] text-xs font-semibold text-white border border-white/[0.08]"
              >
                Log in
              </Link>
              <Link
                href="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#3D81E3] text-xs font-extrabold text-black uppercase tracking-wider shadow-lg shadow-cyan-500/25"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

