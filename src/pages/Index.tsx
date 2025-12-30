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
import DemoVideo from "@/components/DemoVideo";
import CaseStudies from "@/components/CaseStudies";
import Compliance from "@/components/Compliance";
import Pricing from "@/components/Pricing";
import ComparisonTable from "@/components/ComparisonTable";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import ContactForm from "@/components/ContactForm";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollIndicator from "@/components/ScrollIndicator";
import SecurityBanner from "@/components/SecurityBanner";
import ChatWidget from "@/components/ChatWidget";
import RealTimeAlerts from "@/components/RealTimeAlerts";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <ScrollIndicator />
      <RealTimeAlerts />
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
      <DemoVideo />
      <TeamStats />
      <CaseStudies />
      <Compliance />
      <Pricing />
      <ComparisonTable />
      <Testimonials />
      <FAQSection />
      <ContactForm />
      <CTA />
      <Footer />
      <SecurityBanner />
      <ChatWidget />
    </div>
  );
};

export default Index;