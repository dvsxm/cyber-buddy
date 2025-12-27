import { memo, useEffect, useState } from "react";
import worldMapImage from "@/assets/world-map.png";

interface AttackArc {
  id: string;
  source: { x: number; y: number; country: string; code: string };
  target: { x: number; y: number; country: string; code: string };
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  progress: number;
}

// Country positions mapped to the actual map image (percentage-based for responsive positioning)
const COUNTRY_POSITIONS: { [key: string]: { x: number; y: number } } = {
  US: { x: 18, y: 42 },
  CA: { x: 20, y: 28 },
  MX: { x: 16, y: 52 },
  BR: { x: 32, y: 68 },
  AR: { x: 28, y: 82 },
  UK: { x: 46, y: 32 },
  DE: { x: 50, y: 34 },
  FR: { x: 47, y: 38 },
  IT: { x: 51, y: 40 },
  ES: { x: 44, y: 42 },
  NL: { x: 48, y: 32 },
  CH: { x: 49, y: 38 },
  RU: { x: 72, y: 26 },
  CN: { x: 80, y: 42 },
  JP: { x: 90, y: 40 },
  KR: { x: 87, y: 42 },
  IN: { x: 72, y: 50 },
  AU: { x: 88, y: 78 },
  SG: { x: 80, y: 58 },
  AE: { x: 62, y: 48 },
  ZA: { x: 55, y: 80 },
  NG: { x: 50, y: 56 },
  EG: { x: 55, y: 46 },
  IL: { x: 57, y: 44 },
  SA: { x: 60, y: 50 },
  PL: { x: 52, y: 32 },
  UA: { x: 56, y: 34 },
  TR: { x: 56, y: 40 },
  SE: { x: 52, y: 24 },
  NO: { x: 50, y: 22 },
  PK: { x: 68, y: 46 },
  ID: { x: 82, y: 62 },
  TH: { x: 78, y: 54 },
  VN: { x: 80, y: 52 },
  PH: { x: 86, y: 54 },
  MY: { x: 80, y: 58 },
  NZ: { x: 96, y: 88 },
  CL: { x: 26, y: 80 },
  CO: { x: 24, y: 56 },
  PE: { x: 24, y: 64 },
  KZ: { x: 68, y: 32 },
  IR: { x: 62, y: 44 },
  IQ: { x: 60, y: 44 },
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
  "APT",
  "Botnet",
];

const SEVERITIES: ("critical" | "high" | "medium" | "low")[] = ["critical", "high", "medium", "low"];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical": return "#ef4444";
    case "high": return "#f97316";
    case "medium": return "#eab308";
    case "low": return "#22d3ee";
    default: return "#22d3ee";
  }
};

interface WorldMapProps {
  onAttackGenerated?: (attack: AttackArc) => void;
}

