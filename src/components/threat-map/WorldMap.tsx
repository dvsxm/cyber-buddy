import { memo, useEffect, useState } from "react";

interface AttackArc {
  id: string;
  source: { x: number; y: number; country: string; code: string };
  target: { x: number; y: number; country: string; code: string };
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  progress: number;
}

// Simplified world map path - major continents outline
const WORLD_PATH = "M113.7,91.6l1.1,1.4l-0.3,1.4l-2.5,0.8l-1-0.3l-0.5-1.4l1.1-1.2L113.7,91.6z M121.3,95.6l1.4,1.2l-0.3,1.4l-2.3,0.3l-1.4-0.5l-0.3-1.4L121.3,95.6z M156.5,78.1l2,1.1l0.3,1.4l-1.4,1.1l-2.3-0.3l-0.8-1.4L156.5,78.1z M167.8,75.3l1.7,0.8l-0.3,1.1l-1.4,0.6l-1.1-0.6l0-0.8L167.8,75.3z M89.9,68.6l4.5,1.7l3.1,3.4l-0.3,4l-3.4,2.3l-4.5-0.3l-3.4-2.5l0.3-4.5L89.9,68.6z M144.6,55.3l6.8,2.5l4.5,3.4l1.1,4.5l-2.5,4l-5.1,2l-6.2-1.1l-4.5-3.4l-0.6-4.5l2.8-4L144.6,55.3z";

const COUNTRY_POSITIONS: { [key: string]: { x: number; y: number } } = {
  US: { x: 20, y: 35 },
  CA: { x: 18, y: 25 },
  MX: { x: 17, y: 45 },
  BR: { x: 32, y: 62 },
  AR: { x: 28, y: 75 },
  UK: { x: 46, y: 28 },
  DE: { x: 50, y: 30 },
  FR: { x: 47, y: 33 },
  IT: { x: 51, y: 36 },
  ES: { x: 44, y: 37 },
  NL: { x: 48, y: 29 },
  CH: { x: 49, y: 33 },
  RU: { x: 70, y: 25 },
  CN: { x: 78, y: 38 },
  JP: { x: 88, y: 38 },
  KR: { x: 85, y: 38 },
  IN: { x: 72, y: 45 },
  AU: { x: 88, y: 70 },
  SG: { x: 80, y: 55 },
  AE: { x: 62, y: 45 },
  ZA: { x: 55, y: 72 },
  NG: { x: 50, y: 52 },
  EG: { x: 55, y: 42 },
  IL: { x: 57, y: 40 },
  SA: { x: 60, y: 48 },
  PL: { x: 52, y: 29 },
  UA: { x: 56, y: 30 },
  TR: { x: 56, y: 36 },
  SE: { x: 52, y: 22 },
  NO: { x: 50, y: 20 },
};

const ATTACK_TYPES = [
  "Ransomware",
  "DDoS",
  "Phishing",
  "Malware",
  "SQL Injection",
  "XSS",
  "Zero-Day",
  "Brute Force",
  "Man-in-the-Middle",
  "Cryptojacking",
];

const SEVERITIES: ("critical" | "high" | "medium" | "low")[] = ["critical", "high", "medium", "low"];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical": return "hsl(0, 90%, 55%)";
    case "high": return "hsl(25, 95%, 55%)";
    case "medium": return "hsl(45, 90%, 50%)";
    case "low": return "hsl(186, 100%, 50%)";
    default: return "hsl(186, 100%, 50%)";
  }
};

interface WorldMapProps {
  onAttackGenerated?: (attack: AttackArc) => void;
}

