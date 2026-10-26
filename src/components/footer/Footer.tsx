"use client";

import React from "react";
import { useSound } from "@/components/audio/SoundSynthesizer";
import { ArrowUp, Terminal, ShieldCheck, Heart } from "lucide-react";

export const Footer: React.FC<{
  onOpenAssetManifest: () => void;
}> = ({ onOpenAssetManifest }) => {
  const { playClick, playHover } = useSound();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-void border-t border-borderDim py-16 text-text-dim font-mono text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between border-b border-borderDim pb-12">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-white font-display font-black text-xl tracking-wider">
              <div className="w-6 h-6 rounded bg-surface border border-borderDim flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-beam-cyan" />
              </div>
              <span>NEXORA</span>
            </div>
            <p className="text-text-muted text-xs leading-relaxed max-w-sm">
              An independent creative technology atelier engineering next-generation 3D web
              experiences, spatial computing interfaces, and bespoke motion architectures.
            </p>
            <div className="text-[11px] text-text-dim">
              PARADIGM: POST-DIGITAL // HANDMADE CODE // ZERO SLOP
            </div>
          </div>

          {/* Timezone Nodes */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-white font-semibold tracking-wider uppercase mb-3">
              ACTIVE NODES &amp; TIME ZONES
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between max-w-xs">
                <span>BERLIN (CET / UTC+1)</span>
                <span className="text-beam-cyan font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>TOKYO (JST / UTC+9)</span>
                <span className="text-beam-violet font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>SAN FRANCISCO (PST / UTC-8)</span>
                <span className="text-beam-laser font-bold">ONLINE</span>
              </div>
            </div>
          </div>

          {/* Navigation & Documentation */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-white font-semibold tracking-wider uppercase mb-3">
              PROTOCOL &amp; ARCHITECTURE
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => {
                    playClick();
                    onOpenAssetManifest();
                  }}
                  onMouseEnter={playHover}
                  className="hover:text-beam-cyan transition-colors underline underline-offset-4"
                >
                  ASSET &amp; LICENSE MANIFEST
                </button>
              </li>
              <li>
                <a
                  href="#projects"
                  onMouseEnter={playHover}
                  className="hover:text-white transition-colors"
                >
                  CASE STUDY ARCHIVES
                </a>
              </li>
              <li>
                <a
                  href="#lab"
                  onMouseEnter={playHover}
                  className="hover:text-white transition-colors"
                >
                  INTERACTIVE LAB EXPERIMENTS
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onMouseEnter={playHover}
                  className="hover:text-white transition-colors"
                >
                  COMMISSION ESTIMATOR
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <div className="text-[11px] text-text-dim text-center sm:text-left">
            © {new Date().getFullYear()} NEXORA ATELIER. ALL SPECIFICATIONS AND CONCEPTS AUTHORED IN-HOUSE.
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-text-muted text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-beam-laser" />
              <span>WCAG 2.1 AA COMPLIANT</span>
            </span>

            <button
              onClick={scrollToTop}
              onMouseEnter={playHover}
              aria-label="Back to top"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-borderDim hover:border-beam-cyan text-text-muted hover:text-white transition-all"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-beam-cyan" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
