import { Service } from "@/types";

export const SERVICES: Service[] = [
  {
    id: "serv-01",
    code: "CAP-01",
    title: "Real-Time 3D & Spatial Web",
    tagline: "High-framerate WebGL/WebGPU immersive environments",
    description:
      "We design and engineer bespoke 3D brand centerpieces, interactive product configurators, and spatial storytelling platforms that run natively in modern browsers with buttery 60fps+ performance.",
    capabilities: [
      "Custom procedural geometry & GLSL fragment/vertex shaders",
      "WebGPU compute pipelines for million-particle simulations",
      "Physically based materials (PBR) & custom optical transmission",
      "Seamless mobile touch, gyroscope, & pointer integration",
    ],
    deliverables: [
      "Interactive 3D Hero Artifacts",
      "Complete Virtual Showrooms",
      "Architectural Spatial Tours",
      "Real-time Shader Presets",
    ],
    techUsed: ["Three.js", "React Three Fiber", "WebGPU", "GLSL", "Blender Pipeline"],
    metric: "60 FPS",
    metricLabel: "Locked on mobile & desktop",
  },
  {
    id: "serv-02",
    code: "CAP-02",
    title: "Cinematic Motion & Narrative Scrollytelling",
    tagline: "Coordinated scroll choreographies that mesmerize",
    description:
      "Transforming static content into cinematic journeys. We orchestrate GSAP timeline transitions, physics-driven micro-interactions, and pinned camera sequences that guide users through compelling narratives.",
    capabilities: [
      "GSAP ScrollTrigger architectural pinning and timeline scrubbing",
      "Spring physics & inertia-driven UI feedback with Motion",
      "SVG path morphing, typographic deformations & kinetic lettering",
      "Strict reduced-motion compliance for accessible comfort",
    ],
    deliverables: [
      "Multi-chapter Scroll Narratives",
      "High-conversion Product Introductions",
      "Signature Micro-interaction Systems",
      "Interactive Brand Manifesto",
    ],
    techUsed: ["GSAP 3", "ScrollTrigger", "Framer Motion", "Lenis Smooth Scroll"],
    metric: "< 2.4%",
    metricLabel: "CPU overhead on idle scroll",
  },
  {
    id: "serv-03",
    code: "CAP-03",
    title: "Generative Systems & Latent UI",
    tagline: "Algorithmic visual identity & AI-assisted exploration",
    description:
      "We synthesize machine learning models and procedural mathematics into living visual systems. Every user session can be unique, reactive to audio, ambient sensors, or conversational inputs.",
    capabilities: [
      "Procedural noise algorithms (Simplex, Perlin, Worley, Curl)",
      "Audio-reactive visualizers leveraging Web Audio API FFT analysis",
      "Client-side tensor operations & real-time visual latent exploration",
      "Algorithmic design tokens and programmatic SVG generation",
    ],
    deliverables: [
      "Living Identity Systems",
      "Dynamic Sound Visualizers",
      "Generative Art Platforms",
      "Computational Brand Toolkits",
    ],
    techUsed: ["Web Audio API", "TensorFlow.js", "Verlet Physics", "GLSL Noise"],
    metric: "100%",
    metricLabel: "Procedural & dynamic runtime",
  },
  {
    id: "serv-04",
    code: "CAP-04",
    title: "Architectural Web Engineering",
    tagline: "Bespoke frontends built with enterprise precision",
    description:
      "Behind every award-winning visual layer lies an uncompromising engineering foundation. We construct ultra-fast, accessible, production-hardened web applications with Next.js and TypeScript.",
    capabilities: [
      "Next.js App Router with Server Components & zero-layout-shift hydration",
      "Strict TypeScript type safety & automated verification pipelines",
      "Edge-cached content delivery & sub-second Core Web Vitals",
      "Comprehensive WCAG 2.1 AA accessibility & keyboard navigation",
    ],
    deliverables: [
      "Production-Grade Web Applications",
      "Headless CMS & Commerce Architecture",
      "Custom Design Token Engines",
      "Comprehensive Testing Suites",
    ],
    techUsed: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel Edge", "Playwright"],
    metric: "99+",
    metricLabel: "Lighthouse Performance Target",
  },
];
