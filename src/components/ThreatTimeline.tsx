import { memo, useState, useEffect } from "react";
import { Activity, TrendingDown, TrendingUp, Clock } from "lucide-react";

const ThreatTimeline = memo(() => {
  const [data, setData] = useState([
    { time: "00:00", threats: 124, blocked: 121 },
    { time: "04:00", threats: 89, blocked: 89 },
    { time: "08:00", threats: 156, blocked: 154 },
    { time: "12:00", threats: 245, blocked: 242 },
    { time: "16:00", threats: 312, blocked: 308 },
    { time: "20:00", threats: 198, blocked: 196 },
    { time: "Now", threats: 167, blocked: 165 },
  ]);

  const maxThreats = Math.max(...data.map(d => d.threats));
  
  // Calculate MTTD and MTTR
  const mttd = "1.2s";
  const mttr = "3.4s";

  return (
    <div className="rounded-2xl bg-card/60 backdrop-blur-md border border-border p-6 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Threat Timeline</h3>
            <p className="text-xs text-muted-foreground">Last 24 hours activity</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="text-xs text-muted-foreground">Threats</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="text-xs text-muted-foreground">Blocked</span>
          </div>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="relative h-40 mb-6">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-t border-border/30" />
          ))}
        </div>
        
        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-between gap-2 pb-6">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="relative w-full flex items-end justify-center gap-0.5" style={{ height: '120px' }}>
                {/* Threats bar */}
                <div
                  className="w-2 bg-gradient-to-t from-red-500/80 to-red-400/40 rounded-t transition-all duration-500 group-hover:from-red-500 group-hover:to-red-400"
                  style={{ height: `${(item.threats / maxThreats) * 100}%` }}
                />
                {/* Blocked bar */}
                <div
                  className="w-2 bg-gradient-to-t from-green-500/80 to-green-400/40 rounded-t transition-all duration-500 group-hover:from-green-500 group-hover:to-green-400"
                  style={{ height: `${(item.blocked / maxThreats) * 100}%` }}
                />
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border border-border rounded-lg p-2 text-xs whitespace-nowrap z-10 shadow-lg">
                  <p className="text-foreground font-medium">{item.time}</p>
                  <p className="text-red-400">{item.threats} threats</p>
                  <p className="text-green-400">{item.blocked} blocked</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-lg font-bold text-foreground font-mono">{mttd}</span>
          </div>
          <p className="text-xs text-muted-foreground">MTTD</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-lg font-bold text-foreground font-mono">{mttr}</span>
          </div>
          <p className="text-xs text-muted-foreground">MTTR</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingDown className="w-4 h-4 text-green-400" />
            <span className="text-lg font-bold text-green-400 font-mono">99.2%</span>
          </div>
          <p className="text-xs text-muted-foreground">Block Rate</p>
        </div>
      </div>
    </div>
  );
});

ThreatTimeline.displayName = "ThreatTimeline";

export default ThreatTimeline;
