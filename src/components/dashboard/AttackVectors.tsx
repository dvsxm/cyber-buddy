import { memo } from "react";
import { Target, TrendingUp, TrendingDown } from "lucide-react";

const vectors = [
  { name: "Network", count: 456, trend: 12, color: "bg-destructive" },
  { name: "Application", count: 234, trend: -8, color: "bg-chart-2" },
  { name: "Endpoint", count: 189, trend: 5, color: "bg-chart-3" },
  { name: "Cloud", count: 145, trend: 23, color: "bg-chart-4" },
  { name: "Identity", count: 78, trend: -3, color: "bg-chart-5" },
];

const maxCount = Math.max(...vectors.map((v) => v.count));

const AttackVectors = memo(() => {
  return (
    <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-4 h-4 text-primary" />
        <h4 className="font-semibold text-sm">Attack Vectors</h4>
      </div>

      <div className="space-y-3">
        {vectors.map((vector, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{vector.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">{vector.count}</span>
                <span className={`flex items-center gap-0.5 ${vector.trend > 0 ? "text-destructive" : "text-chart-1"}`}>
                  {vector.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(vector.trend)}%
                </span>
              </div>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${vector.color} rounded-full transition-all duration-500`}
                style={{ width: `${(vector.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

AttackVectors.displayName = "AttackVectors";

export default AttackVectors;
