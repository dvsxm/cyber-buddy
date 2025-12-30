import { useState, useEffect } from "react";
import { AlertTriangle, Shield, Activity, X } from "lucide-react";

interface Alert {
  id: number;
  type: "critical" | "warning" | "info";
  title: string;
  message: string;
  time: string;
}

const RealTimeAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);

  const alertTemplates = [
    { type: "critical", title: "Critical Threat Detected", message: "Ransomware attempt blocked from IP 192.168.1.45" },
    { type: "warning", title: "Suspicious Activity", message: "Multiple failed login attempts detected" },
    { type: "info", title: "System Update", message: "Security definitions updated successfully" },
    { type: "critical", title: "DDoS Attack Mitigated", message: "High-volume traffic blocked from botnet cluster" },
    { type: "warning", title: "Policy Violation", message: "Unauthorized USB device connection detected" },
  ] as const;

  useEffect(() => {
    const addAlert = () => {
      const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
      const newAlert: Alert = {
        id: Date.now(),
        type: template.type,
        title: template.title,
        message: template.message,
        time: "Just now",
      };

      setAlerts((prev) => [newAlert, ...prev.slice(0, 4)]);
    };

    // Initial alert
    addAlert();

    const interval = setInterval(addAlert, 8000);
    return () => clearInterval(interval);
  }, []);

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "critical":
        return {
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          icon: AlertTriangle,
          color: "text-red-400",
        };
      case "warning":
        return {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/30",
          icon: Activity,
          color: "text-yellow-400",
        };
      default:
        return {
          bg: "bg-primary/10",
          border: "border-primary/30",
          icon: Shield,
          color: "text-primary",
        };
    }
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed top-20 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
      >
        <Activity className="w-4 h-4 text-primary animate-pulse" />
        <span className="text-sm font-medium">{alerts.length} Active Alerts</span>
      </button>
    );
  }

  return (
    <div className="fixed top-20 right-4 z-40 w-80 space-y-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          Live Alerts
        </span>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Minimize
        </button>
      </div>

      {alerts.map((alert) => {
        const styles = getAlertStyles(alert.type);
        const Icon = styles.icon;

        return (
          <div
            key={alert.id}
            className={`${styles.bg} ${styles.border} border rounded-lg p-3 backdrop-blur-sm animate-fade-in shadow-lg`}
          >
            <div className="flex items-start gap-3">
              <Icon className={`w-5 h-5 ${styles.color} flex-shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-medium truncate">{alert.title}</h4>
                  <button
                    onClick={() => removeAlert(alert.id)}
                    className="p-1 hover:bg-background/50 rounded transition-colors"
                  >
                    <X className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{alert.time}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RealTimeAlerts;