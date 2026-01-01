import { memo, useState, useEffect } from "react";
import { Server, CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface System {
  name: string;
  status: "healthy" | "warning" | "critical";
  uptime: number;
  latency: number;
}

const initialSystems: System[] = [
  { name: "Firewall", status: "healthy", uptime: 99.99, latency: 12 },
  { name: "IDS/IPS", status: "healthy", uptime: 99.95, latency: 8 },
  { name: "SIEM", status: "warning", uptime: 98.5, latency: 45 },
  { name: "EDR", status: "healthy", uptime: 99.9, latency: 15 },
  { name: "WAF", status: "healthy", uptime: 99.98, latency: 5 },
];

const getStatusIcon = (status: System["status"]) => {
  switch (status) {
    case "healthy":
      return <CheckCircle2 className="w-3.5 h-3.5 text-chart-1" />;
    case "warning":
      return <AlertCircle className="w-3.5 h-3.5 text-accent" />;
    case "critical":
      return <XCircle className="w-3.5 h-3.5 text-destructive" />;
  }
};

const getStatusColor = (status: System["status"]) => {
  switch (status) {
    case "healthy":
      return "bg-chart-1/20 border-chart-1/30";
    case "warning":
      return "bg-accent/20 border-accent/30";
    case "critical":
      return "bg-destructive/20 border-destructive/30";
  }
};

const SystemHealth = memo(() => {
  const [systems, setSystems] = useState(initialSystems);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystems((prev) =>
        prev.map((system) => ({
          ...system,
          latency: Math.max(1, system.latency + Math.floor(Math.random() * 10) - 5),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const healthyCount = systems.filter((s) => s.status === "healthy").length;

  return (
    <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-chart-1" />
          <h4 className="font-semibold text-sm">System Health</h4>
        </div>
        <span className="text-xs text-chart-1 font-mono">
          {healthyCount}/{systems.length} OK
        </span>
      </div>

      <div className="space-y-2">
        {systems.map((system, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-2 rounded-lg border ${getStatusColor(system.status)} transition-all`}
          >
            <div className="flex items-center gap-2">
              {getStatusIcon(system.status)}
              <span className="text-xs font-medium">{system.name}</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <span>{system.uptime}%</span>
              <span className="font-mono">{system.latency}ms</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

SystemHealth.displayName = "SystemHealth";

export default SystemHealth;
