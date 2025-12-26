import { memo } from "react";
import { AlertTriangle, Shield, Crosshair, Bug, Zap } from "lucide-react";
import type { AttackArc } from "./WorldMap";

interface AttackLogProps {
  attacks: AttackArc[];
  maxItems?: number;
}

const getAttackIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "ransomware":
      return AlertTriangle;
    case "ddos":
      return Zap;
    case "phishing":
      return Crosshair;
    case "malware":
    case "cryptojacking":
      return Bug;
    default:
      return Shield;
  }
};

const getSeverityStyles = (severity: string) => {
  switch (severity) {
    case "critical":
      return {
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        text: "text-red-400",
        dot: "bg-red-500",
      };
    case "high":
      return {
        bg: "bg-orange-500/10",
        border: "border-orange-500/30",
        text: "text-orange-400",
        dot: "bg-orange-500",
      };
    case "medium":
      return {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        text: "text-yellow-400",
        dot: "bg-yellow-500",
      };
    default:
      return {
        bg: "bg-primary/10",
        border: "border-primary/30",
        text: "text-primary",
        dot: "bg-primary",
      };
  }
};

const COUNTRY_NAMES: { [key: string]: string } = {
  US: "United States",
  CA: "Canada",
  MX: "Mexico",
  BR: "Brazil",
  AR: "Argentina",
  UK: "United Kingdom",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  NL: "Netherlands",
  CH: "Switzerland",
  RU: "Russia",
  CN: "China",
  JP: "Japan",
  KR: "South Korea",
  IN: "India",
  AU: "Australia",
  SG: "Singapore",
  AE: "UAE",
  ZA: "South Africa",
  NG: "Nigeria",
  EG: "Egypt",
  IL: "Israel",
  SA: "Saudi Arabia",
  PL: "Poland",
  UA: "Ukraine",
  TR: "Turkey",
  SE: "Sweden",
  NO: "Norway",
};

const FLAG_EMOJIS: { [key: string]: string } = {
  US: "🇺🇸",
  CA: "🇨🇦",
  MX: "🇲🇽",
  BR: "🇧🇷",
  AR: "🇦🇷",
  UK: "🇬🇧",
  DE: "🇩🇪",
  FR: "🇫🇷",
  IT: "🇮🇹",
  ES: "🇪🇸",
  NL: "🇳🇱",
  CH: "🇨🇭",
  RU: "🇷🇺",
  CN: "🇨🇳",
  JP: "🇯🇵",
  KR: "🇰🇷",
  IN: "🇮🇳",
  AU: "🇦🇺",
  SG: "🇸🇬",
  AE: "🇦🇪",
  ZA: "🇿🇦",
  NG: "🇳🇬",
  EG: "🇪🇬",
  IL: "🇮🇱",
  SA: "🇸🇦",
  PL: "🇵🇱",
  UA: "🇺🇦",
  TR: "🇹🇷",
  SE: "🇸🇪",
  NO: "🇳🇴",
};

const AttackLog = memo(({ attacks, maxItems = 8 }: AttackLogProps) => {
  const displayedAttacks = attacks.slice(-maxItems).reverse();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">Live Attack Log</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">Auto-updating</span>
        </div>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs font-medium text-muted-foreground bg-muted/30 border-b border-border">
        <div className="col-span-1">SEV</div>
        <div className="col-span-3">TYPE</div>
        <div className="col-span-4">SOURCE</div>
        <div className="col-span-4">TARGET</div>
      </div>

      {/* Attack entries */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {displayedAttacks.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            Monitoring for threats...
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {displayedAttacks.map((attack, index) => {
              const styles = getSeverityStyles(attack.severity);
              const Icon = getAttackIcon(attack.type);

              return (
                <div
                  key={attack.id}
                  className={`grid grid-cols-12 gap-2 px-4 py-3 text-xs hover:bg-muted/30 transition-all duration-300 ${
                    index === 0 ? "animate-fade-in bg-muted/20" : ""
                  }`}
                >
                  {/* Severity indicator */}
                  <div className="col-span-1 flex items-center">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${styles.dot} ${
                        index === 0 ? "animate-pulse" : ""
                      }`}
                    />
                  </div>

                  {/* Attack type */}
                  <div className="col-span-3 flex items-center gap-1.5">
                    <Icon className={`w-3.5 h-3.5 ${styles.text}`} />
                    <span className="font-medium truncate">{attack.type}</span>
                  </div>

                  {/* Source */}
                  <div className="col-span-4 flex items-center gap-1.5">
                    <span className="text-base leading-none">{FLAG_EMOJIS[attack.source.code] || "🌍"}</span>
                    <span className="text-muted-foreground truncate">
                      {COUNTRY_NAMES[attack.source.code] || attack.source.code}
                    </span>
                  </div>

                  {/* Target */}
                  <div className="col-span-4 flex items-center gap-1.5">
                    <span className="text-base leading-none">{FLAG_EMOJIS[attack.target.code] || "🌍"}</span>
                    <span className="text-muted-foreground truncate">
                      {COUNTRY_NAMES[attack.target.code] || attack.target.code}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

AttackLog.displayName = "AttackLog";

export default AttackLog;
