"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
  playTone: (freq: number, type?: OscillatorType, duration?: number) => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: true,
  toggleMute: () => {},
  playHover: () => {},
  playClick: () => {},
  playTone: () => {},
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }, []);

  const toggleMute = useCallback(() => {
    initAudio();
    setIsMuted((prev) => {
      const next = !prev;
      if (!next && audioCtxRef.current) {
        // Unmuting: Start subtle ambient drone
        try {
          if (!droneOscRef.current) {
            const ctx = audioCtxRef.current;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = "sine";
            osc.frequency.setValueAtTime(55, ctx.currentTime); // A1 note 55Hz

            filter.type = "lowpass";
            filter.frequency.setValueAtTime(140, ctx.currentTime);

            gain.gain.setValueAtTime(0.015, ctx.currentTime); // very subtle, non-intrusive

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            droneOscRef.current = osc;
            droneGainRef.current = gain;
          } else if (droneGainRef.current) {
            droneGainRef.current.gain.setTargetAtTime(0.015, audioCtxRef.current.currentTime, 0.2);
          }
        } catch {
          // gracefully handle audio init errors
        }
      } else if (droneGainRef.current && audioCtxRef.current) {
        droneGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
      }
      return next;
    });
  }, [initAudio]);

  const playHover = useCallback(() => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio fallback
    }
  }, [isMuted]);

  const playClick = useCallback(() => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1760, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio fallback
    }
  }, [isMuted]);

  const playTone = useCallback(
    (freq: number, type: OscillatorType = "sine", duration: number = 0.15) => {
      if (isMuted || !audioCtxRef.current) return;
      try {
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        // Audio fallback
      }
    },
    [isMuted]
  );

  useEffect(() => {
    return () => {
      if (droneOscRef.current) {
        try {
          droneOscRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playHover, playClick, playTone }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);

export const SoundToggleWidget: React.FC = () => {
  const { isMuted, toggleMute, playClick } = useSound();

  return (
    <button
      onClick={() => {
        playClick();
        toggleMute();
      }}
      aria-label={isMuted ? "Unmute atmospheric sound" : "Mute atmospheric sound"}
      className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-borderDim hover:border-beam-cyan/50 bg-obsidian/80 backdrop-blur-md transition-all duration-300 text-xs font-mono tracking-wider text-text-muted hover:text-white"
    >
      <div className="flex items-center gap-0.5 h-3 w-3 justify-center">
        {!isMuted ? (
          <>
            <span className="w-0.5 h-3 bg-beam-cyan animate-[pulse_0.6s_ease-in-out_infinite]" />
            <span className="w-0.5 h-2 bg-beam-cyan animate-[pulse_0.8s_ease-in-out_infinite_0.2s]" />
            <span className="w-0.5 h-2.5 bg-beam-cyan animate-[pulse_0.7s_ease-in-out_infinite_0.4s]" />
          </>
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-text-dim group-hover:text-text-muted transition-colors" />
        )}
      </div>
      <span className="hidden sm:inline">
        {isMuted ? "AUDIO: MUTE" : "AUDIO: LIVE"}
      </span>
      {!isMuted && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-beam-cyan opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-beam-cyan"></span>
        </span>
      )}
    </button>
  );
};
