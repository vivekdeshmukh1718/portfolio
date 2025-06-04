
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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
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
      <AiAssistant />
    </div>
  );
}
