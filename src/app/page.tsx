
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutMeSection } from "@/components/sections/about-me-section";
import { SkillsShowcaseSection } from "@/components/sections/skills-showcase-section";
import { ProjectGallerySection } from "@/components/sections/project-gallery-section";
import { InternshipOverviewSection } from "@/components/sections/internship-overview-section";
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
        {/* Other sections like Contact/Feedback form can be added here later */}
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
}