const WorldMap = memo(({ onAttackGenerated }: WorldMapProps) => {
  const [attacks, setAttacks] = useState<AttackArc[]>([]);
  const [hotspots, setHotspots] = useState<string[]>([]);
  const [attackCount, setAttackCount] = useState(0);

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

      setAttacks(prev => [...prev.slice(-20), newAttack]);
      setHotspots(prev => {
        const updated = [...new Set([...prev, targetCode])].slice(-6);
        return updated;
      });
      setAttackCount(prev => prev + 1);
      
      if (onAttackGenerated) {
        onAttackGenerated(newAttack);
      }
    };

    const interval = setInterval(generateAttack, 600);
    generateAttack();

    return () => clearInterval(interval);
  }, [onAttackGenerated]);

  useEffect(() => {
    const animateArcs = () => {
      setAttacks(prev =>
        prev
          .map(attack => ({
            ...attack,
            progress: Math.min(attack.progress + 0.025, 1),
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
    const curveHeight = Math.min(distance * 0.35, 18);
    const controlY = midY - curveHeight;
    
    return `M ${source.x} ${source.y} Q ${midX} ${controlY} ${target.x} ${target.y}`;
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {/* Map Image Background */}
      <img 
        src={worldMapImage} 
        alt="World Map"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          filter: 'saturate(0.5) brightness(0.7) hue-rotate(180deg) contrast(1.1)',
        }}
      />
      
      {/* Subtle Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/40 via-transparent to-cyber-dark/50" />
      
      {/* Cyan Tint Overlay */}
      <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20" />
      
      {/* Scanline effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent animate-scan" />
      </div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, hsl(222 47% 4% / 0.8) 100%)'
        }}
      />
      
      {/* SVG Overlay for attacks */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
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
              <stop offset={`${Math.max(0, attack.progress * 100 - 20)}%`} stopColor={getSeverityColor(attack.severity)} stopOpacity="0.2" />
              <stop offset={`${attack.progress * 100}%`} stopColor={getSeverityColor(attack.severity)} stopOpacity="1" />
              <stop offset="100%" stopColor={getSeverityColor(attack.severity)} stopOpacity="0" />
            </linearGradient>
          ))}
          
          {/* Pulse animation for hotspots */}
          <radialGradient id="hotspotGradient">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="nodeGradient">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.5" />
          </radialGradient>
        </defs>

        {/* Country nodes */}
        {Object.entries(COUNTRY_POSITIONS).map(([code, pos]) => (
          <g key={code}>
            {/* Hotspot pulse effect */}
            {hotspots.includes(code) && (
              <>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="4"
                  fill="url(#hotspotGradient)"
                  className="animate-ping"
                  style={{ animationDuration: "1.5s", transformOrigin: `${pos.x}% ${pos.y}%` }}
                />
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="2.5"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="0.3"
                  opacity="0.6"
                />
              </>
            )}
            {/* Node dot */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={hotspots.includes(code) ? 1.2 : 0.7}
              fill={hotspots.includes(code) ? "#ef4444" : "#22d3ee"}
              filter="url(#glow)"
              className="transition-all duration-300"
            />
            {/* Node glow */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={hotspots.includes(code) ? 2 : 1.2}
              fill={hotspots.includes(code) ? "#ef4444" : "#22d3ee"}
              opacity="0.3"
            />
          </g>
        ))}

        {/* Attack arcs */}
        {attacks.map(attack => (
          <g key={attack.id}>
            {/* Arc trail */}
            <path
              d={createArcPath(attack.source, attack.target)}
              fill="none"
              stroke={`url(#attackGrad-${attack.id})`}
              strokeWidth="0.5"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            {/* Moving projectile */}
            <circle
              r="1"
              fill={getSeverityColor(attack.severity)}
              filter="url(#strongGlow)"
            >
              <animateMotion
                dur="1.8s"
                repeatCount="1"
                path={createArcPath(attack.source, attack.target)}
              />
            </circle>
            {/* Projectile glow */}
            <circle
              r="2"
              fill={getSeverityColor(attack.severity)}
              opacity="0.4"
            >
              <animateMotion
                dur="1.8s"
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
          { label: "Critical", color: "bg-red-500", shadow: "shadow-red-500/50" },
          { label: "High", color: "bg-orange-500", shadow: "shadow-orange-500/50" },
          { label: "Medium", color: "bg-yellow-500", shadow: "shadow-yellow-500/50" },
          { label: "Low", color: "bg-cyan-400", shadow: "shadow-cyan-400/50" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/40 backdrop-blur-sm">
            <span className={`w-2 h-2 rounded-full ${item.color} shadow-lg ${item.shadow}`} />
            <span className="text-foreground/80 font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Active attacks counter */}
      <div className="absolute top-4 left-4 px-4 py-2 rounded-lg bg-background/60 backdrop-blur-md border border-primary/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="w-3 h-3 rounded-full bg-red-500 block animate-pulse" />
            <span className="absolute inset-0 w-3 h-3 rounded-full bg-red-500 animate-ping" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Active Attacks</div>
            <div className="text-lg font-bold font-mono text-foreground">{attacks.length}</div>
          </div>
        </div>
      </div>
      
      {/* Total attacks counter */}
      <div className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-background/60 backdrop-blur-md border border-primary/30">
        <div className="text-xs text-muted-foreground">Total Detected</div>
        <div className="text-lg font-bold font-mono text-primary">{attackCount.toLocaleString()}</div>
      </div>
    </div>
  );
});

WorldMap.displayName = "WorldMap";

export default WorldMap;
export type { AttackArc };
