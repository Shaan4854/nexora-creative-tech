"use client";

import React, { useEffect, useRef } from "react";
import { Project } from "@/types";
import { useSound } from "@/components/audio/SoundSynthesizer";
import { X, ExternalLink, Cpu, ShieldCheck, CheckCircle2, Copy, Check } from "lucide-react";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onInitiateInquiry: (projectName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onInitiateInquiry,
}) => {
  const { playClick, playHover, playTone } = useSound();
  const [copied, setCopied] = React.useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Mini generative visual for the project blueprint preview
  useEffect(() => {
    if (!project || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      t += 0.02;

      ctx.fillStyle = "rgba(10, 13, 20, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw mathematical geometry based on visualType
      ctx.save();
      ctx.translate(cx, cy);

      if (project.visualType === "particle-mesh") {
        for (let i = 0; i < 60; i++) {
          const angle = (i / 60) * Math.PI * 2 + t * 0.5;
          const r = 80 + Math.sin(t * 3 + i * 0.2) * 30;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;

          ctx.fillStyle = project.accentColor;
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fill();

          if (i % 3 === 0) {
            ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        }
      } else if (project.visualType === "tesseract") {
        ctx.strokeStyle = project.accentColor;
        ctx.lineWidth = 1.5;
        for (let s = 1; s <= 4; s++) {
          const size = s * 30 + Math.sin(t * 2 + s) * 10;
          ctx.rotate(t * 0.1);
          ctx.strokeRect(-size / 2, -size / 2, size, size);
        }
      } else {
        // Frequency / tunnel lines
        for (let j = 0; j < 30; j++) {
          const rad = (j * 7 + t * 40) % 180;
          ctx.strokeStyle = j % 2 === 0 ? project.accentColor : project.accentSecondary;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, rad, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [project]);

  if (!project) return null;

  const handleCopySpec = () => {
    playClick();
    navigator.clipboard.writeText(
      `NEXORA BLUEPRINT: ${project.title}\nCategory: ${project.categoryLabel}\nTech: ${project.techStack.join(", ")}`
    );
    setCopied(true);
    playTone(1046, "sine", 0.1);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-void/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-obsidian border border-borderGlow/60 shadow-2xl shadow-beam-cyan/10 p-6 md:p-8 text-white space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar with HUD Metadata & Close Button */}
        <div className="flex items-center justify-between border-b border-borderDim pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-beam-cyan animate-pulse" />
            <span className="font-mono text-xs text-text-dim tracking-widest">
              PROJECT BLUEPRINT // {project.slug.toUpperCase()}
            </span>
          </div>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            onMouseEnter={playHover}
            aria-label="Close modal"
            className="p-2 rounded-lg border border-borderDim text-text-muted hover:text-white hover:border-beam-cyan/60 bg-surface/80 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header Hero */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-surface border border-borderDim font-mono text-[11px] text-beam-cyan tracking-wider">
                {project.categoryLabel}
              </span>
              <span className="font-mono text-[11px] text-text-dim">
                RELEASE YEAR {project.year}
              </span>
            </div>

            <h2 id="modal-title" className="text-2xl md:text-4xl font-display font-bold tracking-tight text-white">
              {project.title}
            </h2>

            <p className="text-sm md:text-base text-text-muted leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Interactive Simulation Preview Canvas */}
          <div className="md:col-span-5 relative h-48 md:h-56 rounded-xl border border-borderDim bg-surface/50 overflow-hidden flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={340}
              height={220}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-void/80 border border-borderDim font-mono text-[9px] text-text-dim">
              SIMULATION ENGINE // LIVE
            </div>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-3 gap-3">
          {project.metrics.map((m, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-surface/40 border border-borderDim space-y-1"
            >
              <div className="font-mono text-[11px] text-text-dim uppercase tracking-wider">
                {m.label}
              </div>
              <div className="text-base md:text-xl font-bold font-mono text-beam-cyan">
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Architecture & Challenge Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 p-4 rounded-xl bg-surface/20 border border-borderDim">
            <div className="flex items-center gap-2 font-mono text-xs text-beam-violet font-semibold tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>THE ARCHITECTURAL CHALLENGE</span>
            </div>
            <p className="text-xs md:text-sm text-text-muted leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-surface/20 border border-borderDim">
            <div className="flex items-center gap-2 font-mono text-xs text-beam-laser font-semibold tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>THE ENGINEERING OUTCOME</span>
            </div>
            <p className="text-xs md:text-sm text-text-muted leading-relaxed">
              {project.outcome}
            </p>
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div className="space-y-3">
          <div className="font-mono text-xs text-text-dim tracking-widest uppercase">
            VERIFIED DELIVERABLES & SHIPMENTS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.deliverables.map((d, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-surface/30 border border-borderDim text-xs text-text-muted"
              >
                <CheckCircle2 className="w-4 h-4 text-beam-cyan shrink-0" />
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-2">
          <div className="font-mono text-xs text-text-dim tracking-widest uppercase">
            TECHNOLOGY STACK
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md bg-void border border-borderDim font-mono text-xs text-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-borderDim">
          <button
            onClick={handleCopySpec}
            onMouseEnter={playHover}
            className="flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-beam-laser" />
                <span className="text-beam-laser">COPIED TO CLIPBOARD</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>EXPORT SPECIFICATION</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              playClick();
              onInitiateInquiry(project.title);
              onClose();
            }}
            onMouseEnter={playHover}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-beam-cyan text-void font-bold font-mono text-xs tracking-wider hover:shadow-glowCyan hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <span>COMMISSION SIMILAR ARCHITECTURE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
