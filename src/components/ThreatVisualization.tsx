import { useState, useCallback } from "react";
import { Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import WorldMap, { AttackArc } from "./threat-map/WorldMap";
import AttackLog from "./threat-map/AttackLog";
import ThreatStats from "./threat-map/ThreatStats";
import TopTargets from "./threat-map/TopTargets";
import AttackTypeBreakdown from "./threat-map/AttackTypeBreakdown";
import TimeframeToggle from "./threat-map/TimeframeToggle";

const ThreatVisualization = () => {
  const [attacks, setAttacks] = useState<AttackArc[]>([]);
  const [timeframe, setTimeframe] = useState<"1h" | "24h" | "7d" | "30d">("24h");

  const handleAttackGenerated = useCallback((attack: AttackArc) => {
    setAttacks(prev => [...prev.slice(-50), attack]);
  }, []);

  return (
    <section id="threat-map" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Live Threat Intelligence</span>
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
            <div className="lg:col-span-2 h-[400px] rounded-xl overflow-hidden border border-border">
              <WorldMap onAttackGenerated={handleAttackGenerated} />
            </div>
            <div className="h-[400px] rounded-xl overflow-hidden bg-card border border-border">
              <AttackLog attacks={attacks} maxItems={10} />
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
      </div>
    </section>
  );
};

export default ThreatVisualization;
