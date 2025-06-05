
"use client";
import type { FC } from 'react'; 
// import { useState } from "react"; // No longer needed for header search
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutMeSection } from "@/components/sections/about-me-section";
import { SkillsShowcaseSection } from "@/components/sections/skills-showcase-section";
import { ProjectGallerySection } from "@/components/sections/project-gallery-section";
import { InternshipOverviewSection } from "@/components/sections/internship-overview-section";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { GitHubActivitySection } from "@/components/sections/github-activity-section";
import { AiIdeaGeneratorSection } from "@/components/sections/ai-idea-generator-section";
import { VisitorStatsSection } from "@/components/sections/visitor-stats-section";
import { AiAssistant } from "@/components/ai-assistant";
import { ScrollNavigationButtons } from "@/components/scroll-navigation-buttons"; // Added import

export default function HomePage() {
  // const [headerSearchQuery, setHeaderSearchQuery] = useState<string | null>(null); // Removed

  // const handleHeaderSearchSubmit = (query: string) => { // Removed
  //   setHeaderSearchQuery(query);
  // };

  // const handleAiAssistantOpenedWithQuery = () => { // Removed
  //   setHeaderSearchQuery(null); 
  // };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutMeSection />
        <SkillsShowcaseSection />
        <ProjectGallerySection />
        <InternshipOverviewSection />
        <GitHubActivitySection /> 
        <AchievementsSection />
        <CertificationsSection />
        <VisitorStatsSection />
        <AiIdeaGeneratorSection /> 
      </main>
      <Footer />
      <AiAssistant />
      <ScrollNavigationButtons /> {/* Added component */}
    </div>
  );
}
