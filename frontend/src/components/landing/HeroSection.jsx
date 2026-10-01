"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const sceneRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event) => {
      const el = sceneRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();

      const x = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height;

      setMouse({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <section className="vridhi-hero relative min-h-[92vh] overflow-hidden flex items-center">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="vridhi-hero-glow vridhi-hero-glow-1" />
        <div className="vridhi-hero-glow vridhi-hero-glow-2" />
        <div className="vridhi-hero-glow vridhi-hero-glow-3" />

        <div className="vridhi-grid" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-20">
        <div className="grid lg:grid-cols-[.9fr_1.1fr] items-center gap-10 lg:gap-4">

          {/* LEFT */}
          <div className="max-w-2xl">
            <div className="vridhi-hero-eyebrow">
              <span className="vridhi-status-dot" />
              AI-NATIVE CREDIT INTELLIGENCE
            </div>

            <h1 className="vridhi-hero-title">
              <span>Credit intelligence</span>
              <br />
              <span className="vridhi-hero-gradient">
                built for growth.
              </span>
            </h1>

            <p className="vridhi-hero-description">
              Vridhi.ai transforms financial and alternative business data
              into explainable credit intelligence for modern MSME lending.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-9">
              <Link
                href="/auth"
                className="vridhi-hero-button-primary"
              >
                Start Assessment
                <span>↗</span>
              </Link>

              <a
                href="#how-it-works"
                className="vridhi-hero-button-secondary"
              >
                Explore Vridhi
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[11px] uppercase tracking-[.18em] text-white/35">
              <span>Explainable AI</span>
              <span>Alternative Data</span>
              <span>Fairness Analytics</span>
            </div>
          </div>

          {/* RIGHT — INTERACTIVE GLOW OBJECT */}
          <div
            ref={sceneRef}
            className="vridhi-hero-visual"
          >
            <div
              className="vridhi-orbital-system"
              style={{
                transform: `
                  perspective(1000px)
                  rotateX(${mouse.y * -8}deg)
                  rotateY(${mouse.x * 10}deg)
                `,
              }}
            >

              {/* Huge atmospheric bloom */}
              <div className="vridhi-bloom" />

              {/* Back ring */}
              <div className="vridhi-ring vridhi-ring-back">
                <div className="vridhi-ring-dot dot-1" />
                <div className="vridhi-ring-dot dot-2" />
              </div>

              {/* Middle ring */}
              <div className="vridhi-ring vridhi-ring-middle">
                <div className="vridhi-ring-dot dot-3" />
                <div className="vridhi-ring-dot dot-4" />
              </div>

              {/* Front ring */}
              <div className="vridhi-ring vridhi-ring-front">
                <div className="vridhi-ring-dot dot-5" />
              </div>

              {/* Central glowing glass core */}
              <div className="vridhi-core">
                <div className="vridhi-core-inner">
                  <div className="vridhi-core-symbol">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="vridhi-core-text">
                    <strong>VRIDHI</strong>
                    <small>AI ENGINE</small>
                  </div>
                </div>
              </div>

              {/* Floating data nodes */}
              <div className="vridhi-node node-a">
                <span className="node-pulse" />
                <small>RISK</small>
              </div>

              <div className="vridhi-node node-b">
                <span className="node-pulse" />
                <small>DATA</small>
              </div>

              <div className="vridhi-node node-c">
                <span className="node-pulse" />
                <small>AI</small>
              </div>

              {/* Floating abstract shapes */}
              <div className="vridhi-shape shape-cross">
                <span />
                <span />
              </div>

              <div className="vridhi-shape shape-diamond">
                <span />
              </div>

              <div className="vridhi-shape shape-chevron">
                <span />
                <span />
              </div>

              <div className="vridhi-shape shape-orbit">
                <span />
              </div>

              {/* Tiny particles */}
              <div className="vridhi-particle p1" />
              <div className="vridhi-particle p2" />
              <div className="vridhi-particle p3" />
              <div className="vridhi-particle p4" />
              <div className="vridhi-particle p5" />
              <div className="vridhi-particle p6" />
            </div>

            <div className="vridhi-visual-caption">
              <span>01</span>
              <div />
              <span>INTELLIGENCE CORE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0c0c0c] to-transparent pointer-events-none" />
    </section>
  );
}