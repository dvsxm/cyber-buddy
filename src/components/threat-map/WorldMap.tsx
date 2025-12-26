import { memo, useEffect, useState } from "react";

interface AttackArc {
  id: string;
  source: { x: number; y: number; country: string; code: string };
  target: { x: number; y: number; country: string; code: string };
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  progress: number;
}

// Detailed continent paths for realistic world map (viewBox 0 0 100 100)
const CONTINENT_PATHS = {
  // North America
  northAmerica: "M5,18 L8,15 L12,14 L18,12 L22,10 L28,12 L32,15 L35,18 L36,22 L35,28 L32,32 L28,35 L25,38 L22,42 L18,45 L15,48 L12,46 L10,42 L8,38 L6,34 L5,30 L4,26 L5,22 L5,18 Z M25,38 L28,40 L30,44 L28,48 L24,50 L20,48 L18,45 L22,42 L25,38 Z",
  // South America
  southAmerica: "M22,52 L26,50 L30,52 L34,55 L36,60 L35,66 L33,72 L30,78 L27,82 L24,85 L22,82 L21,78 L20,72 L19,66 L20,60 L21,55 L22,52 Z",
  // Europe
  europe: "M44,20 L48,18 L52,17 L56,18 L58,21 L60,24 L58,28 L55,32 L52,35 L48,36 L45,34 L43,30 L42,26 L43,22 L44,20 Z M38,28 L42,26 L44,30 L42,34 L38,35 L35,32 L36,28 L38,28 Z",
  // Africa
  africa: "M42,38 L46,36 L52,37 L58,40 L62,44 L64,50 L63,58 L60,66 L56,72 L52,76 L48,78 L44,76 L42,72 L40,66 L39,58 L40,50 L41,44 L42,38 Z",
  // Asia
  asia: "M60,14 L68,12 L76,14 L84,16 L90,20 L94,26 L95,32 L94,40 L90,46 L84,50 L78,52 L72,50 L66,46 L62,40 L60,34 L58,28 L58,22 L60,14 Z M72,50 L78,52 L82,56 L80,60 L75,62 L70,58 L72,50 Z",
  // Australia
  australia: "M80,62 L86,60 L92,62 L96,66 L96,72 L94,76 L90,78 L84,77 L80,74 L78,70 L79,66 L80,62 Z",
  // Greenland
  greenland: "M32,8 L38,6 L42,8 L44,12 L42,16 L38,18 L34,16 L32,12 L32,8 Z",
  // UK & Ireland
  ukIreland: "M40,22 L42,20 L44,22 L43,26 L40,28 L38,26 L40,22 Z",
  // Japan
  japan: "M88,32 L90,30 L92,32 L91,36 L88,38 L86,36 L88,32 Z",
  // New Zealand
  newZealand: "M94,80 L96,78 L98,80 L97,84 L94,85 L93,82 L94,80 Z",
  // Indonesia
  indonesia: "M78,54 L82,52 L86,54 L84,58 L80,59 L76,57 L78,54 Z",
  // Madagascar
  madagascar: "M64,64 L66,62 L68,64 L67,70 L64,72 L62,68 L64,64 Z"
};

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

        {/* Detailed continent shapes */}
        <g className="opacity-40">
          {Object.entries(CONTINENT_PATHS).map(([name, path]) => (
            <path
              key={name}
              d={path}
              fill="hsl(186, 100%, 50%)"
              fillOpacity="0.15"
              stroke="hsl(186, 100%, 50%)"
              strokeWidth="0.3"
              strokeLinejoin="round"
              className="transition-all duration-500"
            />
          ))}
        </g>
        
        {/* Continent glow effect */}
        <g className="opacity-20">
          {Object.entries(CONTINENT_PATHS).map(([name, path]) => (
            <path
              key={`glow-${name}`}
              d={path}
              fill="none"
              stroke="hsl(186, 100%, 70%)"
              strokeWidth="1"
              filter="url(#glow)"
              strokeLinejoin="round"
            />
          ))}
        </g>
        
        {/* Grid lines for map */}
        <g className="opacity-10">
          {/* Latitude lines */}
          {[20, 35, 50, 65, 80].map(y => (
            <line key={`lat-${y}`} x1="2" y1={y} x2="98" y2={y} stroke="hsl(186, 100%, 50%)" strokeWidth="0.1" strokeDasharray="1,2" />
          ))}
          {/* Longitude lines */}
          {[15, 30, 50, 70, 85].map(x => (
            <line key={`lng-${x}`} x1={x} y1="5" x2={x} y2="95" stroke="hsl(186, 100%, 50%)" strokeWidth="0.1" strokeDasharray="1,2" />
          ))}
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
