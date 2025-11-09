import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import SymptoMarker from "@/components/sections/symptomarker";
import HowItWorks from "@/components/sections/how-it-works";
import DashboardPreview from "@/components/sections/dashboard-preview";
import Benefits from "@/components/sections/benefits";
import CTASection from "@/components/sections/cta-section";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ScrollTriggerWrapper from "@/components/scroll-trigger-wrapper";
import GuidedScroll from "@/components/guided-scroll";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <GuidedScroll />
      <Navigation />
      
      <ScrollTriggerWrapper animation="fadeIn" duration={0.6}>
        <Hero />
      </ScrollTriggerWrapper>
      
      <ScrollTriggerWrapper animation="slideUp" duration={0.5}>
        <Features />
      </ScrollTriggerWrapper>
      
      <ScrollTriggerWrapper animation="slideRight" duration={0.5}>
        <SymptoMarker />
      </ScrollTriggerWrapper>
      
      <ScrollTriggerWrapper animation="slideLeft" duration={0.5}>
        <HowItWorks />
      </ScrollTriggerWrapper>
      
      <ScrollTriggerWrapper animation="scale" duration={0.5}>
        <DashboardPreview />
      </ScrollTriggerWrapper>
      
      <ScrollTriggerWrapper animation="slideRight" duration={0.5}>
        <Benefits />
      </ScrollTriggerWrapper>
      
      <ScrollTriggerWrapper animation="slideUp" duration={0.5}>
        <CTASection />
      </ScrollTriggerWrapper>
      
      <Footer />
    </main>
  );
}
