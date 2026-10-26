"use client";

import React from "react";
import { InteractiveLabCanvas } from "@/components/canvas/InteractiveLabCanvas";
import { Terminal, Shield, Zap, Sparkles } from "lucide-react";

export const InteractiveLabSection: React.FC = () => {
  return (
    <section id="lab" className="py-24 bg-obsidian border-t border-borderDim relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-borderDim pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-beam-laser tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-beam-laser" />
              <span>03 // THE PROVING GROUND</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              EXPERIMENTAL LAB &amp; BENCHMARKS
            </h2>
            <p className="max-w-2xl text-sm text-text-muted">
              Before deploying techniques into client production, we battle-test shader routines,
              particle physics, and memory garbage collection algorithms here in the browser.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-4 font-mono text-xs text-text-dim">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-beam-laser" />
              <span>0% GPU LEAK</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-beam-cyan" />
              <span>120Hz SUPPORT</span>
            </div>
          </div>
        </div>

        {/* Live Canvas Interactive Proving Ground */}
        <InteractiveLabCanvas />

        {/* Lab Architecture Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-xl bg-surface/40 border border-borderDim space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-beam-cyan font-bold tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>VERLET INTEGRATION</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Calculates velocity from current and previous spatial coordinates without numerical
              drift, producing physical mass behavior with minimal CPU overhead.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface/40 border border-borderDim space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-beam-violet font-bold tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>RADIAL FORCE FIELDS</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Centripetal vortex gravitation and shockwave attenuation simulated across 650 active
              matter nodes in real-time canvas memory buffers.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface/40 border border-borderDim space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-beam-laser font-bold tracking-wider">
              <Zap className="w-4 h-4" />
              <span>GARBAGE COLLECTION DEFENSE</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Particles and vector math reuse pre-allocated TypedArrays to prevent browser V8 engine
              scavenger pauses and frame micro-stutters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
