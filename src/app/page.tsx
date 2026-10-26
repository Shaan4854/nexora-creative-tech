"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { InteractiveLabSection } from "@/components/lab/InteractiveLabSection";
import { ProcessSection } from "@/components/process/ProcessSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";
import { AssetManifestModal } from "@/components/modals/AssetManifestModal";

export default function Home() {
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>("");
  const [selectedProjectForInquiry, setSelectedProjectForInquiry] = useState<string>("");
  const [assetManifestOpen, setAssetManifestOpen] = useState<boolean>(false);

  const handleInitiateProjectInquiry = (projectName: string) => {
    setSelectedProjectForInquiry(projectName);
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectServiceInquiry = (serviceTitle: string) => {
    setSelectedServiceForInquiry(serviceTitle);
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-void text-white overflow-hidden">
      {/* Ambient Scanline Effect */}
      <div className="scanline" />

      {/* Navigation Matrix */}
      <Navbar />

      {/* Hero Section with Interactive 3D Centerpiece */}
      <HeroSection />

      {/* Curated Works & Interactive Blueprint Modal */}
      <ProjectsSection onInitiateInquiry={handleInitiateProjectInquiry} />

      {/* Studio Capabilities & Disciplines */}
      <ServicesSection onSelectService={handleSelectServiceInquiry} />

      {/* The Proving Ground // Real-time Physics Lab */}
      <InteractiveLabSection />

      {/* Dimensional Engineering Process & Manifesto */}
      <ProcessSection />

      {/* Functional Commission Inquiry Portal */}
      <ContactSection
        initialService={selectedServiceForInquiry}
        initialProjectName={selectedProjectForInquiry}
      />

      {/* Studio Footer */}
      <Footer onOpenAssetManifest={() => setAssetManifestOpen(true)} />

      {/* Asset Provenance & License Manifest Modal */}
      <AssetManifestModal
        isOpen={assetManifestOpen}
        onClose={() => setAssetManifestOpen(false)}
      />
    </main>
  );
}
