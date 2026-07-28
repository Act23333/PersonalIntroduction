import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { EngineeringSection } from "@/components/sections/engineering-section";
import { AISection } from "@/components/sections/ai-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EngineeringSection />
        <AISection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
