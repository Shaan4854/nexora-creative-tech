import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050608",
        obsidian: "#0A0D14",
        surface: "#121622",
        surfaceElevated: "#181E2E",
        borderDim: "#1F2639",
        borderGlow: "#3B4868",
        beam: {
          cyan: "#00F0FF",
          violet: "#8B5CF6",
          indigo: "#4F46E5",
          laser: "#00FF88",
        },
        text: {
          pure: "#FFFFFF",
          muted: "#94A3B8",
          dim: "#475569",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widestTechnical: "0.25em",
        tactical: "0.15em",
      },
      boxShadow: {
        glowCyan: "0 0 35px -5px rgba(0, 240, 255, 0.35)",
        glowViolet: "0 0 35px -5px rgba(139, 92, 246, 0.35)",
        innerLuster: "inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'laser-sweep': 'laserSweep 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        laserSweep: {
          '0%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
