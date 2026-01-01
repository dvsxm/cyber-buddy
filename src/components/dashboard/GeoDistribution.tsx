import { memo } from "react";
import { Globe } from "lucide-react";

const regions = [
  { name: "North America", code: "NA", count: 1245, percentage: 32 },
  { name: "Europe", code: "EU", count: 987, percentage: 25 },
  { name: "Asia Pacific", code: "AP", count: 876, percentage: 22 },
  { name: "South America", code: "SA", count: 432, percentage: 11 },
  { name: "Middle East", code: "ME", count: 389, percentage: 10 },
];

const GeoDistribution = memo(() => {
  return (
    <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-4 h-4 text-accent" />
        <h4 className="font-semibold text-sm">Geo Distribution</h4>
      </div>

      <div className="space-y-2">
        {regions.map((region, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary/20 transition-colors">
              {region.code}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{region.name}</p>
              <p className="text-[10px] text-muted-foreground">{region.count.toLocaleString()} attacks</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold font-mono">{region.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

GeoDistribution.displayName = "GeoDistribution";

export default GeoDistribution;
