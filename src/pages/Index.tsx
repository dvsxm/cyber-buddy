import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Solutions from "@/components/Solutions";
import Features from "@/components/Features";
import ThreatVisualization from "@/components/ThreatVisualization";
import Compliance from "@/components/Compliance";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollIndicator from "@/components/ScrollIndicator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <ScrollIndicator />
      <Navbar />
      <Hero />
      <TrustedBy />
      <Solutions />
      <ThreatVisualization />
      <Features />
      <Compliance />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
