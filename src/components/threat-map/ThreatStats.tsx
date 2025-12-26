import { memo, useEffect, useState } from "react";
import { Shield, AlertTriangle, Activity, Globe, Zap, TrendingUp, Target, Server } from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  suffix?: string;
  trend?: number;
  color: "cyan" | "red" | "yellow" | "green" | "orange" | "purple";
  animate?: boolean;
}

const colorStyles = {
  cyan: {
    bg: "bg-primary/10",
    text: "text-primary",
    glow: "shadow-primary/20",
  },
  red: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    glow: "shadow-red-500/20",
  },
  yellow: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    glow: "shadow-yellow-500/20",
  },
  green: {
    bg: "bg-green-500/10",
    text: "text-green-400",
    glow: "shadow-green-500/20",
  },
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    glow: "shadow-orange-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    glow: "shadow-purple-500/20",
  },
};

const StatCard = memo(({ icon: Icon, label, value, suffix, trend, color, animate }: StatCardProps) => {
  const styles = colorStyles[color];

  return (
    <div className={`p-4 rounded-xl bg-card border border-border hover:border-${color === "cyan" ? "primary" : color + "-500"}/30 transition-all duration-300 group hover:shadow-lg ${styles.glow}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${styles.bg} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-4 h-4 ${styles.text}`} />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs ${trend > 0 ? "text-red-400" : "text-green-400"}`}>
            <TrendingUp className={`w-3 h-3 ${trend < 0 ? "rotate-180" : ""}`} />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className={`text-2xl font-bold font-mono tabular-nums mb-1 ${animate ? "transition-all duration-300" : ""}`}>
        {typeof value === "number" ? value.toLocaleString() : value}
        {suffix && <span className="text-sm text-muted-foreground ml-1">{suffix}</span>}
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
});

StatCard.displayName = "StatCard";

const ThreatStats = memo(() => {
  const [stats, setStats] = useState({
    activeThreats: 1247,
    blockedToday: 158234,
    criticalAlerts: 23,
    countriesTargeted: 89,
    attacksPerSecond: 847,
    malwareBlocked: 45623,
    phishingBlocked: 23456,
    ddosBlocked: 12345,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeThreats: prev.activeThreats + Math.floor(Math.random() * 10) - 4,
        blockedToday: prev.blockedToday + Math.floor(Math.random() * 15),
        criticalAlerts: Math.max(0, prev.criticalAlerts + Math.floor(Math.random() * 3) - 1),
        countriesTargeted: Math.min(195, Math.max(50, prev.countriesTargeted + Math.floor(Math.random() * 3) - 1)),
        attacksPerSecond: Math.max(100, prev.attacksPerSecond + Math.floor(Math.random() * 50) - 25),
        malwareBlocked: prev.malwareBlocked + Math.floor(Math.random() * 8),
        phishingBlocked: prev.phishingBlocked + Math.floor(Math.random() * 5),
        ddosBlocked: prev.ddosBlocked + Math.floor(Math.random() * 3),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard
        icon={AlertTriangle}
        label="Active Threats"
        value={stats.activeThreats}
        color="red"
        trend={12}
        animate
      />
      <StatCard
        icon={Shield}
        label="Blocked Today"
        value={stats.blockedToday}
        color="green"
        animate
      />
      <StatCard
        icon={Zap}
        label="Critical Alerts"
        value={stats.criticalAlerts}
        color="orange"
        trend={-5}
        animate
      />
      <StatCard
        icon={Globe}
        label="Countries Targeted"
        value={stats.countriesTargeted}
        color="cyan"
        animate
      />
      <StatCard
        icon={Activity}
        label="Attacks/Second"
        value={stats.attacksPerSecond}
        color="yellow"
        animate
      />
      <StatCard
        icon={Target}
        label="Malware Blocked"
        value={stats.malwareBlocked}
        color="purple"
        animate
      />
      <StatCard
        icon={Server}
        label="Phishing Blocked"
        value={stats.phishingBlocked}
        color="cyan"
        animate
      />
      <StatCard
        icon={Shield}
        label="DDoS Mitigated"
        value={stats.ddosBlocked}
        color="green"
        animate
      />
    </div>
  );
});

ThreatStats.displayName = "ThreatStats";

export default ThreatStats;
