"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Briefcase,
  CheckCircle2,
  Sparkles,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, login } = useAuth();

  const roleParam = searchParams.get("role");
  const initialRole = roleParam === "borrower" 
    ? "MSME Borrower" 
    : roleParam === "lender" 
    ? "Lending Officer" 
    : "MSME Borrower";

  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (roleParam === "borrower") setSelectedRole("MSME Borrower");
    if (roleParam === "lender") setSelectedRole("Lending Officer");
  }, [roleParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(selectedRole, {
        name: formData.name || (selectedRole === "MSME Borrower" ? "MSME Enterprise Owner" : "Senior Credit Underwriter"),
        email: formData.email || (selectedRole === "MSME Borrower" ? "borrower@msme-vridhi.ai" : "officer@bank-vridhi.ai"),
        organization: formData.organization || (selectedRole === "MSME Borrower" ? "Apex Precision Engineering" : "Apex Industrial Credit Bank"),
      });
      setIsLoading(false);
      router.push("/assess");
    }, 450);
  };

  const handleQuickDemo = (role) => {
    setSelectedRole(role);
    setIsLoading(true);
    setTimeout(() => {
      login(role, {
        name: role === "MSME Borrower" ? "MSME Enterprise Owner" : "Senior Credit Underwriter",
        email: role === "MSME Borrower" ? "borrower@msme-vridhi.ai" : "officer@bank-vridhi.ai",
        organization: role === "MSME Borrower" ? "Apex Precision Engineering" : "Apex Industrial Credit Bank",
      });
      setIsLoading(false);
      router.push("/assess");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white flex flex-col selection:bg-cyan-500/30 selection:text-white font-sans relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-cyan-500/[0.08] via-blue-600/[0.05] to-transparent rounded-full blur-[140px]" />
      </div>

      {/* Top minimal header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.2)]">
            <TrendingUp className="w-4 h-4 text-black" />
          </div>
          <div>
            <span className="text-base font-bold text-white tracking-tight">Vridhi.ai</span>
            <span className="block text-[9px] uppercase tracking-[0.2em] text-cyan-400 font-medium">Credit Intelligence</span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02]"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Authentication container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 text-xs font-medium mb-3">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Identity & Role Gateway</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {mode === "login" ? "Sign in to Vridhi.ai" : "Create your account"}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-white/50">
                Select your designated role to enter the credit intelligence platform
              </p>
            </div>

            {/* Role Selection Tabs */}
            <div className="mb-7">
              <div className="text-[11px] font-semibold text-white/60 uppercase tracking-wider mb-2.5">
                Select User Role
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Role 1: MSME Borrower */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("MSME Borrower")}
                  className={`text-left p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                    selectedRole === "MSME Borrower"
                      ? "border-cyan-400/60 bg-gradient-to-b from-cyan-500/10 to-transparent shadow-[0_0_24px_rgba(0,210,255,0.15)]"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                      <Building2 className="w-4 h-4" />
                    </div>
                    {selectedRole === "MSME Borrower" && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                      MSME Borrower
                    </div>
                    <div className="text-[11px] text-white/50 mt-1 leading-snug">
                      Business owner assessing credit health & loan readiness.
                    </div>
                  </div>
                </button>

                {/* Role 2: Lending Officer */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("Lending Officer")}
                  className={`text-left p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                    selectedRole === "Lending Officer"
                      ? "border-cyan-400/60 bg-gradient-to-b from-cyan-500/10 to-transparent shadow-[0_0_24px_rgba(0,210,255,0.15)]"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-blue-300">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    {selectedRole === "Lending Officer" && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                      Lending Officer
                    </div>
                    <div className="text-[11px] text-white/50 mt-1 leading-snug">
                      Bank/NBFC underwriter evaluating credit risk & limits.
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Mode Switcher (Login vs Sign Up) */}
            <div className="flex rounded-xl bg-white/[0.03] border border-white/10 p-1 mb-6">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                  mode === "login"
                    ? "bg-white text-black shadow"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                  mode === "signup"
                    ? "bg-white text-black shadow"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-[11px] font-medium text-white/70 uppercase tracking-wider mb-1.5">
                    {selectedRole === "MSME Borrower" ? "Enterprise / Owner Name" : "Officer Full Name"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={selectedRole === "MSME Borrower" ? "e.g. Apex Precision Engineering" : "e.g. Rahul Sharma"}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/80 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-medium text-white/70 uppercase tracking-wider mb-1.5">
                  Work / Professional Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={selectedRole === "MSME Borrower" ? "contact@apexengineering.in" : "underwriter@apexbank.in"}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/80 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-medium text-white/70 uppercase tracking-wider">
                    Password
                  </label>
                  {mode === "login" && (
                    <span className="text-[11px] text-cyan-400 hover:text-cyan-300 cursor-pointer">
                      Forgot password?
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/80 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-white hover:bg-white/90 text-black font-semibold text-sm transition-all shadow-[0_0_24px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating {selectedRole}...</span>
                  </span>
                ) : (
                  <>
                    <span>{mode === "login" ? `Enter as ${selectedRole}` : `Create ${selectedRole} Account`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Access Bar */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-[11px] text-center text-white/40 mb-3 uppercase tracking-wider font-medium">
                Instant Sandbox Demo Access
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo("MSME Borrower")}
                  className="px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-medium text-white/70 hover:text-white transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Borrower Demo</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("Lending Officer")}
                  className="px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-medium text-white/70 hover:text-white transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Lender Demo</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center text-white text-sm">
        Loading Authentication Gateway...
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}

