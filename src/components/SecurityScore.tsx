import { memo, useState, useEffect } from "react";
import { Shield, TrendingUp, CheckCircle, AlertTriangle, Info, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const SecurityScore = memo(() => {
  const [score, setScore] = useState(87);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate score on mount
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  // Calculate grade based on score
  const getGrade = (score: number) => {
    if (score >= 90) return { grade: "A", color: "text-green-400", bg: "bg-green-500/20" };
    if (score >= 80) return { grade: "B+", color: "text-primary", bg: "bg-primary/20" };
    if (score >= 70) return { grade: "B", color: "text-yellow-400", bg: "bg-yellow-500/20" };
    if (score >= 60) return { grade: "C", color: "text-orange-400", bg: "bg-orange-500/20" };
    return { grade: "D", color: "text-red-400", bg: "bg-red-500/20" };
  };

  const gradeInfo = getGrade(animatedScore);
  
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const metrics = [
    { label: "Firewall Status", status: "Active", icon: CheckCircle, color: "text-green-400" },
    { label: "Encryption", status: "AES-256", icon: CheckCircle, color: "text-green-400" },
    { label: "Last Scan", status: "2 min ago", icon: Info, color: "text-primary" },
    { label: "Vulnerabilities", status: "3 Low", icon: AlertTriangle, color: "text-yellow-400" },
  ];

  return (
    <div className="rounded-2xl bg-card/60 backdrop-blur-md border border-border p-6 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Security Posture</h3>
            <p className="text-xs text-muted-foreground">Real-time assessment</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-green-400">
          <TrendingUp className="w-4 h-4" />
          <span>+5%</span>
        </div>
      </div>

      {/* Score Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg className="w-36 h-36 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="72"
              cy="72"
              r="45"
              stroke="hsl(var(--border))"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="72"
              cy="72"
              r="45"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</span>
            <span className="text-2xl font-mono font-bold text-foreground">{animatedScore}</span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 rounded-lg bg-background/50 border border-border/50"
          >
            <metric.icon className={`w-4 h-4 ${metric.color}`} />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground truncate">{metric.label}</p>
              <p className="text-sm font-medium text-foreground truncate">{metric.status}</p>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" className="w-full group">
        View Full Report
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Button>
    </div>
  );
});

SecurityScore.displayName = "SecurityScore";

export default SecurityScore;
