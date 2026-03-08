import Navbar from "@/components/Navbar";
import ThreatVisualization from "@/components/ThreatVisualization";
import ThreatAnalysis from "@/components/ThreatAnalysis";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollIndicator from "@/components/ScrollIndicator";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <ScrollIndicator />
      <Navbar />
      <ThreatVisualization />
      <ThreatAnalysis />
      <ChatWidget />
    </div>
  );
};

export default Index;
