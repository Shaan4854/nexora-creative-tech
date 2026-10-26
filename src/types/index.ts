export interface Project {
  id: string;
  slug: string;
  title: string;
  clientCategory: string;
  year: string;
  tagline: string;
  summary: string;
  category: "spatial-3d" | "generative-ai" | "kinetic-systems" | "systems";
  categoryLabel: string;
  deliverables: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  challenge: string;
  architecture: string;
  outcome: string;
  accentColor: string;
  accentSecondary: string;
  visualType: "particle-mesh" | "tesseract" | "hyper-tunnel" | "frequency-matrix";
  liveUrl?: string;
}

export interface Service {
  id: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
  techUsed: string[];
  metric: string;
  metricLabel: string;
}

export interface MethodologyPhase {
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  deliverables: string[];
  keyMilestone: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  organization: string;
  services: string[];
  budgetTier: string;
  timeline: string;
  brief: string;
}
