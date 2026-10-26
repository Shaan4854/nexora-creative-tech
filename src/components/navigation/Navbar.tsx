"use client";

import React, { useState, useEffect } from "react";
import { SoundToggleWidget, useSound } from "@/components/audio/SoundSynthesizer";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const { playClick, playHover } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);

    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "UTC",
        })
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const scrollTo = (id: string) => {
    playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-void/90 backdrop-blur-md border-b border-borderDim shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Studio Identifier */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo("hero")}
              onMouseEnter={playHover}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-surface border border-borderDim flex items-center justify-center group-hover:border-beam-cyan transition-colors">
                <Terminal className="w-4 h-4 text-beam-cyan" />
              </div>
              <div>
                <span className="font-display font-black text-lg tracking-wider text-white group-hover:text-beam-cyan transition-colors">
                  NEXORA
                </span>
                <span className="hidden lg:block font-mono text-[9px] text-text-dim tracking-widest uppercase">
                  ATELIER OF POST-DIGITAL DIMENSIONS
                </span>
              </div>
            </button>

            {/* Time Telemetry */}
            <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-borderDim font-mono text-[11px] text-text-dim">
              <span className="w-1.5 h-1.5 rounded-full bg-beam-laser animate-pulse" />
              <span>UTC {currentTime || "00:00:00"}</span>
              <span className="text-borderDim">•</span>
              <span className="text-text-muted">STUDIO ONLINE</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs tracking-wider text-text-muted">
            <button
              onClick={() => scrollTo("projects")}
              onMouseEnter={playHover}
              className="hover:text-beam-cyan transition-colors py-1"
            >
              <span className="text-text-dim mr-1">01//</span>EXHIBITION
            </button>
            <button
              onClick={() => scrollTo("services")}
              onMouseEnter={playHover}
              className="hover:text-beam-cyan transition-colors py-1"
            >
              <span className="text-text-dim mr-1">02//</span>CAPABILITIES
            </button>
            <button
              onClick={() => scrollTo("lab")}
              onMouseEnter={playHover}
              className="hover:text-beam-cyan transition-colors py-1"
            >
              <span className="text-text-dim mr-1">03//</span>LAB
            </button>
            <button
              onClick={() => scrollTo("process")}
              onMouseEnter={playHover}
              className="hover:text-beam-cyan transition-colors py-1"
            >
              <span className="text-text-dim mr-1">04//</span>METHODOLOGY
            </button>
          </nav>

          {/* Right Controls: Audio Synthesizer & CTA */}
          <div className="flex items-center gap-3">
            <SoundToggleWidget />

            <button
              onClick={() => scrollTo("contact")}
              onMouseEnter={playHover}
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-surface border border-borderDim hover:border-beam-cyan/60 hover:shadow-glowCyan font-mono text-xs tracking-wider text-white transition-all duration-300 group"
            >
              <span>INITIATE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-beam-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              onMouseEnter={playHover}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg border border-borderDim bg-surface text-text-muted hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-void/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8 animate-in fade-in duration-200">
          <div className="space-y-6">
            <div className="font-mono text-xs text-text-dim tracking-widest border-b border-borderDim pb-2">
              NAVIGATION MATRIX
            </div>
            <nav className="flex flex-col space-y-4 font-mono text-lg text-white">
              <button
                onClick={() => scrollTo("projects")}
                className="flex items-center justify-between text-left py-2 border-b border-borderDim/50 hover:text-beam-cyan"
              >
                <span>01 // EXHIBITION</span>
                <ArrowUpRight className="w-4 h-4 text-text-dim" />
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="flex items-center justify-between text-left py-2 border-b border-borderDim/50 hover:text-beam-cyan"
              >
                <span>02 // CAPABILITIES</span>
                <ArrowUpRight className="w-4 h-4 text-text-dim" />
              </button>
              <button
                onClick={() => scrollTo("lab")}
                className="flex items-center justify-between text-left py-2 border-b border-borderDim/50 hover:text-beam-cyan"
              >
                <span>03 // EXPERIMENTAL LAB</span>
                <ArrowUpRight className="w-4 h-4 text-text-dim" />
              </button>
              <button
                onClick={() => scrollTo("process")}
                className="flex items-center justify-between text-left py-2 border-b border-borderDim/50 hover:text-beam-cyan"
              >
                <span>04 // METHODOLOGY</span>
                <ArrowUpRight className="w-4 h-4 text-text-dim" />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="flex items-center justify-between text-left py-2 border-b border-borderDim/50 text-beam-cyan font-bold"
              >
                <span>05 // INITIATE COMMISSION</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-borderDim font-mono text-xs text-text-dim">
            <div>STUDIO // BERLIN • TOKYO • VIRTUAL NODE</div>
            <div className="text-[10px]">ALL SYSTEMS OPERATIONAL // NEXT-GEN SPATIAL ATELIER</div>
          </div>
        </div>
      )}
    </>
  );
};
