"use client";

import React, { useState } from "react";
import { METHODOLOGY_PHASES, STUDIO_MANIFESTO } from "@/data/philosophy";
import { useSound } from "@/components/audio/SoundSynthesizer";
import { CheckCircle2, ChevronRight, Clock, Milestone, ShieldCheck } from "lucide-react";

export const ProcessSection: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const { playClick, playHover } = useSound();

  const activePhase = METHODOLOGY_PHASES[activePhaseIndex];

  return (
    <section id="process" className="py-24 bg-void border-t border-borderDim relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="border-b border-borderDim pb-6 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-beam-cyan tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-beam-cyan" />
            <span>04 // METHODOLOGY &amp; PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            DIMENSIONAL ENGINEERING
          </h2>
          <p className="max-w-2xl text-sm text-text-muted">
            How we translate ambitious creative concepts into rock-solid, production-ready web
            installations without deviation or compromise.
          </p>
        </div>

        {/* Studio Manifesto Callout */}
        <div className="rounded-2xl bg-obsidian border border-borderGlow/60 p-8 sm:p-12 relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-beam-cyan/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-4xl">
            <div className="font-mono text-xs text-beam-cyan font-bold tracking-widest uppercase">
              {STUDIO_MANIFESTO.headline}
            </div>
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white leading-relaxed">
              &ldquo;{STUDIO_MANIFESTO.quote}&rdquo;
            </blockquote>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-borderDim/60">
            {STUDIO_MANIFESTO.tenets.map((tenet, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="font-mono text-xs text-beam-violet font-bold tracking-wider">
                  0{idx + 1} // {tenet.title}
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {tenet.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Phase Timeline Scrubber & Inspector */}
        <div className="space-y-8">
          {/* Phase Step Selectors */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {METHODOLOGY_PHASES.map((p, idx) => {
              const isActive = idx === activePhaseIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    playClick();
                    setActivePhaseIndex(idx);
                  }}
                  onMouseEnter={playHover}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 select-none ${
                    isActive
                      ? "bg-surface border-beam-cyan shadow-lg shadow-beam-cyan/5"
                      : "bg-obsidian border-borderDim hover:border-borderGlow text-text-muted"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-2">
                    <span className={isActive ? "text-beam-cyan font-bold" : "text-text-dim"}>
                      {p.phase}
                    </span>
                    <span className="text-[10px] text-text-dim">{p.duration}</span>
                  </div>
                  <div
                    className={`font-display font-bold text-sm sm:text-base leading-snug ${
                      isActive ? "text-white" : "text-text-muted"
                    }`}
                  >
                    {p.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Phase Inspection Box */}
          <div className="rounded-2xl bg-surface/50 border border-borderDim p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-borderDim pb-4">
              <div className="space-y-1">
                <div className="font-mono text-xs text-beam-cyan font-semibold">
                  {activePhase.phase} // DEEP PROTOCOL
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  {activePhase.title}
                </h3>
                <div className="text-xs font-mono text-beam-violet">
                  {activePhase.subtitle}
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs text-text-dim">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-void border border-borderDim">
                  <Clock className="w-3.5 h-3.5 text-beam-cyan" />
                  <span>{activePhase.duration}</span>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              {activePhase.description}
            </p>

            {/* Deliverables List */}
            <div className="space-y-3 pt-2">
              <div className="font-mono text-xs text-text-dim tracking-wider uppercase">
                PHASE ARTIFACTS &amp; DELIVERABLES
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePhase.deliverables.map((d, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-obsidian border border-borderDim text-xs text-text-muted"
                  >
                    <CheckCircle2 className="w-4 h-4 text-beam-cyan shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Milestone Tag */}
            <div className="pt-2 flex items-center gap-2 font-mono text-xs text-text-dim border-t border-borderDim">
              <Milestone className="w-4 h-4 text-beam-laser" />
              <span>KEY SIGN-OFF GATE:</span>
              <span className="text-white font-bold">{activePhase.keyMilestone}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
