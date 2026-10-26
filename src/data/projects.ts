import { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "proj-01",
    slug: "aether-neural-synthesis",
    title: "AETHER // NEURAL SYNTHESIS",
    clientCategory: "Spatial Computing Lab (Concept R&D)",
    year: "2025",
    tagline: "Biometric Spatial Audio & Generative Latent Interface",
    summary:
      "A spatial computing environment that translates EEG neural telemetry and micro-gestures into volumetric sonic landscapes and real-time raymarched visual representations.",
    category: "spatial-3d",
    categoryLabel: "Spatial 3D & WebGPU",
    deliverables: [
      "Volumetric Raymarching Visualizer",
      "Web Audio API Spectral Synthesizer",
      "WebGPU Compute Shader Particle Engine (1.2M Particles)",
      "Zero-Latency Spatial HUD Interface",
    ],
    techStack: [
      "WebGPU",
      "Three.js / R3F",
      "GLSL Shaders",
      "Web Audio API",
      "TypeScript",
      "Tailwind CSS",
    ],
    metrics: [
      { label: "Real-time Particles", value: "1,200,000" },
      { label: "Audio Latency", value: "< 4.2ms" },
      { label: "Target Framerate", value: "60 FPS locked" },
    ],
    challenge:
      "Synthesizing high-density neurological frequency data into intelligible spatial geometry without introducing frame drops or acoustic phase cancellation on browser runtimes.",
    architecture:
      "Engineered an instanced compute shader pipeline leveraging WebGPU compute passes. Frequency domain audio transforms (FFT) modulate vertex displacement textures in real-time.",
    outcome:
      "Demonstrated interactive browser spatial rendering comparable to native Unreal Engine instances, setting a new benchmark for web-driven acoustic visualization.",
    accentColor: "#00F0FF",
    accentSecondary: "#8B5CF6",
    visualType: "particle-mesh",
  },
  {
    id: "proj-02",
    slug: "kronos-chrono-ledger",
    title: "KRONOS // CHRONO-SPATIAL LEDGER",
    clientCategory: "Quantitative Financial Infrastructure (Concept R&D)",
    year: "2025",
    tagline: "4D Topology Interface for Autonomous Market Ingestion",
    summary:
      "A multi-dimensional high-frequency trading observatory displaying orderbook depth as topological fluid contours and structural probability manifolds.",
    category: "systems",
    categoryLabel: "High-Density Systems",
    deliverables: [
      "Dynamic Surface Tensor Visualization",
      "Sub-millisecond WebSocket Pipeline",
      "Multi-Viewport Architectural Camera Matrix",
      "Hardware-Accelerated Anomaly Detection Heatmap",
    ],
    techStack: [
      "Three.js InstancedMesh",
      "WebSockets / WebWorkers",
      "GLSL Custom Materials",
      "React",
      "Zustand",
    ],
    metrics: [
      { label: "Vector Throughput", value: "250K ops/sec" },
      { label: "Render Overhead", value: "1.8ms / frame" },
      { label: "Memory Footprint", value: "< 48MB" },
    ],
    challenge:
      "Streaming hundreds of thousands of concurrent pricing deltas without blocking the primary browser event loop or degrading user navigation smoothness.",
    architecture:
      "Offloaded message decompression and matrix math to isolated Web Workers, streaming typed ArrayBuffers directly into shared GPU vertex buffers via Float32Arrays.",
    outcome:
      "Eliminated garbage collection stutter entirely, enabling continuous 120Hz display refresh on ProMotion and HDR displays.",
    accentColor: "#8B5CF6",
    accentSecondary: "#4F46E5",
    visualType: "tesseract",
  },
  {
    id: "proj-03",
    slug: "vortex-hyperspectral-rover",
    title: "VORTEX // HYPER-SPECTRAL ROVER UI",
    clientCategory: "Deep Space Robotics Division (Concept R&D)",
    year: "2024",
    tagline: "Extreme-Environment Telemetry Cockpit & Remote Robotics Control",
    summary:
      "An aerospace mission control dashboard engineered for low-bandwidth high-latency interplanetary exploration rovers, integrating LiDAR point clouds with synthetic vision.",
    category: "spatial-3d",
    categoryLabel: "Spatial Telemetry",
    deliverables: [
      "Point Cloud Decimation & Octree LOD System",
      "Synthetic Infrared & UV Terrain HUD",
      "Resilient Offline-First Sync Architecture",
      "Ergonomic Low-Light Cockpit Design System",
    ],
    techStack: [
      "Three.js Octree",
      "WebGL 2.0",
      "IndexedDB Cache",
      "Tailwind CSS",
      "Framer Motion",
    ],
    metrics: [
      { label: "LiDAR Points Cached", value: "4,500,000" },
      { label: "Offline Resilience", value: "100% Functional" },
      { label: "Optical Contrast", value: "18.2:1 (Extreme Dark)" },
    ],
    challenge:
      "Rendering high-precision terrain scans under harsh network dropouts while maintaining extreme visual contrast for mission engineers in dim control rooms.",
    architecture:
      "Implemented a hierarchical octree level-of-detail (LOD) parser that dynamically streams high-resolution terrain geometry within a 50-meter camera radius while downsampling horizon meshes.",
    outcome:
      "Achieved seamless 60fps telemetry navigation across multi-gigabyte point clouds on standard workstation hardware.",
    accentColor: "#00FF88",
    accentSecondary: "#00F0FF",
    visualType: "hyper-tunnel",
  },
  {
    id: "proj-04",
    slug: "syntropy-kinetic-typography",
    title: "SYNTROPY // KINETIC TYPE ENGINE",
    clientCategory: "Computational Typography Foundry (Concept R&D)",
    year: "2024",
    tagline: "Acoustic-Driven Kinetic Type & Physical Deformation System",
    summary:
      "A variable typographic generator where glyph geometries respond to ambient acoustic resonance, gravity forces, and tactile pointer interaction in real-time.",
    category: "kinetic-systems",
    categoryLabel: "Kinetic & Generative",
    deliverables: [
      "Bespoke Verlet Physics Glyph Engine",
      "Real-time OpenType Glyph Bezier Extruder",
      "SVG Vector Export & Print Tooling",
      "Multi-touch Interactive Exhibition Mode",
    ],
    techStack: [
      "Canvas 2D API",
      "Verlet Physics Integration",
      "Web Audio Analyzer",
      "GSAP ScrollTrigger",
      "TypeScript",
    ],
    metrics: [
      { label: "Physics Springs", value: "14,800 active" },
      { label: "Dynamic Glyphs", value: "Complete Latin Extended" },
      { label: "Export Formats", value: "SVG, MP4, WOFF2" },
    ],
    challenge:
      "Simulating spring-damper physics across hundreds of individual typographic bezier control points simultaneously in the DOM without frame jitter.",
    architecture:
      "Utilized custom SIMD-optimized array iteration over typed memory slices, rendering directly to an offscreen canvas with hardware bilinear filtering.",
    outcome:
      "Featured across experimental design forums and utilized in live audiovisual gallery performances in Berlin and Tokyo.",
    accentColor: "#EC4899",
    accentSecondary: "#8B5CF6",
    visualType: "frequency-matrix",
  },
];
