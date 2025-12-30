import { Scan, Shield, Bell, Wrench, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    number: "01",
    icon: Scan,
    title: "Scan & Discover",
    description: "Our AI continuously scans your infrastructure, discovering assets and identifying vulnerabilities.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    number: "02",
    icon: Shield,
    title: "Detect & Analyze",
    description: "Advanced threat detection algorithms identify malicious activity and potential breaches in real-time.",
    color: "from-primary to-accent",
  },
  {
    number: "03",
    icon: Bell,
    title: "Alert & Prioritize",
    description: "Intelligent alerting ensures you're notified of critical threats with context and severity scoring.",
    color: "from-yellow-500 to-orange-400",
  },
  {
    number: "04",
    icon: Wrench,
    title: "Respond & Remediate",
    description: "Automated response playbooks and guided remediation help you neutralize threats quickly.",
    color: "from-green-500 to-emerald-400",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute inset-0 bg-dots-cyber opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Protection in <span className="text-gradient-cyber">Four Steps</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our automated security platform works around the clock to keep your business safe
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 150}>
                <div className="relative group">
                  {/* Arrow connector */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-border group-hover:text-primary transition-colors" />
                    </div>
                  )}

                  <div className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-primary/10">
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-2 font-mono text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;