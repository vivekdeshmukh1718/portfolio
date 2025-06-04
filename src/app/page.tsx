
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
import DigitalClock from "@/components/digital-clock"; // Import the DigitalClock

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-stretch gap-8 py-0 md:py-6 lg:py-8">
          <div className="lg:w-3/5 xl:w-2/3 flex items-center"> {/* Adjusted width proportions */}
            <HeroSection />
          </div>
          <div className="lg:w-2/5 xl:w-1/3 flex flex-col lg:flex-row items-center justify-center gap-4 py-8 lg:py-0"> {/* Clock container - flex-col for mobile, lg:flex-row for large screens */}
            <AnalogClock />
            <DigitalClock />
          </div>
        </div>
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