const WorldMap = memo(({ onAttackGenerated }: WorldMapProps) => {
  const [attacks, setAttacks] = useState<AttackArc[]>([]);
  const [hotspots, setHotspots] = useState<string[]>([]);

  useEffect(() => {
    const countries = Object.keys(COUNTRY_POSITIONS);
    
    const generateAttack = () => {
      const sourceIdx = Math.floor(Math.random() * countries.length);
      let targetIdx = Math.floor(Math.random() * countries.length);
      while (targetIdx === sourceIdx) {
        targetIdx = Math.floor(Math.random() * countries.length);
      }
      
      const sourceCode = countries[sourceIdx];
      const targetCode = countries[targetIdx];
      
      const newAttack: AttackArc = {
        id: `${Date.now()}-${Math.random()}`,
        source: { ...COUNTRY_POSITIONS[sourceCode], country: sourceCode, code: sourceCode },
        target: { ...COUNTRY_POSITIONS[targetCode], country: targetCode, code: targetCode },
        type: ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)],
        severity: SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)],
        progress: 0,
      };

      setAttacks(prev => [...prev.slice(-15), newAttack]);
      setHotspots(prev => {
        const updated = [...new Set([...prev, targetCode])].slice(-5);
        return updated;
      });
      
      if (onAttackGenerated) {
        onAttackGenerated(newAttack);
      }
    };

    const interval = setInterval(generateAttack, 800);
    generateAttack();

    return () => clearInterval(interval);
  }, [onAttackGenerated]);

  useEffect(() => {
    const animateArcs = () => {
      setAttacks(prev =>
        prev
          .map(attack => ({
            ...attack,
            progress: Math.min(attack.progress + 0.03, 1),
          }))
          .filter(attack => attack.progress < 1)
      );
    };

    const frameInterval = setInterval(animateArcs, 16);
    return () => clearInterval(frameInterval);
  }, []);

  const createArcPath = (source: { x: number; y: number }, target: { x: number; y: number }) => {
    const midX = (source.x + target.x) / 2;
    const midY = (source.y + target.y) / 2;
    const distance = Math.sqrt(Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2));
    const curveHeight = Math.min(distance * 0.3, 15);
    const controlY = midY - curveHeight;
    
    return `M ${source.x} ${source.y} Q ${midX} ${controlY} ${target.x} ${target.y}`;
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-cyber-dark to-background rounded-xl overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-cyber opacity-30" />
      
      {/* Scanline effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent animate-scan" />
      </div>
      
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Attack arc gradients */}
          {attacks.map(attack => (
            <linearGradient
              key={`grad-${attack.id}`}
              id={`attackGrad-${attack.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={getSeverityColor(attack.severity)} stopOpacity="0" />
              <stop offset={`${attack.progress * 100}%`} stopColor={getSeverityColor(attack.severity)} stopOpacity="0.8" />
              <stop offset="100%" stopColor={getSeverityColor(attack.severity)} stopOpacity="0" />
            </linearGradient>
          ))}
          
          {/* Pulse animation for hotspots */}
          <radialGradient id="hotspotGradient">
            <stop offset="0%" stopColor="hsl(0, 90%, 55%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(0, 90%, 55%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* World map outline (simplified) */}
        <g className="opacity-20">
          {/* North America */}
          <ellipse cx="20" cy="35" rx="15" ry="20" fill="none" stroke="hsl(186, 100%, 50%)" strokeWidth="0.2" />
          {/* South America */}
          <ellipse cx="30" cy="65" rx="10" ry="18" fill="none" stroke="hsl(186, 100%, 50%)" strokeWidth="0.2" />
          {/* Europe */}
          <ellipse cx="50" cy="30" rx="10" ry="8" fill="none" stroke="hsl(186, 100%, 50%)" strokeWidth="0.2" />
          {/* Africa */}
          <ellipse cx="52" cy="55" rx="12" ry="18" fill="none" stroke="hsl(186, 100%, 50%)" strokeWidth="0.2" />
          {/* Asia */}
          <ellipse cx="75" cy="35" rx="18" ry="15" fill="none" stroke="hsl(186, 100%, 50%)" strokeWidth="0.2" />
          {/* Australia */}
          <ellipse cx="88" cy="70" rx="8" ry="6" fill="none" stroke="hsl(186, 100%, 50%)" strokeWidth="0.2" />
        </g>

        {/* Country nodes */}
        {Object.entries(COUNTRY_POSITIONS).map(([code, pos]) => (
          <g key={code}>
            {/* Hotspot pulse effect */}
            {hotspots.includes(code) && (
              <circle
                cx={pos.x}
                cy={pos.y}
                r="3"
                fill="url(#hotspotGradient)"
                className="animate-ping"
                style={{ animationDuration: "1.5s" }}
              />
            )}
            {/* Node dot */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={hotspots.includes(code) ? 1 : 0.6}
              fill={hotspots.includes(code) ? "hsl(0, 90%, 55%)" : "hsl(186, 100%, 50%)"}
              filter="url(#glow)"
              className="transition-all duration-300"
            />
          </g>
        ))}

        {/* Attack arcs */}
        {attacks.map(attack => (
          <g key={attack.id}>
            {/* Arc path */}
            <path
              d={createArcPath(attack.source, attack.target)}
              fill="none"
              stroke={`url(#attackGrad-${attack.id})`}
              strokeWidth="0.4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            {/* Moving projectile */}
            <circle
              r="0.8"
              fill={getSeverityColor(attack.severity)}
              filter="url(#glow)"
            >
              <animateMotion
                dur="1.5s"
                repeatCount="1"
                path={createArcPath(attack.source, attack.target)}
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 text-xs">
        {[
          { label: "Critical", color: "bg-red-500" },
          { label: "High", color: "bg-orange-500" },
          { label: "Medium", color: "bg-yellow-500" },
          { label: "Low", color: "bg-primary" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${item.color}`} />
            <span className="text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Active attacks counter */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-card/80 backdrop-blur-sm border border-border">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-medium">{attacks.length} Active Attacks</span>
        </div>
      </div>
    </div>
  );
});

WorldMap.displayName = "WorldMap";

export default WorldMap;
export type { AttackArc };
