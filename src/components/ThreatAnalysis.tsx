import AnimatedSection from "./AnimatedSection";
import { 
  AlertTriangle, TrendingUp, Zap, Globe, ShieldAlert, 
  Target, Brain, BarChart3, CheckCircle2, ArrowUpRight
} from "lucide-react";
import { Badge } from "./ui/badge";

const weaknesses = [
  {
    title: "High MTTR",
    description: "Spikes and red vector heatmaps suggest alert fatigue or slow triage.",
    severity: "high",
    icon: AlertTriangle,
  },
  {
    title: "Geographic Concentration",
    description: "Asia/Europe hotspots (China, NL, US) with limited zero-day coverage.",
    severity: "medium",
    icon: Globe,
  },
  {
    title: "No UEBA Coverage",
    description: "No explicit user behavior analytics or automated playbooks, risking insider threats.",
    severity: "high",
    icon: ShieldAlert,
  },
  {
    title: "Response Time Fluctuations",
    description: "Peaks above MT3.4s; target sub-2s consistently across all vectors.",
    severity: "medium",
    icon: Zap,
  },
];

const improvements = [
  {
    area: "Vectors",
    issue: "Endpoint/app overload",
    improvement: "EDR/XDR (e.g., Sentinel integration)",
    impact: "Reduce red heat by 30%",
  },
  {
    area: "Geo Coverage",
    issue: "NA/Asia bias",
    improvement: "ML geo-fencing + threat hunting",
    impact: "Broaden to 80% global vis",
  },
  {
    area: "Alerts",
    issue: "Noise (suspect logs)",
    improvement: "Fidelity tuning w/ KQL/ML",
    impact: "Cut fatigue 70%",
  },
];

const strategies = [
  {
    title: "AI-Driven Auto-Remediation",
    description: "Implement Sigma/YARA rules integrated with Wazuh/Zeek for common attacks (DDoS/phishing), reducing MTTR by 50%+.",
    icon: Brain,
    tag: "Response Time",
  },
  {
    title: "External Threat Feeds",
    description: "Integrate MITRE ATT&CK, VirusTotal for zero-day prediction. Enrich global map with real-time IOCs.",
    icon: Target,
    tag: "Intelligence",
  },
  {
    title: "UEBA Module",
    description: "Anomaly detection on user behavior addressing insider threats and 'Other' attack vectors.",
    icon: BarChart3,
    tag: "Detection",
  },
  {
    title: "CDN/Caching Layers",
    description: "Add Cloudflare for high-volume vectors. Target <2s average response time.",
    icon: Zap,
    tag: "Performance",
  },
];

const severityColors = {
  high: "text-red-400 border-red-500/30 bg-red-500/10",
  medium: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
  low: "text-green-400 border-green-500/30 bg-green-500/10",
};

const ThreatAnalysis = () => {
  return (
    <section id="analysis" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-cyber opacity-10" />
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/5 mb-6">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-400 font-medium">Threat Analysis Report</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Security <span className="text-gradient-cyber">Assessment</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Identified weaknesses and improvement strategies based on real-time monitoring data analysis.
          </p>
        </AnimatedSection>

        {/* Key Metrics Summary */}
        <AnimatedSection delay={100} className="mb-10">
          <div className="rounded-xl bg-card/60 backdrop-blur-md border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Key Metrics</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>99.9% uptime solid; all systems online with GPU/SW health nominal.</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>DDoS/phishing dominate attack pie (23-27%). 24h attacks/hour spike evenings.</span>
              </div>
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>Top targets: US/China (45%/23%). Endpoint/application vectors focused.</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Weaknesses */}
        <AnimatedSection delay={200} className="mb-10">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            Identified Weaknesses
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {weaknesses.map((w, i) => (
              <div key={i} className="rounded-xl bg-card/80 backdrop-blur-md border border-border p-5 hover:border-red-500/20 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <w.icon className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{w.title}</span>
                      <Badge variant="outline" className={`text-xs ${severityColors[w.severity]}`}>
                        {w.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{w.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Improvement Table */}
        <AnimatedSection delay={300} className="mb-10">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            System & Dashboard Upgrades
          </h3>
          <div className="rounded-xl bg-card/60 backdrop-blur-md border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-4 font-medium text-muted-foreground">Area</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Current Issue</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Improvement</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Expected Impact</th>
                </tr>
              </thead>
              <tbody>
                {improvements.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-foreground">{row.area}</td>
                    <td className="p-4 text-red-400">{row.issue}</td>
                    <td className="p-4 text-muted-foreground">{row.improvement}</td>
                    <td className="p-4 text-green-400">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        {/* Strategies */}
        <AnimatedSection delay={400}>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Improvement Strategies
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {strategies.map((s, i) => (
              <div key={i} className="rounded-xl bg-card/80 backdrop-blur-md border border-border p-5 hover:border-primary/30 transition-all group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-transform">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{s.title}</span>
                      <Badge variant="outline" className="text-xs text-primary border-primary/30 bg-primary/10">
                        {s.tag}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
};

export default ThreatAnalysis;
