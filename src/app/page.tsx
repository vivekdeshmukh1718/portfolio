
"use client";
import type { FC } from 'react'; // Added FC for potential future use if needed
import { useState } from "react"; // Added useState
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutMeSection } from "@/components/sections/about-me-section";
import { SkillsShowcaseSection } from "@/components/sections/skills-showcase-section";
import { ProjectGallerySection } from "@/components/sections/project-gallery-section";
import { InternshipOverviewSection } from "@/components/sections/internship-overview-section";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { AiIdeaGeneratorSection } from "@/components/sections/ai-idea-generator-section";
import { VisitorStatsSection } from "@/components/sections/visitor-stats-section";
import { AiAssistant } from "@/components/ai-assistant";
import AnalogClock from "@/components/analog-clock";
import DigitalClock from "@/components/digital-clock";


export default function HomePage() {
  const [headerSearchQuery, setHeaderSearchQuery] = useState<string | null>(null);

  const handleHeaderSearchSubmit = (query: string) => {
    setHeaderSearchQuery(query);
  };

  const handleAiAssistantOpenedWithQuery = () => {
    setHeaderSearchQuery(null); // Reset the query so it doesn't re-trigger
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearchSubmit={handleHeaderSearchSubmit} />
      <main className="flex-grow">
        <HeroSection />
        {/* Removed clocks from here as per previous request to keep homepage clean */}
        {/* <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-stretch gap-8 py-0 md:py-6 lg:py-8">
          <div className="lg:w-3/5 xl:w-2/3 flex items-center"> 
            <HeroSection />
          </div>
          <div className="lg:w-2/5 xl:w-1/3 flex flex-col lg:flex-row items-center justify-center gap-4 py-8 lg:py-0"> 
            <AnalogClock clockSize={200} />
            <DigitalClock />
          </div>
        </div> */}
        <AboutMeSection />
        <SkillsShowcaseSection />
        <ProjectGallerySection />
        <InternshipOverviewSection />
        <AchievementsSection />
        <CertificationsSection />
        <VisitorStatsSection />
        <AiIdeaGeneratorSection /> 
      </main>
      <Footer />
      <AiAssistant 
        triggerOpenWithQuery={headerSearchQuery}
        onProgrammaticOpenHandled={handleAiAssistantOpenedWithQuery}
      />
    </div>
  );
}
