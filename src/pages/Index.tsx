import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import LiveMetrics from "@/components/LiveMetrics";
import Solutions from "@/components/Solutions";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ThreatVisualization from "@/components/ThreatVisualization";
import IntegrationLogos from "@/components/IntegrationLogos";
import SecurityCertifications from "@/components/SecurityCertifications";
import TeamStats from "@/components/TeamStats";
import CaseStudies from "@/components/CaseStudies";
import Compliance from "@/components/Compliance";

import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollIndicator from "@/components/ScrollIndicator";
import SecurityBanner from "@/components/SecurityBanner";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <ScrollIndicator />
      <Navbar />
      <Hero />
      <TrustedBy />
      <LiveMetrics />
      <Solutions />
      <HowItWorks />
      <ThreatVisualization />
      <IntegrationLogos />
      <Features />
      <SecurityCertifications />
      <TeamStats />
      
      <Compliance />
      
      
      <FAQSection />
      <CTA />
      <Footer />
      <SecurityBanner />
      <ChatWidget />
    </div>
  );
};

export default Index;
