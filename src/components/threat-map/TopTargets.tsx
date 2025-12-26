import { memo, useEffect, useState } from "react";
import { Building2, Globe, TrendingUp } from "lucide-react";

interface TargetData {
  name: string;
  flag?: string;
  count: number;
  change: number;
}

const TopTargets = memo(() => {
  const [countries, setCountries] = useState<TargetData[]>([
    { name: "United States", flag: "🇺🇸", count: 45230, change: 12 },
    { name: "Germany", flag: "🇩🇪", count: 32156, change: 8 },
    { name: "United Kingdom", flag: "🇬🇧", count: 28934, change: -3 },
    { name: "France", flag: "🇫🇷", count: 21456, change: 15 },
    { name: "Netherlands", flag: "🇳🇱", count: 18234, change: 5 },
    { name: "Japan", flag: "🇯🇵", count: 15678, change: -2 },
  ]);

  const [industries, setIndustries] = useState<TargetData[]>([
    { name: "Technology", count: 89234, change: 18 },
    { name: "Banking & Finance", count: 67845, change: 12 },
    { name: "Healthcare", count: 45623, change: 25 },
    { name: "Education", count: 34567, change: 8 },
    { name: "Energy & Utilities", count: 28934, change: -5 },
    { name: "Government", count: 23456, change: 15 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountries(prev =>
        prev.map(c => ({
          ...c,
          count: c.count + Math.floor(Math.random() * 20),
        }))
      );
      setIndustries(prev =>
        prev.map(i => ({
          ...i,
          count: i.count + Math.floor(Math.random() * 30),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const maxCountryCount = Math.max(...countries.map(c => c.count));
  const maxIndustryCount = Math.max(...industries.map(i => i.count));

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Top Targeted Countries */}
      <div className="p-5 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 rounded-lg bg-primary/10">
            <Globe className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-semibold text-sm">Top Targeted Countries</h3>
        </div>
        <div className="space-y-3">
          {countries.map((country, index) => (
            <div key={country.name} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground w-4">{index + 1}</span>
                  <span className="text-lg leading-none">{country.flag}</span>
                  <span className="text-sm font-medium">{country.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono tabular-nums">{country.count.toLocaleString()}</span>
                  <span
                    className={`text-xs flex items-center gap-0.5 ${
                      country.change > 0 ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    <TrendingUp className={`w-3 h-3 ${country.change < 0 ? "rotate-180" : ""}`} />
                    {Math.abs(country.change)}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/30"
                  style={{ width: `${(country.count / maxCountryCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Targeted Industries */}
      <div className="p-5 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <Building2 className="w-4 h-4 text-orange-400" />
          </div>
          <h3 className="font-semibold text-sm">Top Targeted Industries</h3>
        </div>
        <div className="space-y-3">
          {industries.map((industry, index) => {
            const colors = [
              "from-red-500 to-orange-500",
              "from-orange-500 to-yellow-500",
              "from-yellow-500 to-green-500",
              "from-green-500 to-cyan-500",
              "from-cyan-500 to-blue-500",
              "from-blue-500 to-purple-500",
            ];
            return (
              <div key={industry.name} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground w-4">{index + 1}</span>
                    <span className="text-sm font-medium">{industry.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono tabular-nums">{industry.count.toLocaleString()}</span>
                    <span
                      className={`text-xs flex items-center gap-0.5 ${
                        industry.change > 0 ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      <TrendingUp className={`w-3 h-3 ${industry.change < 0 ? "rotate-180" : ""}`} />
                      {Math.abs(industry.change)}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${colors[index]} rounded-full transition-all duration-500`}
                    style={{ width: `${(industry.count / maxIndustryCount) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

TopTargets.displayName = "TopTargets";

export default TopTargets;
