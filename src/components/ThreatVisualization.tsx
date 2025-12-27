import { useState, useCallback } from "react";
import { Zap, Maximize2, Shield, AlertTriangle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import WorldMap, { AttackArc } from "./threat-map/WorldMap";
import AttackLog from "./threat-map/AttackLog";
import ThreatStats from "./threat-map/ThreatStats";
import TopTargets from "./threat-map/TopTargets";
import AttackTypeBreakdown from "./threat-map/AttackTypeBreakdown";
import TimeframeToggle from "./threat-map/TimeframeToggle";
import { Button } from "./ui/button";

const ThreatVisualization = () => {
  const [attacks, setAttacks] = useState<AttackArc[]>([]);
  const [timeframe, setTimeframe] = useState<"1h" | "24h" | "7d" | "30d">("24h");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleAttackGenerated = useCallback((attack: AttackArc) => {
    setAttacks(prev => [...prev.slice(-50), attack]);
  }, []);

  return (
    <section id="threat-map" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/5 mb-6">
            <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-sm text-red-400 font-medium">Live Threat Intelligence</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Global <span className="text-gradient-cyber">Threat Map</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Real-time visualization of cyber attacks worldwide. Monitor threats as they happen across 195 countries.
          </p>
          <TimeframeToggle value={timeframe} onChange={setTimeframe} />
        </AnimatedSection>

        {/* Stats Grid */}
        <AnimatedSection delay={100} className="mb-8">
          <ThreatStats />
        </AnimatedSection>

        {/* Main Map + Attack Log */}
        <AnimatedSection delay={200} className="mb-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className={`lg:col-span-2 rounded-xl overflow-hidden border border-border relative group transition-all duration-500 ${
              isFullscreen ? 'fixed inset-4 z-50 lg:col-span-1' : 'h-[450px]'
            }`}>
              {isFullscreen && (
                <div className="absolute inset-0 bg-background/95 backdrop-blur-xl -z-10" />
              )}
              <WorldMap onAttackGenerated={handleAttackGenerated} />
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-4 right-4 bg-background/60 backdrop-blur-md border border-border hover:bg-primary/20 hover:border-primary/50 z-10"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
            <div className={`h-[450px] rounded-xl overflow-hidden bg-card/80 backdrop-blur-md border border-border ${isFullscreen ? 'hidden lg:block' : ''}`}>
              <AttackLog attacks={attacks} maxItems={12} />
            </div>
          </div>
        </AnimatedSection>

        {/* Top Targets */}
        <AnimatedSection delay={300} className="mb-8">
          <TopTargets />
        </AnimatedSection>

        {/* Attack Type Breakdown */}
        <AnimatedSection delay={400}>
          <AttackTypeBreakdown />
        </AnimatedSection>
        
        {/* CTA */}
        <AnimatedSection delay={500} className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-accent/10 border border-primary/20">
            <Shield className="w-10 h-10 text-primary" />
            <div className="text-left">
              <p className="font-semibold text-foreground">Want real-time protection?</p>
              <p className="text-sm text-muted-foreground">Deploy CyberShield and block threats before they reach you.</p>
            </div>
            <Button variant="cyber" className="ml-4">
              Get Protected
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ThreatVisualization;
