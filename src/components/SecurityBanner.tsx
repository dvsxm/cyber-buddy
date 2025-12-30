import { useState, useEffect } from "react";
import { Shield, AlertTriangle, CheckCircle, X, Bell, ExternalLink } from "lucide-react";

const SecurityBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAlert, setCurrentAlert] = useState(0);

  const alerts = [
    {
      type: "success",
      icon: CheckCircle,
      message: "All systems operational – 99.99% uptime this month",
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
    },
    {
      type: "info",
      icon: Shield,
      message: "158,234 threats blocked in the last 24 hours",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/30",
    },
    {
      type: "warning",
      icon: Bell,
      message: "New security update available – Schedule maintenance",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % alerts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const alert = alerts[currentAlert];
  const AlertIcon = alert.icon;

  return (
    <div className={`fixed bottom-4 right-4 z-50 max-w-sm animate-fade-in`}>
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl ${alert.bg} ${alert.border} border backdrop-blur-md shadow-lg`}
      >
        <AlertIcon className={`w-5 h-5 ${alert.color} flex-shrink-0`} />
        <p className="text-sm text-foreground flex-1">{alert.message}</p>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-background/50 rounded transition-colors">
            <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-background/50 rounded transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </div>
      
      {/* Progress indicators */}
      <div className="flex gap-1 mt-2 justify-center">
        {alerts.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentAlert
                ? "w-6 bg-primary"
                : "w-2 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SecurityBanner;