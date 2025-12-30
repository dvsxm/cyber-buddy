import { Users, Globe, Clock, Award, Building, Server } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Protected Organizations",
    color: "text-primary",
  },
  {
    icon: Globe,
    value: "195",
    label: "Countries Served",
    color: "text-green-400",
  },
  {
    icon: Clock,
    value: "99.99%",
    label: "Uptime SLA",
    color: "text-yellow-400",
  },
  {
    icon: Award,
    value: "500+",
    label: "Security Experts",
    color: "text-purple-400",
  },
  {
    icon: Building,
    value: "12",
    label: "Global Data Centers",
    color: "text-blue-400",
  },
  {
    icon: Server,
    value: "1B+",
    label: "Daily Threat Scans",
    color: "text-accent",
  },
];

const TeamStats = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 bg-grid-cyber-sm opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={index * 100}>
              <div className="group text-center p-6 rounded-xl hover:bg-card/50 transition-all duration-300 hover:-translate-y-1">
                <div className="inline-flex p-3 rounded-xl bg-card/60 border border-border group-hover:border-primary/30 group-hover:scale-110 transition-all duration-300 mb-4">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-mono mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamStats;