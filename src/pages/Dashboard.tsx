import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Globe, 
  Server, 
  Users,
  Clock,
  Zap,
  Eye,
  ShieldCheck,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  ResponsiveContainer
} from "recharts";
import ThreatHeatmap from "@/components/dashboard/ThreatHeatmap";
import AttackVectors from "@/components/dashboard/AttackVectors";
import GeoDistribution from "@/components/dashboard/GeoDistribution";
import SystemHealth from "@/components/dashboard/SystemHealth";

// Chart data
const threatTrendData = [
  { date: "Mon", threats: 124, blocked: 121, critical: 3 },
  { date: "Tue", threats: 156, blocked: 154, critical: 2 },
  { date: "Wed", threats: 189, blocked: 187, critical: 2 },
  { date: "Thu", threats: 245, blocked: 242, critical: 3 },
  { date: "Fri", threats: 312, blocked: 308, critical: 4 },
  { date: "Sat", threats: 198, blocked: 196, critical: 2 },
  { date: "Sun", threats: 167, blocked: 165, critical: 2 },
];

const attackTypeData = [
  { name: "DDoS", value: 35, color: "hsl(var(--destructive))" },
  { name: "Malware", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Phishing", value: 20, color: "hsl(var(--chart-3))" },
  { name: "SQL Injection", value: 12, color: "hsl(var(--chart-4))" },
  { name: "XSS", value: 8, color: "hsl(var(--chart-5))" },
];

const hourlyActivityData = [
  { hour: "00:00", attacks: 45, responses: 44 },
  { hour: "02:00", attacks: 32, responses: 32 },
  { hour: "04:00", attacks: 28, responses: 28 },
  { hour: "06:00", attacks: 35, responses: 35 },
  { hour: "08:00", attacks: 78, responses: 77 },
  { hour: "10:00", attacks: 124, responses: 122 },
  { hour: "12:00", attacks: 156, responses: 154 },
  { hour: "14:00", attacks: 189, responses: 187 },
  { hour: "16:00", attacks: 167, responses: 165 },
  { hour: "18:00", attacks: 145, responses: 143 },
  { hour: "20:00", attacks: 98, responses: 97 },
  { hour: "22:00", attacks: 67, responses: 66 },
];

const securityScoreData = [
  { metric: "Firewall", score: 95 },
  { metric: "Encryption", score: 88 },
  { metric: "Access Control", score: 92 },
  { metric: "Monitoring", score: 85 },
  { metric: "Backup", score: 78 },
  { metric: "Compliance", score: 90 },
];

const chartConfig = {
  threats: { label: "Threats", color: "hsl(var(--destructive))" },
  blocked: { label: "Blocked", color: "hsl(var(--chart-1))" },
  critical: { label: "Critical", color: "hsl(var(--chart-2))" },
  attacks: { label: "Attacks", color: "hsl(var(--destructive))" },
  responses: { label: "Responses", color: "hsl(var(--chart-1))" },
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const stats = [
    { 
      label: "Active Threats", 
      value: "23", 
      change: -12, 
      icon: AlertTriangle, 
      color: "text-destructive" 
    },
    { 
      label: "Blocked Today", 
      value: "1,847", 
      change: 8, 
      icon: ShieldCheck, 
      color: "text-chart-1" 
    },
    { 
      label: "Response Time", 
      value: "1.2s", 
      change: -15, 
      icon: Zap, 
      color: "text-accent" 
    },
    { 
      label: "Systems Online", 
      value: "99.9%", 
      change: 0.1, 
      icon: Server, 
      color: "text-primary" 
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold">Security Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Time Range Toggle */}
              <div className="hidden sm:flex items-center gap-1 p-1 bg-card rounded-lg border border-border">
                {(["24h", "7d", "30d"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                      timeRange === range
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-4 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg bg-primary/10 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs ${
                  stat.change > 0 ? "text-chart-1" : stat.change < 0 ? "text-destructive" : "text-muted-foreground"
                }`}>
                  {stat.change > 0 ? <TrendingUp className="w-3 h-3" /> : stat.change < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                  {Math.abs(stat.change)}%
                </div>
              </div>
              <p className="text-2xl font-bold font-mono">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Threat Trend Chart */}
          <div className="lg:col-span-2 bg-card/60 backdrop-blur-md border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Threat Trend Analysis</h3>
                <p className="text-sm text-muted-foreground">Threats detected vs blocked over time</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <span className="text-muted-foreground">Threats</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-1" />
                  <span className="text-muted-foreground">Blocked</span>
                </div>
              </div>
            </div>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={threatTrendData}>
                <defs>
                  <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="threats"
                  stroke="hsl(var(--destructive))"
                  fill="url(#threatGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="blocked"
                  stroke="hsl(var(--chart-1))"
                  fill="url(#blockedGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </div>

          {/* Attack Type Distribution */}
          <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Attack Distribution</h3>
              <p className="text-sm text-muted-foreground">By attack type</p>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attackTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {attackTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {attackTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="ml-auto font-mono">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Hourly Activity */}
          <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">24-Hour Activity</h3>
                <p className="text-sm text-muted-foreground">Attack frequency by hour</p>
              </div>
              <Activity className="w-5 h-5 text-muted-foreground" />
            </div>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart data={hourlyActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="attacks" fill="hsl(var(--destructive))" opacity={0.6} radius={[4, 4, 0, 0]} />
                <Bar dataKey="responses" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>

          {/* Security Score Radar */}
          <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Security Posture</h3>
                <p className="text-sm text-muted-foreground">Overall security metrics</p>
              </div>
              <div className="flex items-center gap-2 text-chart-1">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-bold">88%</span>
              </div>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={securityScoreData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis 
                    dataKey="metric" 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} 
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} 
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Third Row - Additional Components */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <ThreatHeatmap />
          <AttackVectors />
          <GeoDistribution />
          <SystemHealth />
        </div>

        {/* Response Timeline */}
        <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Response Performance</h3>
              <p className="text-sm text-muted-foreground">Detection and response times over the past week</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">MTTD: 1.2s</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">MTTR: 3.4s</span>
              </div>
            </div>
          </div>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <LineChart data={threatTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="blocked" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2} 
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="critical" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
