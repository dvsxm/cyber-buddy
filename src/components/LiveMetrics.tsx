import { useState, useEffect } from "react";
import { Activity, TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  trend: "up" | "down" | "stable";
  color: string;
  sparkline: number[];
}

const LiveMetrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: "1",
      name: "Active Sessions",
      value: 12847,
      unit: "",
      change: 12.5,
      trend: "up",
      color: "text-green-400",
      sparkline: [30, 45, 35, 60, 55, 70, 65, 80, 75, 90],
    },
    {
      id: "2",
      name: "Threats Blocked",
      value: 158234,
      unit: "/hr",
      change: 8.3,
      trend: "up",
      color: "text-primary",
      sparkline: [40, 35, 50, 45, 60, 55, 70, 65, 75, 80],
    },
    {
      id: "3",
      name: "Avg Response Time",
      value: 24,
      unit: "ms",
      change: -15.2,
      trend: "down",
      color: "text-yellow-400",
      sparkline: [80, 75, 70, 65, 55, 50, 45, 40, 35, 24],
    },
    {
      id: "4",
      name: "System Load",
      value: 42,
      unit: "%",
      change: 0.5,
      trend: "stable",
      color: "text-accent",
      sparkline: [40, 42, 41, 43, 42, 44, 41, 43, 42, 42],
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: Math.max(
            0,
            metric.value + Math.floor(Math.random() * 20) - 10
          ),
          sparkline: [
            ...metric.sparkline.slice(1),
            metric.sparkline[metric.sparkline.length - 1] +
              Math.floor(Math.random() * 10) - 5,
          ],
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const TrendIcon = ({ trend }: { trend: "up" | "down" | "stable" }) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <AnimatedSection key={metric.id} delay={index * 100}>
                <div className="relative p-5 rounded-xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3 relative">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {metric.name}
                    </span>
                    <Activity className={`w-4 h-4 ${metric.color} animate-pulse`} />
                  </div>

                  {/* Value */}
                  <div className="flex items-baseline gap-1 mb-3 relative">
                    <span className="text-3xl font-bold font-mono text-foreground">
                      {metric.value.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">{metric.unit}</span>
                  </div>

                  {/* Sparkline */}
                  <div className="h-8 flex items-end gap-0.5 mb-3 relative">
                    {metric.sparkline.map((value, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t transition-all duration-300 ${
                          i === metric.sparkline.length - 1
                            ? "bg-primary"
                            : "bg-primary/30"
                        }`}
                        style={{
                          height: `${Math.max(10, (value / Math.max(...metric.sparkline)) * 100)}%`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Change */}
                  <div className="flex items-center gap-2 relative">
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        metric.trend === "up"
                          ? "bg-green-500/10 text-green-400"
                          : metric.trend === "down"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <TrendIcon trend={metric.trend} />
                      <span>{Math.abs(metric.change)}%</span>
                    </div>
                    <span className="text-xs text-muted-foreground">vs last hour</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LiveMetrics;