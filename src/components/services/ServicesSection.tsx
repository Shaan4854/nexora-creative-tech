"use client";

import React, { useState } from "react";
import { SERVICES } from "@/data/services";
import { useSound } from "@/components/audio/SoundSynthesizer";
import { Check, ChevronRight, Layers, Sparkles, Terminal, Wand2 } from "lucide-react";

export const ServicesSection: React.FC<{
  onSelectService: (serviceTitle: string) => void;
}> = ({ onSelectService }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>("serv-01");
  const { playClick, playHover } = useSound();

  const selectedService =
    SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  return (
    <section id="services" className="py-24 bg-void border-t border-borderDim relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-borderDim pb-6 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-beam-violet tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-beam-violet" />
            <span>02 // CORE DISCIPLINES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            WHAT WE ARCHITECT
          </h2>
          <p className="max-w-2xl text-sm text-text-muted">
            Specialized engineering and art direction designed to dismantle the barrier between
            native software performance and fluid web immersion.
          </p>
        </div>

        {/* Dual Column Layout: Selector on Left, Deep Architectural Spec on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Capability Cards */}
          <div className="lg:col-span-5 space-y-3">
            {SERVICES.map((serv) => {
              const isActive = serv.id === activeServiceId;
              return (
                <div
                  key={serv.id}
                  onClick={() => {
                    playClick();
                    setActiveServiceId(serv.id);
                  }}
                  onMouseEnter={playHover}
                  className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                    isActive
                      ? "bg-surface border-beam-cyan/60 shadow-lg shadow-beam-cyan/5"
                      : "bg-obsidian/60 border-borderDim hover:border-borderGlow text-text-muted hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-2">
                    <span className={isActive ? "text-beam-cyan font-bold" : "text-text-dim"}>
                      {serv.code}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-void border border-borderDim text-text-dim">
                      {serv.metric}
                    </span>
                  </div>

                  <h3
                    className={`text-lg font-display font-bold transition-colors ${
                      isActive ? "text-white" : "text-text-muted"
                    }`}
                  >
                    {serv.title}
                  </h3>

                  <p className="text-xs text-text-dim mt-1 line-clamp-1">{serv.tagline}</p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Discipline Deep Dive */}
          <div className="lg:col-span-7 rounded-2xl bg-obsidian border border-borderGlow/60 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-borderDim pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-beam-cyan animate-pulse" />
                <span className="font-mono text-xs text-beam-cyan font-semibold">
                  DISCIPLINE SPEC // {selectedService.code}
                </span>
              </div>
              <div className="font-mono text-xs text-text-dim">
                STANDARDS: 60FPS // ZERO HYDRATION JITTER
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                {selectedService.title}
              </h3>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                {selectedService.description}
              </p>
            </div>

            {/* Core Capabilities Checklist */}
            <div className="space-y-3 pt-2">
              <div className="font-mono text-xs text-text-dim tracking-wider uppercase">
                ENGINEERING CAPABILITIES &amp; INTEGRATIONS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-surface/50 border border-borderDim text-xs text-text-muted"
                  >
                    <Check className="w-4 h-4 text-beam-cyan shrink-0 mt-0.5" />
                    <span className="leading-snug">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="space-y-2 pt-2">
              <div className="font-mono text-xs text-text-dim tracking-wider uppercase">
                TYPICAL SHIPMENTS
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedService.deliverables.map((del, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-surface border border-borderDim font-mono text-xs text-white"
                  >
                    {del}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Inquire Button */}
            <div className="pt-4 border-t border-borderDim flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="font-mono text-xs text-text-dim">
                TARGET KPI: <span className="text-white font-bold">{selectedService.metric}</span> (
                {selectedService.metricLabel})
              </div>

              <button
                onClick={() => {
                  playClick();
                  onSelectService(selectedService.title);
                }}
                onMouseEnter={playHover}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface hover:bg-beam-cyan hover:text-void text-beam-cyan border border-beam-cyan/50 font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 group"
              >
                <span>REQUEST THIS CAPABILITY</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
