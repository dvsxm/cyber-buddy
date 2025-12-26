import { memo } from "react";
import { Clock } from "lucide-react";

interface TimeframeToggleProps {
  value: "1h" | "24h" | "7d" | "30d";
  onChange: (value: "1h" | "24h" | "7d" | "30d") => void;
}

const TimeframeToggle = memo(({ value, onChange }: TimeframeToggleProps) => {
  const options: { value: "1h" | "24h" | "7d" | "30d"; label: string }[] = [
    { value: "1h", label: "1 Hour" },
    { value: "24h", label: "24 Hours" },
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
  ];

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>Timeframe:</span>
      </div>
      <div className="flex bg-muted rounded-lg p-1">
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
              value === option.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
});

TimeframeToggle.displayName = "TimeframeToggle";

export default TimeframeToggle;
