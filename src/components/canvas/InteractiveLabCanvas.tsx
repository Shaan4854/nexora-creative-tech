"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSound } from "@/components/audio/SoundSynthesizer";
import { RefreshCw, Compass, Zap, Flame } from "lucide-react";

type SimMode = "attract" | "repel" | "wave";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  color: string;
  size: number;
}

export const InteractiveLabCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { playHover, playClick, playTone } = useSound();

  const [mode, setMode] = useState<SimMode>("attract");
  const [particleDensity, setParticleDensity] = useState(650);

  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isDown: false, radius: 180 });
  const shockwavesRef = useRef<{ x: number; y: number; r: number; maxR: number; alpha: number }[]>([]);
  const animIdRef = useRef<number | null>(null);

  const colors = ["#00F0FF", "#8B5CF6", "#00FF88", "#FFFFFF"];

  const initParticles = (width: number, height: number) => {
    const list: Particle[] = [];
    for (let i = 0; i < particleDensity; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      list.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        baseX: x,
        baseY: y,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1,
      });
    }
    particlesRef.current = list;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = w * Math.min(window.devicePixelRatio, 2);
      canvas.height = h * Math.min(window.devicePixelRatio, 2);
      ctx.scale(Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2));
      initParticles(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const onPointerLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Trigger shockwave
      shockwavesRef.current.push({ x, y, r: 0, maxR: 260, alpha: 1.0 });
      playTone(520, "sine", 0.1);
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);

    let time = 0;

    const render = () => {
      animIdRef.current = requestAnimationFrame(render);
      time += 0.02;

      const w = container.clientWidth;
      const h = container.clientHeight;

      // Subtle persistence trail for fluid motion
      ctx.fillStyle = "rgba(5, 6, 8, 0.25)";
      ctx.fillRect(0, 0, w, h);

      const mouse = mouseRef.current;
      const shockwaves = shockwavesRef.current;

      // Update and draw shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.r += 6;
        sw.alpha = 1.0 - sw.r / sw.maxR;

        if (sw.r >= sw.maxR) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(0, 240, 255, ${sw.alpha * 0.8})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Update and draw particles
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interaction with mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 1) {
          const force = (1 - dist / mouse.radius) * 1.5;
          const angle = Math.atan2(dy, dx);

          if (mode === "attract") {
            // Spiral vortex attraction
            p.vx += Math.cos(angle + Math.PI / 3) * force * 0.8;
            p.vy += Math.sin(angle + Math.PI / 3) * force * 0.8;
          } else if (mode === "repel") {
            // Explosive deflection
            p.vx -= Math.cos(angle) * force * 2.2;
            p.vy -= Math.sin(angle) * force * 2.2;
          } else if (mode === "wave") {
            // Harmonic wave oscillation
            p.vy += Math.sin(time * 3 + p.x * 0.02) * 0.6;
          }
        }

        // Interaction with active shockwaves
        for (let j = 0; j < shockwaves.length; j++) {
          const sw = shockwaves[j];
          const sdx = p.x - sw.x;
          const sdy = p.y - sw.y;
          const sdist = Math.sqrt(sdx * sdx + sdy * sdy);
          if (Math.abs(sdist - sw.r) < 25) {
            const blast = (1 - Math.abs(sdist - sw.r) / 25) * 4;
            const sAngle = Math.atan2(sdy, sdx);
            p.vx += Math.cos(sAngle) * blast;
            p.vy += Math.sin(sAngle) * blast;
          }
        }

        // Apply friction & boundary wrap
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Render particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles with subtle laser lines
        for (let k = i + 1; k < Math.min(i + 8, particles.length); k++) {
          const p2 = particles[k];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 45) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - cdist / 45) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    render();

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mode, particleDensity, playTone]);

  const resetParticles = () => {
    playClick();
    if (containerRef.current) {
      initParticles(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450px] md:h-[550px] rounded-2xl border border-borderDim bg-void overflow-hidden shadow-2xl"
    >
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />

      {/* Lab Header Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-obsidian/80 border border-borderDim backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-beam-cyan animate-pulse" />
          <span className="font-mono text-xs text-text-muted tracking-wider">
            LAB_EXP // PARTICLE_PHYSICS_ENGINE.wasm
          </span>
        </div>
        <div className="hidden sm:block font-mono text-xs text-text-dim">
          CLICK ANYWHERE TO TRIGGER SHOCKWAVE IMPULSE
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-xl bg-obsidian/90 border border-borderDim shadow-glowCyan backdrop-blur-md">
        <button
          onClick={() => {
            playClick();
            setMode("attract");
          }}
          onMouseEnter={playHover}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            mode === "attract"
              ? "bg-beam-cyan text-void font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]"
              : "text-text-muted hover:text-white hover:bg-surface"
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>VORTEX</span>
        </button>

        <button
          onClick={() => {
            playClick();
            setMode("repel");
          }}
          onMouseEnter={playHover}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            mode === "repel"
              ? "bg-beam-violet text-white font-bold shadow-[0_0_12px_rgba(139,92,246,0.4)]"
              : "text-text-muted hover:text-white hover:bg-surface"
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>REPULSE</span>
        </button>

        <button
          onClick={() => {
            playClick();
            setMode("wave");
          }}
          onMouseEnter={playHover}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            mode === "wave"
              ? "bg-beam-laser text-void font-bold shadow-[0_0_12px_rgba(0,255,136,0.4)]"
              : "text-text-muted hover:text-white hover:bg-surface"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>HARMONIC</span>
        </button>

        <div className="h-4 w-px bg-borderDim mx-1" />

        <button
          onClick={resetParticles}
          onMouseEnter={playHover}
          title="Respawn particles"
          className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-surface transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
