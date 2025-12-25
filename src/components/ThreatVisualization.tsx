import { useState, useEffect } from "react";
import { Shield, AlertTriangle, Activity, Globe, Zap, TrendingUp, Wifi, Server, Lock } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const ThreatVisualization = () => {
  const [activeThreats, setActiveThreats] = useState(247);
  const [blockedToday, setBlockedToday] = useState(15823);
  const [scanProgress, setScanProgress] = useState(0);
  const [pulseNodes, setPulseNodes] = useState<number[]>([]);

  useEffect(() => {
    // Simulate real-time threat updates
    const threatInterval = setInterval(() => {
      setActiveThreats(prev => Math.max(0, prev + Math.floor(Math.random() * 5) - 2));
    }, 2000);

    const blockedInterval = setInterval(() => {
      setBlockedToday(prev => prev + Math.floor(Math.random() * 3));
    }, 1000);

    const scanInterval = setInterval(() => {
      setScanProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    // Random pulse animation
    const pulseInterval = setInterval(() => {
      const randomNode = Math.floor(Math.random() * 6);
      setPulseNodes(prev => [...prev, randomNode]);
      setTimeout(() => {
        setPulseNodes(prev => prev.filter(n => n !== randomNode));
      }, 1000);
    }, 800);

    return () => {
      clearInterval(threatInterval);
      clearInterval(blockedInterval);
      clearInterval(scanInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  const liveMetrics = [
    {
      icon: AlertTriangle,
      label: "Active Threats",
      value: activeThreats.toLocaleString(),
      status: "Monitoring",
      statusColor: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "hover:border-yellow-400/50",
    },
    {
      icon: Shield,
      label: "Blocked Today",
      value: blockedToday.toLocaleString(),
      status: "Protected",
      statusColor: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "hover:border-green-400/50",
    },
    {
      icon: Activity,
      label: "Response Time",
      value: "< 50ms",
      status: "Optimal",
      statusColor: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "hover:border-primary/50",
    },
    {
      icon: Globe,
      label: "Global Coverage",
      value: "195",
      suffix: "countries",
      status: "Active",
      statusColor: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "hover:border-blue-400/50",
    },
  ];

  const recentThreats = [
    { type: "Ransomware", location: "Germany", time: "2s ago", severity: "high" },
    { type: "Phishing", location: "USA", time: "5s ago", severity: "medium" },
    { type: "DDoS Attempt", location: "Singapore", time: "12s ago", severity: "high" },
    { type: "Malware", location: "Brazil", time: "18s ago", severity: "low" },
    { type: "SQL Injection", location: "India", time: "25s ago", severity: "medium" },
  ];

  const networkNodes = [
    { icon: Server, label: "Server", x: "20%", y: "30%" },
    { icon: Wifi, label: "Network", x: "80%", y: "25%" },
    { icon: Lock, label: "Firewall", x: "50%", y: "50%" },
    { icon: Globe, label: "CDN", x: "15%", y: "70%" },
    { icon: Shield, label: "Shield", x: "85%", y: "70%" },
    { icon: Activity, label: "Monitor", x: "50%", y: "15%" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Live Threat Intelligence</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Real-Time <span className="text-gradient-cyber">Security Dashboard</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Monitor global threat activity and see our AI-powered defense system in action
          </p>
        </AnimatedSection>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Live Metrics */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {liveMetrics.map((metric, index) => (
              <AnimatedSection key={metric.label} delay={index * 100}>
                <div
                  className={`p-6 rounded-2xl bg-card border border-border ${metric.borderColor} transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${metric.bgColor} group-hover:scale-110 transition-all duration-300`}>
                      <metric.icon className={`w-6 h-6 ${metric.statusColor}`} />
                    </div>
                    <span className={`text-xs font-medium ${metric.statusColor} flex items-center gap-1`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {metric.status}
                    </span>
                  </div>
                  <div className="text-3xl font-bold mb-1 font-mono tabular-nums">
                    {metric.value}
                    {metric.suffix && <span className="text-sm text-muted-foreground ml-1">{metric.suffix}</span>}
                  </div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Live Threat Feed */}
          <AnimatedSection animation="fade-left" delay={200}>
            <div className="p-6 rounded-2xl bg-card border border-border h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Live Threat Feed
                </h3>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Auto-updating
                </span>
              </div>
              <div className="space-y-3">
                {recentThreats.map((threat, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-300 hover:translate-x-1 cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`w-2 h-2 rounded-full animate-pulse ${
                        threat.severity === "high"
                          ? "bg-red-500 shadow-lg shadow-red-500/50"
                          : threat.severity === "medium"
                          ? "bg-yellow-500 shadow-lg shadow-yellow-500/50"
                          : "bg-green-500 shadow-lg shadow-green-500/50"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{threat.type}</div>
                      <div className="text-xs text-muted-foreground">{threat.location}</div>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">{threat.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Network Visualization */}
        <AnimatedSection delay={300}>
          <div className="mt-8 p-8 rounded-2xl bg-card border border-border relative overflow-hidden h-64">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Network Security Map
            </h4>
            
            {/* Animated connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(186, 100%, 50%)" stopOpacity="0" />
                  <stop offset="50%" stopColor="hsl(186, 100%, 50%)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="hsl(186, 100%, 50%)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Connection lines */}
              <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" />
              <line x1="80%" y1="25%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: "200ms" }} />
              <line x1="15%" y1="70%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: "400ms" }} />
              <line x1="85%" y1="70%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: "600ms" }} />
              <line x1="50%" y1="15%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: "800ms" }} />
            </svg>

            {/* Network nodes */}
            {networkNodes.map((node, index) => (
              <div
                key={node.label}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                  pulseNodes.includes(index) ? "scale-125" : "scale-100"
                }`}
                style={{ left: node.x, top: node.y }}
              >
                <div className={`p-3 rounded-xl bg-muted border border-border ${
                  pulseNodes.includes(index) ? "border-primary shadow-lg shadow-primary/30" : ""
                } transition-all duration-300`}>
                  <node.icon className={`w-5 h-5 ${pulseNodes.includes(index) ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                  {node.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Scanning Progress Bar */}
        <AnimatedSection delay={400}>
          <div className="mt-6 p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">Global Network Scan</span>
              </div>
              <span className="text-sm text-primary font-mono tabular-nums">{scanProgress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-100 rounded-full relative"
                style={{ width: `${scanProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ThreatVisualization;
