import { HeroSection } from "@/app/components/sections/HeroSection";
import { AboutSection } from "@/app/components/sections/AboutSection";
import { StatsBand } from "@/app/components/sections/StatsBand";
import { ServicesSection } from "@/app/components/sections/ServicesSection";
import { QuoteBand } from "@/app/components/sections/QuoteBand";
import { ProcessSection } from "@/app/components/sections/ProcessSection";
import { TestimonialsSection } from "@/app/components/sections/TestimonialsSection";
import { ContactSection } from "@/app/components/sections/ContactSection";
import { Footer } from "@/app/components/sections/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsBand />
      <ServicesSection />
      <QuoteBand />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
