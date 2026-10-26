"use client";

import React from "react";
import { Hero3DCanvas } from "@/components/canvas/Hero3DCanvas";
import { useSound } from "@/components/audio/SoundSynthesizer";
import { ArrowDown, CornerDownRight, Sparkles, Terminal } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { playClick, playHover } = useSound();

  const scrollTo = (id: string) => {
    playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-12 flex flex-col justify-between overflow-hidden bg-void"
    >
      {/* Background Architectural Grid & Hairlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#1F2639_1px,transparent_1px),linear-gradient(to_bottom,#1F2639_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Top Coordinate & Category Tagline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-borderDim/70 pb-3 font-mono text-xs text-text-dim">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-beam-cyan rounded-none" />
            <span className="text-text-muted">NEXORA_STUDIO // R&D_SYSTEM_V4.2</span>
          </div>
          <div className="flex items-center gap-4">
            <span>COORDINATES: 52.5200° N, 13.4050° E</span>
            <span className="hidden md:inline">SYSTEM: LATENT_SPATIAL</span>
          </div>
        </div>

        {/* Hero Typography */}
        <div className="pt-8 pb-4 text-center max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-borderDim font-mono text-[11px] text-beam-cyan tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-beam-cyan" />
            <span>CREATIVE TECHNOLOGY & INTERACTIVE 3D ATELIER</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-black tracking-tighter text-white leading-[0.95]">
            ARCHITECTS OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-beam-cyan to-beam-violet">
              POST-DIGITAL
            </span>{" "}
            DIMENSIONS.
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-text-muted leading-relaxed font-sans pt-2">
            We engineer high-performance WebGL/WebGPU centerpieces, spatial interfaces, and
            computational systems for visionary brands that refuse to blend into template mediocrity.
          </p>
        </div>
      </div>

      {/* 3D Interactive Centerpiece */}
      <div className="relative max-w-6xl mx-auto w-full px-4 my-2 z-10">
        <Hero3DCanvas />
      </div>

      {/* Bottom Action Bar & Navigation Indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-borderDim/70 pt-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollTo("projects")}
              onMouseEnter={playHover}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-beam-cyan text-void font-mono font-bold text-xs tracking-wider shadow-glowCyan hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>EXPLORE ARCHIVE</span>
              <CornerDownRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => scrollTo("lab")}
              onMouseEnter={playHover}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface border border-borderDim hover:border-beam-violet/60 font-mono text-xs tracking-wider text-white hover:text-beam-violet transition-all"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>TEST LAB</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="hidden lg:flex items-center gap-8 font-mono text-xs text-text-dim">
            <div>
              <span className="text-white font-bold">100%</span> CUSTOM SHADERS
            </div>
            <div>
              <span className="text-beam-cyan font-bold">&lt; 16ms</span> FRAME BUDGET
            </div>
            <div>
              <span className="text-beam-laser font-bold">A++</span> ACCESSIBILITY
            </div>
          </div>

          {/* Scroll Cue */}
          <button
            onClick={() => scrollTo("projects")}
            onMouseEnter={playHover}
            className="flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors group"
          >
            <span className="tracking-widest">SCROLL TO UNPACK</span>
            <div className="p-1 rounded-full border border-borderDim group-hover:border-beam-cyan">
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
