import { Check, Zap, Clock, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-Time Protection",
    description: "Instant threat detection and automated response to keep your systems safe around the clock.",
    stats: "< 50ms",
    statsLabel: "Response Time",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Our security operations center never sleeps, providing continuous surveillance of your infrastructure.",
    stats: "99.99%",
    statsLabel: "Uptime",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Access to certified security professionals ready to assist you with any security concerns.",
    stats: "500+",
    statsLabel: "Experts",
  },
];

const checklistItems = [
  "Advanced threat intelligence",
  "Zero-day vulnerability protection",
  "Compliance management (SOC2, HIPAA, GDPR)",
  "Incident response planning",
  "Security awareness training",
  "Regular penetration testing",
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Stats */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Built for <span className="text-gradient-cyber">Enterprise</span> Scale
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Our platform is designed to handle the most demanding security requirements while remaining simple to use.
            </p>

            {/* Feature Cards */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex gap-5 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold text-primary">{feature.stats}</div>
                    <div className="text-xs text-muted-foreground">{feature.statsLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Checklist */}
          <div className="relative">
            <div className="p-8 md:p-10 rounded-3xl bg-card border border-border">
              <h3 className="text-2xl font-bold mb-8">Everything You Need</h3>
              
              <div className="space-y-4">
                {checklistItems.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-300"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
