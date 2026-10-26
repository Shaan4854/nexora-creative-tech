"use client";

import React, { useState } from "react";
import { useSound } from "@/components/audio/SoundSynthesizer";
import confetti from "canvas-confetti";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Terminal,
  Clock,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

interface ContactSectionProps {
  initialService?: string;
  initialProjectName?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService,
  initialProjectName,
}) => {
  const { playClick, playHover, playTone } = useSound();

  const [services, setServices] = useState<string[]>(
    initialService ? [initialService] : ["Real-Time 3D & Spatial Web"]
  );
  const [budgetTier, setBudgetTier] = useState<string>("$25K – $50K (Comprehensive Site)");
  const [timeline, setTimeline] = useState<string>("4 – 6 Weeks");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");
  const [brief, setBrief] = useState<string>(
    initialProjectName
      ? `We would like to commission an experience inspired by the architecture of ${initialProjectName}...`
      : ""
  );

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [receiptNumber, setReceiptNumber] = useState<string>("");

  const availableServices = [
    "Real-Time 3D & Spatial Web",
    "Cinematic Motion & Narrative",
    "Generative Systems & Latent UI",
    "Architectural Web Engineering",
    "Physical & Spatial Computing",
  ];

  const budgetOptions = [
    { label: "$15K – $25K", desc: "Hero Centerpiece / Focused Experience", time: "3 – 4 Weeks" },
    { label: "$25K – $50K", desc: "Comprehensive Atelier Site & 3D", time: "5 – 7 Weeks" },
    { label: "$50K+", desc: "Enterprise Spatial Engine & Custom Shaders", time: "8 – 12 Weeks" },
  ];

  const toggleService = (srv: string) => {
    playClick();
    setServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleBudgetSelect = (tier: string, timeEst: string) => {
    playClick();
    setBudgetTier(tier);
    setTimeline(timeEst);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please specify your name or alias.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please provide a valid direct communication address.");
      return;
    }
    if (services.length === 0) {
      setErrorMsg("Please select at least one required capability.");
      return;
    }

    setSubmitting(true);

    // Realistic submission simulation
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      const randomReceipt = `NX-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
      setReceiptNumber(randomReceipt);

      playTone(880, "sine", 0.15);
      setTimeout(() => playTone(1320, "triangle", 0.25), 120);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00F0FF", "#8B5CF6", "#00FF88"],
        });
      } catch {
        // gracefully ignore
      }
    }, 800);
  };

  const resetForm = () => {
    playClick();
    setSubmitted(false);
    setName("");
    setEmail("");
    setOrganization("");
    setBrief("");
  };

  return (
    <section id="contact" className="py-24 bg-obsidian border-t border-borderDim relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-borderDim pb-6 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-beam-cyan tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-beam-cyan" />
            <span>05 // INITIATE COMMISSION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            COMMISSION AN ATELIER EXPERIENCE
          </h2>
          <p className="max-w-2xl text-sm text-text-muted">
            Tell us about your architectural vision. We review every brief within 24 hours and
            provide an honest technical feasibility assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Coordinates & Studio Readiness */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 rounded-2xl bg-surface/50 border border-borderDim space-y-4">
              <div className="font-mono text-xs text-beam-cyan font-bold tracking-widest uppercase">
                STUDIO TELEMETRY &amp; AVAILABILITY
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-borderDim/50">
                  <span className="text-text-dim">NEXT COMMISSION SLOT:</span>
                  <span className="text-beam-laser font-bold">Q1 2026 ACTIVE</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-borderDim/50">
                  <span className="text-text-dim">PRIMARY NODES:</span>
                  <span className="text-white">BERLIN (CET) // TOKYO (JST)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-borderDim/50">
                  <span className="text-text-dim">DIRECT INQUIRIES:</span>
                  <span className="text-beam-cyan">COMMISSION@NEXORA.ATELIER</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-dim">ENCRYPTION:</span>
                  <span className="text-text-muted">ED25519 VERIFIED</span>
                </div>
              </div>
            </div>

            {/* Estimated Scope Telemetry */}
            <div className="p-6 rounded-2xl bg-surface/30 border border-borderDim space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-text-dim">
                <Clock className="w-4 h-4 text-beam-violet" />
                <span>DYNAMIC SCOPE ESTIMATOR</span>
              </div>
              <div className="font-mono text-xs text-text-muted">
                SELECTED BUDGET: <span className="text-white font-bold">{budgetTier}</span>
              </div>
              <div className="font-mono text-xs text-text-muted">
                ESTIMATED SPRINT: <span className="text-beam-cyan font-bold">{timeline}</span>
              </div>
              <div className="font-mono text-[11px] text-text-dim pt-2 border-t border-borderDim/50">
                * Timelines include optical shader tuning, performance verification, and accessibility audits.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-2xl bg-surface/60 border border-borderGlow/60 space-y-6 shadow-2xl"
              >
                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* 1. Required Disciplines */}
                <div className="space-y-2">
                  <label className="block font-mono text-xs text-text-dim tracking-wider uppercase">
                    1. SELECT REQUIRED CAPABILITIES *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableServices.map((srv, i) => {
                      const isSelected = services.includes(srv);
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => toggleService(srv)}
                          onMouseEnter={playHover}
                          className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                            isSelected
                              ? "bg-beam-cyan text-void font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                              : "bg-obsidian border border-borderDim text-text-muted hover:text-white"
                          }`}
                        >
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Budget Tier Selector */}
                <div className="space-y-2">
                  <label className="block font-mono text-xs text-text-dim tracking-wider uppercase">
                    2. ESTIMATED CAPITAL ALLOCATION *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {budgetOptions.map((opt, i) => {
                      const isSelected = budgetTier.includes(opt.label);
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleBudgetSelect(opt.label, opt.time)}
                          onMouseEnter={playHover}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "bg-obsidian border-beam-violet shadow-lg shadow-beam-violet/10 text-white"
                              : "bg-obsidian/40 border-borderDim text-text-dim hover:text-text-muted"
                          }`}
                        >
                          <div className="font-mono text-xs font-bold text-white mb-0.5">
                            {opt.label}
                          </div>
                          <div className="text-[10px] text-text-dim leading-tight">
                            {opt.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiry-name"
                      className="block font-mono text-xs text-text-dim tracking-wider uppercase"
                    >
                      YOUR NAME / ALIAS *
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-borderDim text-white font-mono text-xs focus:outline-none focus:border-beam-cyan transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiry-email"
                      className="block font-mono text-xs text-text-dim tracking-wider uppercase"
                    >
                      COMMUNICATION ENDPOINT *
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. elena@visionary-ai.io"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-borderDim text-white font-mono text-xs focus:outline-none focus:border-beam-cyan transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Organization */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="inquiry-org"
                    className="block font-mono text-xs text-text-dim tracking-wider uppercase"
                  >
                    ORGANIZATION / LAB / BRAND
                  </label>
                  <input
                    id="inquiry-org"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Quantum Spatial Systems Ltd."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-borderDim text-white font-mono text-xs focus:outline-none focus:border-beam-cyan transition-colors"
                  />
                </div>

                {/* Project Brief */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="inquiry-brief"
                    className="block font-mono text-xs text-text-dim tracking-wider uppercase"
                  >
                    PROJECT THESIS &amp; DELIVERABLE OBJECTIVES
                  </label>
                  <textarea
                    id="inquiry-brief"
                    rows={4}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="Describe your target audience, required 3D/motion fidelity, or specific visual benchmarks..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-borderDim text-white font-mono text-xs focus:outline-none focus:border-beam-cyan transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={submitting}
                  onMouseEnter={playHover}
                  className="w-full py-3.5 rounded-xl bg-beam-cyan text-void font-mono font-bold text-xs tracking-widest uppercase hover:shadow-glowCyan hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-void border-t-transparent rounded-full animate-spin" />
                      <span>DISPATCHING TELEMETRY...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>TRANSMIT COMMISSION BRIEF</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Submission Success Receipt */
              <div className="p-8 rounded-2xl bg-surface/80 border border-beam-cyan/50 space-y-6 text-center animate-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-beam-cyan/20 border border-beam-cyan mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-beam-cyan" />
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-xs text-beam-cyan font-semibold tracking-wider">
                    TRANSMISSION LOGGED // {receiptNumber}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    COMMISSION DOSSIER RECEIVED
                  </h3>
                  <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{name}</span>. Our
                    architectural leads will review your brief against our current GPU and engineering
                    pipeline. Expect a tailored proposal within 24 hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-obsidian/70 border border-borderDim text-left font-mono text-xs space-y-1.5 max-w-md mx-auto text-text-dim">
                  <div>
                    CLIENT: <span className="text-white">{organization || name}</span>
                  </div>
                  <div>
                    DESTINATION: <span className="text-white">{email}</span>
                  </div>
                  <div>
                    SCOPE: <span className="text-beam-cyan">{services.join(", ")}</span>
                  </div>
                  <div>
                    ESTIMATE: <span className="text-white">{budgetTier}</span>
                  </div>
                </div>

                <button
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 font-mono text-xs text-text-dim hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>MODIFY OR SEND ANOTHER INQUIRY</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
