import { MethodologyPhase } from "@/types";

export const STUDIO_MANIFESTO = {
  headline: "THE POST-DIGITAL THESIS",
  quote:
    "We believe the internet has become sterile. The era of copy-paste templates, interchangeable SaaS gradients, and sanitized layouts is over. At NEXORA, we treat the browser as a digital gallery, an optical laboratory, and a canvas for uncompromised wonder.",
  tenets: [
    {
      title: "MATHEMATICAL CRAFT",
      detail:
        "Every curve, vertex, and spring stiffness is mathematically considered. We don't apply motion for distraction; we apply physics for tactile truth.",
    },
    {
      title: "THE VOID AS ARCHITECTURE",
      detail:
        "Deep dark space is not empty—it provides the optical depth required for light to feel luminous, cutting through noise with surgical clarity.",
    },
    {
      title: "ZERO SLOP GUARANTEE",
      detail:
        "We reject canned UI kits, fake client laurels, and generic AI hallucinations. Everything we deliver is hand-architected, rigorously tested, and built for timeless impact.",
    },
    {
      title: "HONEST TELEMETRY",
      detail:
        "Real performance, real accessibility, real frame budgets. A digital experience is only truly beautiful when it runs smoothly on every device.",
    },
  ],
};

export const METHODOLOGY_PHASES: MethodologyPhase[] = [
  {
    phase: "PHASE 01",
    title: "Optical Reconnaissance & Conceptual Genesis",
    subtitle: "Discovery, Aesthetic Vectoring, & Technical Feasibility",
    description:
      "We dissect your brand narrative, analyze category benchmarks, define the anti-goals, and prototype preliminary GLSL shader tests and typographic pairings.",
    duration: "Week 01 – 02",
    deliverables: [
      "Design System Token Specification",
      "Interactive 3D Geometry Proof-of-Concept",
      "Typographic & Palette Hierarchy Document",
      "Technical Architecture Matrix",
    ],
    keyMilestone: "Concept Approval & Shader Signoff",
  },
  {
    phase: "PHASE 02",
    title: "Spatial Prototyping & Spatial Choreography",
    subtitle: "3D Asset Modeling, Physics Tuning, & Narrative Flow",
    description:
      "We sculpt the interactive 3D assets, tune lighting environments, establish GSAP scroll coordinates, and wireframe the complete responsive viewport experience.",
    duration: "Week 03 – 04",
    deliverables: [
      "Interactive WebGL Canvas Playground",
      "Motion Choreography Timeline (GSAP)",
      "Responsive 12-Column Layout System",
      "Sound Synthesis Frequency Map",
    ],
    keyMilestone: "Interactive Prototype Review",
  },
  {
    phase: "PHASE 03",
    title: "Production Architecture & Hardening",
    subtitle: "Next.js Integration, State Management, & Cross-Device Optimization",
    description:
      "We write modular, type-safe Next.js code, integrate audio synthesis, test against WCAG 2.1 AA accessibility guidelines, and eliminate all layout shifts.",
    duration: "Week 05 – 06",
    deliverables: [
      "Next.js App Router Codebase",
      "Accessible Semantic DOM Hierarchy",
      "60fps WebGL Memory Garbage-Collection Optimization",
      "Interactive Form & State Validation",
    ],
    keyMilestone: "Staging Release & QA Battery",
  },
  {
    phase: "PHASE 04",
    title: "Global Edge Deployment & Sonic Tuning",
    subtitle: "Telemetry Verification, Asset Decimation, & Launch",
    description:
      "We deploy to global edge networks, run automated Lighthouse and Playwright testing batteries, verify cross-browser stability, and hand over complete architectural documentation.",
    duration: "Week 07",
    deliverables: [
      "Edge-Cached Production Build",
      "Lighthouse 95+ Audit Verification",
      "Complete Source Code & Asset Manifest",
      "Studio Support & Maintenance Handoff",
    ],
    keyMilestone: "Public Launch & Awards Submission",
  },
];
