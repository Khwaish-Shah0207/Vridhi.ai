"use client";

import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import ValueProposition from "../components/landing/ValueProposition";
import HowItWorks from "../components/landing/HowItWorks";
import ProductPreview from "../components/landing/ProductPreview";
import RoleSection from "../components/landing/RoleSection";
import FinalCTA from "../components/landing/FinalCTA";
import LandingFooter from "../components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white overflow-x-hidden">
      <LandingNavbar />

      <main>
        <HeroSection />
        <ValueProposition />
        <HowItWorks />
        <ProductPreview />
        <RoleSection />
        <FinalCTA />
      </main>

      <LandingFooter />
    </div>
  );
}