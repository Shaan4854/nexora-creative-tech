"use client";

import React, { useState } from "react";
import { PROJECTS } from "@/data/projects";
import { Project } from "@/types";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { useSound } from "@/components/audio/SoundSynthesizer";
import { ArrowUpRight, Code, Cpu, Layers } from "lucide-react";

export const ProjectsSection: React.FC<{
  onInitiateInquiry: (projectName: string) => void;
}> = ({ onInitiateInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { playClick, playHover } = useSound();

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const categories = [
    { id: "all", label: "ALL WORKS", count: PROJECTS.length },
    {
      id: "spatial-3d",
      label: "SPATIAL 3D & WEBGPU",
      count: PROJECTS.filter((p) => p.category === "spatial-3d").length,
    },
    {
      id: "systems",
      label: "HIGH-DENSITY SYSTEMS",
      count: PROJECTS.filter((p) => p.category === "systems").length,
    },
    {
      id: "kinetic-systems",
      label: "KINETIC & GENERATIVE",
      count: PROJECTS.filter((p) => p.category === "kinetic-systems").length,
    },
  ];

  return (
    <section id="projects" className="py-24 bg-obsidian border-t border-borderDim relative">
      {/* Structural Corner Crosshairs */}
      <div className="absolute top-0 left-6 -translate-y-1/2 font-mono text-borderDim text-sm select-none">
        +
      </div>
      <div className="absolute top-0 right-6 -translate-y-1/2 font-mono text-borderDim text-sm select-none">
        +
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-borderDim pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-beam-cyan tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-beam-cyan" />
              <span>01 // CURATED EXHIBITION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              ARCHITECTURAL WORKS &amp; R&amp;D
            </h2>
            <p className="font-mono text-xs text-text-dim">
              [ ALL SHOWCASES ARE STUDIO-AUTHORED EXPERIMENTAL CONCEPTS // NO FABRICATED METRICS ]
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  playClick();
                  setActiveCategory(c.id);
                }}
                onMouseEnter={playHover}
                className={`px-3 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                  activeCategory === c.id
                    ? "bg-beam-cyan text-void font-bold shadow-[0_0_12px_rgba(0,240,255,0.35)]"
                    : "bg-surface border border-borderDim text-text-muted hover:text-white hover:border-beam-cyan/40"
                }`}
              >
                <span>{c.label}</span>
                <span className="opacity-60 text-[10px]">({c.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group relative rounded-2xl bg-surface/60 border border-borderDim hover:border-beam-cyan/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-beam-cyan/5 space-y-6"
            >
              {/* Top Meta Header */}
              <div className="flex items-center justify-between font-mono text-xs text-text-dim border-b border-borderDim/50 pb-4">
                <span className="text-beam-cyan font-semibold">
                  REF // 0{idx + 1}
                </span>
                <span>{project.clientCategory}</span>
                <span className="px-2 py-0.5 rounded bg-void border border-borderDim text-text-muted">
                  {project.year}
                </span>
              </div>

              {/* Title & Concept Summary */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white group-hover:text-beam-cyan transition-colors">
                  {project.title}
                </h3>
                <div className="font-mono text-xs text-beam-violet font-medium">
                  {project.tagline}
                </div>
                <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                  {project.summary}
                </p>
              </div>

              {/* Technical Telemetry Badges */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-borderDim/40">
                {project.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="space-y-0.5">
                    <div className="font-mono text-[10px] text-text-dim uppercase tracking-wider">
                      {m.label}
                    </div>
                    <div className="font-mono text-xs sm:text-sm font-bold text-white">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.slice(0, 4).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded bg-void border border-borderDim font-mono text-[11px] text-text-muted"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-2 py-0.5 rounded bg-void border border-borderDim font-mono text-[11px] text-text-dim">
                    +{project.techStack.length - 4} MORE
                  </span>
                )}
              </div>

              {/* Actions Footer */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    playClick();
                    setSelectedProject(project);
                  }}
                  onMouseEnter={playHover}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-void border border-borderDim group-hover:border-beam-cyan text-xs font-mono tracking-wider text-white group-hover:text-beam-cyan transition-all"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>INSPECT BLUEPRINT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blueprint Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInitiateInquiry={onInitiateInquiry}
      />
    </section>
  );
};
