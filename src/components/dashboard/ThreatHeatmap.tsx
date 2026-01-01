import { memo } from "react";
import { Flame } from "lucide-react";

const heatmapData = [
  [2, 4, 6, 8, 5, 3, 1],
  [3, 5, 7, 9, 6, 4, 2],
  [4, 6, 8, 10, 7, 5, 3],
  [5, 7, 9, 8, 6, 4, 2],
  [4, 6, 8, 7, 5, 3, 1],
  [3, 5, 7, 6, 4, 2, 1],
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"];

const getHeatColor = (value: number): string => {
  if (value <= 2) return "bg-chart-1/20";
  if (value <= 4) return "bg-chart-1/40";
  if (value <= 6) return "bg-accent/40";
  if (value <= 8) return "bg-destructive/40";
  return "bg-destructive/70";
};

const ThreatHeatmap = memo(() => {
  return (
    <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-4 h-4 text-destructive" />
        <h4 className="font-semibold text-sm">Threat Heatmap</h4>
      </div>
      
      <div className="space-y-1">
        {/* Day headers */}
        <div className="flex gap-1 pl-10">
          {days.map((day) => (
            <div key={day} className="flex-1 text-[10px] text-muted-foreground text-center">
              {day.slice(0, 1)}
            </div>
          ))}
        </div>
        
        {/* Heatmap grid */}
        {heatmapData.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 items-center">
            <span className="w-9 text-[9px] text-muted-foreground">{hours[rowIndex]}</span>
            {row.map((value, colIndex) => (
              <div
                key={colIndex}
                className={`flex-1 aspect-square rounded-sm ${getHeatColor(value)} transition-all hover:scale-110 cursor-pointer`}
                title={`${days[colIndex]} ${hours[rowIndex]}: ${value} threats`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 text-[10px] text-muted-foreground">
        <span>Low</span>
        <div className="flex gap-0.5">
          {[1, 3, 5, 7, 9].map((v) => (
            <div key={v} className={`w-3 h-2 rounded-sm ${getHeatColor(v)}`} />
          ))}
        </div>
        <span>High</span>
      </div>
    </div>
  );
});

ThreatHeatmap.displayName = "ThreatHeatmap";

export default ThreatHeatmap;
