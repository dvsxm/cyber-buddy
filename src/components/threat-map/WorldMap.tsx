import { memo, useEffect, useState } from "react";

interface AttackArc {
  id: string;
  source: { x: number; y: number; country: string; code: string };
  target: { x: number; y: number; country: string; code: string };
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  progress: number;
}

// Accurate continent paths for realistic world map (viewBox 0 0 100 100, Mercator-style projection)
const CONTINENT_PATHS = {
  // North America - with Alaska, Canada, USA, Mexico, Central America
  northAmerica: `
    M 3,12 L 5,10 L 8,9 L 10,8 L 12,9 L 11,11 L 9,13 L 7,14 L 5,15 L 3,14 Z
    M 6,16 L 10,14 L 14,12 L 18,10 L 22,9 L 26,10 L 28,12 L 27,15 L 24,16 L 22,14 L 20,15 L 18,17 L 16,19 L 14,21 L 12,22 L 10,21 L 8,19 L 6,18 Z
    M 10,22 L 14,21 L 18,20 L 22,18 L 26,17 L 30,18 L 32,21 L 30,24 L 27,26 L 24,28 L 22,31 L 20,34 L 18,36 L 16,38 L 14,40 L 12,42 L 11,44 L 13,46 L 16,47 L 18,49 L 17,51 L 14,52 L 12,50 L 10,47 L 9,44 L 10,40 L 12,36 L 14,32 L 15,28 L 14,25 L 12,23 L 10,22 Z
    M 18,49 L 21,48 L 24,50 L 22,53 L 19,54 L 17,52 L 18,49 Z
  `,
  // South America - Brazil, Argentina, Chile, Colombia, Peru, etc.
  southAmerica: `
    M 24,52 L 28,50 L 32,51 L 35,53 L 36,56 L 35,59 L 33,62 L 34,65 L 36,68 L 35,72 L 32,75 L 29,78 L 27,82 L 26,86 L 24,88 L 22,86 L 23,82 L 24,78 L 23,74 L 22,70 L 21,66 L 22,62 L 24,58 L 25,55 L 24,52 Z
    M 27,52 L 30,50 L 33,52 L 32,55 L 29,56 L 27,54 L 27,52 Z
  `,
  // Europe - Iberian Peninsula, France, UK, Scandinavia, Eastern Europe
  europe: `
    M 43,24 L 44,22 L 46,21 L 48,22 L 47,25 L 45,27 L 43,26 L 43,24 Z
    M 40,27 L 43,25 L 46,26 L 48,28 L 46,31 L 43,32 L 40,30 L 40,27 Z
    M 46,20 L 48,18 L 51,17 L 54,18 L 56,20 L 55,23 L 52,24 L 49,23 L 47,21 L 46,20 Z
    M 44,32 L 47,30 L 50,29 L 53,30 L 56,32 L 58,35 L 56,37 L 53,36 L 50,34 L 47,33 L 44,32 Z
    M 48,18 L 50,15 L 53,13 L 56,14 L 58,17 L 56,19 L 53,18 L 50,17 L 48,18 Z
    M 56,19 L 59,17 L 62,18 L 64,21 L 62,24 L 59,23 L 57,21 L 56,19 Z
  `,
  // Africa - with Horn of Africa, Madagascar proximity
  africa: `
    M 44,38 L 48,36 L 52,35 L 56,36 L 59,38 L 61,41 L 62,44 L 64,47 L 65,50 L 64,54 L 62,58 L 60,62 L 57,66 L 54,70 L 50,73 L 47,74 L 44,72 L 42,68 L 41,64 L 42,60 L 44,56 L 45,52 L 44,48 L 42,44 L 43,40 L 44,38 Z
    M 61,41 L 64,39 L 66,42 L 65,46 L 62,47 L 60,44 L 61,41 Z
  `,
  // Asia - Russia, Middle East, India, China, Southeast Asia
  asia: `
    M 58,18 L 62,16 L 68,14 L 74,13 L 80,14 L 86,16 L 90,18 L 93,21 L 95,25 L 94,28 L 91,26 L 88,24 L 85,23 L 82,24 L 79,26 L 76,28 L 74,26 L 72,24 L 70,22 L 68,20 L 65,19 L 62,20 L 60,22 L 58,20 L 58,18 Z
    M 58,24 L 61,22 L 64,23 L 66,26 L 64,29 L 61,30 L 59,28 L 58,26 L 58,24 Z
    M 64,30 L 68,28 L 72,30 L 76,32 L 80,34 L 84,36 L 88,38 L 90,41 L 88,44 L 84,45 L 80,44 L 76,42 L 72,40 L 68,38 L 66,35 L 64,32 L 64,30 Z
    M 66,40 L 70,38 L 74,40 L 76,44 L 74,48 L 70,50 L 66,48 L 65,44 L 66,40 Z
    M 76,48 L 80,46 L 84,48 L 86,52 L 84,56 L 80,57 L 76,55 L 75,51 L 76,48 Z
    M 86,34 L 89,32 L 92,34 L 93,38 L 91,41 L 88,40 L 86,37 L 86,34 Z
  `,
  // Australia - main landmass and Tasmania
  australia: `
    M 80,62 L 84,60 L 88,59 L 92,60 L 95,63 L 96,67 L 95,71 L 92,74 L 88,76 L 84,75 L 81,73 L 79,70 L 78,66 L 79,63 L 80,62 Z
    M 88,77 L 90,76 L 92,78 L 91,80 L 88,80 L 87,78 L 88,77 Z
  `,
  // Greenland
  greenland: `
    M 30,8 L 34,6 L 38,5 L 42,6 L 44,9 L 43,12 L 40,14 L 36,15 L 32,14 L 30,11 L 30,8 Z
  `,
  // UK & Ireland
  ukIreland: `
    M 42,22 L 44,21 L 45,23 L 44,26 L 42,27 L 41,25 L 42,22 Z
    M 40,24 L 41,23 L 42,25 L 41,27 L 39,27 L 39,25 L 40,24 Z
  `,
  // Japan - main islands
  japan: `
    M 88,30 L 90,28 L 91,30 L 90,33 L 88,35 L 86,34 L 87,31 L 88,30 Z
    M 90,34 L 92,33 L 93,35 L 92,38 L 90,38 L 89,36 L 90,34 Z
  `,
  // New Zealand
  newZealand: `
    M 96,78 L 97,77 L 98,79 L 97,81 L 95,81 L 95,79 L 96,78 Z
    M 95,82 L 96,81 L 97,83 L 96,85 L 94,84 L 95,82 Z
  `,
  // Indonesia archipelago
  indonesia: `
    M 78,54 L 81,53 L 83,55 L 81,57 L 78,57 L 77,55 L 78,54 Z
    M 83,54 L 86,53 L 88,55 L 87,58 L 84,58 L 83,56 L 83,54 Z
    M 88,56 L 90,55 L 92,57 L 91,59 L 89,59 L 88,57 L 88,56 Z
  `,
  // Madagascar
  madagascar: `
    M 64,62 L 66,60 L 68,62 L 68,66 L 66,70 L 64,71 L 62,68 L 63,64 L 64,62 Z
  `,
  // Sri Lanka
  sriLanka: `
    M 72,52 L 74,51 L 75,53 L 74,55 L 72,55 L 71,53 L 72,52 Z
  `,
  // Philippines
  philippines: `
    M 84,46 L 86,45 L 87,47 L 86,50 L 84,51 L 83,49 L 84,46 Z
  `,
  // Taiwan
  taiwan: `
    M 86,40 L 87,39 L 88,41 L 87,43 L 86,42 L 86,40 Z
  `,
  // Iceland
  iceland: `
    M 38,14 L 40,13 L 42,14 L 41,16 L 39,17 L 37,16 L 38,14 Z
  `,
  // Cuba & Caribbean
  caribbean: `
    M 20,44 L 23,43 L 26,44 L 25,46 L 22,47 L 20,46 L 20,44 Z
    M 26,45 L 28,44 L 29,46 L 28,48 L 26,47 L 26,45 Z
  `
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
