import { useState, useEffect } from "react";
import { Shield, AlertTriangle, Activity, Globe, Zap, TrendingUp } from "lucide-react";

const ThreatVisualization = () => {
  const [activeThreats, setActiveThreats] = useState(247);
  const [blockedToday, setBlockedToday] = useState(15823);
  const [scanProgress, setScanProgress] = useState(0);

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

    return () => {
      clearInterval(threatInterval);
      clearInterval(blockedInterval);
      clearInterval(scanInterval);
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
    },
    {
      icon: Shield,
      label: "Blocked Today",
      value: blockedToday.toLocaleString(),
      status: "Protected",
      statusColor: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      icon: Activity,
      label: "Response Time",
      value: "< 50ms",
      status: "Optimal",
      statusColor: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Globe,
      label: "Global Coverage",
      value: "195",
      suffix: "countries",
      status: "Active",
      statusColor: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
  ];

  const recentThreats = [
    { type: "Ransomware", location: "Germany", time: "2s ago", severity: "high" },
    { type: "Phishing", location: "USA", time: "5s ago", severity: "medium" },
    { type: "DDoS Attempt", location: "Singapore", time: "12s ago", severity: "high" },
    { type: "Malware", location: "Brazil", time: "18s ago", severity: "low" },
    { type: "SQL Injection", location: "India", time: "25s ago", severity: "medium" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Live Threat Intelligence</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Real-Time <span className="text-gradient-cyber">Security Dashboard</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Monitor global threat activity and see our AI-powered defense system in action
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Live Metrics */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {liveMetrics.map((metric, index) => (
              <div
                key={metric.label}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${metric.bgColor} group-hover:glow-cyber transition-all duration-300`}>
                    <metric.icon className={`w-6 h-6 ${metric.statusColor}`} />
                  </div>
                  <span className={`text-xs font-medium ${metric.statusColor} flex items-center gap-1`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {metric.status}
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1 font-mono">
                  {metric.value}
                  {metric.suffix && <span className="text-sm text-muted-foreground ml-1">{metric.suffix}</span>}
                </div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Live Threat Feed */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Live Threat Feed
              </h3>
              <span className="text-xs text-muted-foreground">Auto-updating</span>
            </div>
            <div className="space-y-3">
              {recentThreats.map((threat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      threat.severity === "high"
                        ? "bg-red-500"
                        : threat.severity === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{threat.type}</div>
                    <div className="text-xs text-muted-foreground">{threat.location}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{threat.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scanning Progress Bar */}
        <div className="mt-8 p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-medium">Global Network Scan</span>
            </div>
            <span className="text-sm text-primary font-mono">{scanProgress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100 rounded-full"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreatVisualization;
