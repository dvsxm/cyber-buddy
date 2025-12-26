import { memo, useEffect, useState } from "react";
import { PieChart, Shield, Bug, Zap, Crosshair, Database, Lock, Wifi, Globe } from "lucide-react";

interface AttackType {
  name: string;
  icon: React.ElementType;
  count: number;
  percentage: number;
  color: string;
  trend: "up" | "down" | "stable";
}

const AttackTypeBreakdown = memo(() => {
  const [attackTypes, setAttackTypes] = useState<AttackType[]>([
    { name: "Ransomware", icon: Lock, count: 34567, percentage: 28, color: "bg-red-500", trend: "up" },
    { name: "DDoS", icon: Zap, count: 28934, percentage: 23, color: "bg-orange-500", trend: "stable" },
    { name: "Phishing", icon: Crosshair, count: 21456, percentage: 17, color: "bg-yellow-500", trend: "up" },
    { name: "Malware", icon: Bug, count: 18234, percentage: 15, color: "bg-green-500", trend: "down" },
    { name: "SQL Injection", icon: Database, count: 12345, percentage: 10, color: "bg-cyan-500", trend: "stable" },
    { name: "Zero-Day", icon: Shield, count: 5678, percentage: 4, color: "bg-blue-500", trend: "up" },
    { name: "Man-in-the-Middle", icon: Wifi, count: 2345, percentage: 2, color: "bg-purple-500", trend: "down" },
    { name: "Other", icon: Globe, count: 1234, percentage: 1, color: "bg-gray-500", trend: "stable" },
  ]);

  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAttackTypes(prev =>
        prev.map(type => ({
          ...type,
          count: type.count + Math.floor(Math.random() * 10),
        }))
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const total = attackTypes.reduce((sum, type) => sum + type.count, 0);

  // Create SVG donut chart
  const createDonutSegments = () => {
    let accumulatedPercentage = 0;
    return attackTypes.map((type, index) => {
      const percentage = (type.count / total) * 100;
      const startAngle = (accumulatedPercentage / 100) * 360;
      const endAngle = ((accumulatedPercentage + percentage) / 100) * 360;
      accumulatedPercentage += percentage;

      const startRad = (startAngle - 90) * (Math.PI / 180);
      const endRad = (endAngle - 90) * (Math.PI / 180);

      const x1 = 50 + 40 * Math.cos(startRad);
      const y1 = 50 + 40 * Math.sin(startRad);
      const x2 = 50 + 40 * Math.cos(endRad);
      const y2 = 50 + 40 * Math.sin(endRad);

      const largeArcFlag = percentage > 50 ? 1 : 0;

      const pathD = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      const colorMap: { [key: string]: string } = {
        "bg-red-500": "#ef4444",
        "bg-orange-500": "#f97316",
        "bg-yellow-500": "#eab308",
        "bg-green-500": "#22c55e",
        "bg-cyan-500": "#06b6d4",
        "bg-blue-500": "#3b82f6",
        "bg-purple-500": "#a855f7",
        "bg-gray-500": "#6b7280",
      };

      return (
        <path
          key={type.name}
          d={pathD}
          fill={colorMap[type.color]}
          className={`transition-all duration-300 cursor-pointer ${
            selectedType === type.name ? "opacity-100" : selectedType ? "opacity-40" : "opacity-80 hover:opacity-100"
          }`}
          onMouseEnter={() => setSelectedType(type.name)}
          onMouseLeave={() => setSelectedType(null)}
        />
      );
    });
  };

  return (
    <div className="p-5 rounded-xl bg-card border border-border">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-lg bg-primary/10">
          <PieChart className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-semibold text-sm">Attack Type Distribution</h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Donut chart */}
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-48 h-48">
            {createDonutSegments()}
            {/* Center hole */}
            <circle cx="50" cy="50" r="25" fill="hsl(var(--card))" />
            {/* Center text */}
            <text x="50" y="46" textAnchor="middle" className="fill-foreground text-[8px] font-bold">
              {total.toLocaleString()}
            </text>
            <text x="50" y="56" textAnchor="middle" className="fill-muted-foreground text-[4px]">
              Total Attacks
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {attackTypes.map(type => {
            const Icon = type.icon;
            return (
              <div
                key={type.name}
                className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 cursor-pointer ${
                  selectedType === type.name ? "bg-muted" : "hover:bg-muted/50"
                }`}
                onMouseEnter={() => setSelectedType(type.name)}
                onMouseLeave={() => setSelectedType(null)}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${type.color}`} />
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-sm font-medium">{type.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono tabular-nums text-muted-foreground">
                    {((type.count / total) * 100).toFixed(1)}%
                  </span>
                  <span className="text-xs font-mono tabular-nums">{type.count.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

AttackTypeBreakdown.displayName = "AttackTypeBreakdown";

export default AttackTypeBreakdown;
