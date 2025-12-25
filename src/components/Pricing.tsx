import { Button } from "@/components/ui/button";
import { Check, X, Zap, Building2, Rocket, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useState } from "react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      icon: Rocket,
      description: "Perfect for small teams and startups",
      monthlyPrice: "49",
      annualPrice: "39",
      period: "/month",
      popular: false,
      features: [
        { name: "Up to 25 endpoints", included: true },
        { name: "Basic threat detection", included: true },
        { name: "Email alerts", included: true },
        { name: "8/5 support", included: true },
        { name: "API access", included: false },
        { name: "Custom integrations", included: false },
        { name: "Dedicated account manager", included: false },
      ],
    },
    {
      name: "Professional",
      icon: Zap,
      description: "For growing businesses with advanced needs",
      monthlyPrice: "149",
      annualPrice: "119",
      period: "/month",
      popular: true,
      features: [
        { name: "Up to 100 endpoints", included: true },
        { name: "Advanced AI threat detection", included: true },
        { name: "Real-time alerts & SMS", included: true },
        { name: "24/7 priority support", included: true },
        { name: "Full API access", included: true },
        { name: "Custom integrations", included: true },
        { name: "Dedicated account manager", included: false },
      ],
    },
    {
      name: "Enterprise",
      icon: Building2,
      description: "Tailored solutions for large organizations",
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      period: "",
      popular: false,
      features: [
        { name: "Unlimited endpoints", included: true },
        { name: "AI-powered threat hunting", included: true },
        { name: "Multi-channel alerts", included: true },
        { name: "24/7 dedicated SOC team", included: true },
        { name: "Enterprise API & webhooks", included: true },
        { name: "Custom integrations", included: true },
        { name: "Dedicated account manager", included: true },
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Simple Pricing</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-gradient-cyber">Protection Level</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Flexible plans designed to scale with your business. All plans include our core security features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                isAnnual ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                  isAnnual ? "left-8" : "left-1"
                }`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium animate-fade-in">
                Save 20%
              </span>
            )}
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <AnimatedSection key={plan.name} delay={index * 150}>
              <div
                className={`relative p-8 rounded-2xl transition-all duration-500 h-full flex flex-col group ${
                  plan.popular
                    ? "bg-gradient-to-b from-primary/20 to-card border-2 border-primary glow-cyber scale-100 md:scale-105 hover:scale-105 md:hover:scale-110"
                    : "bg-card border border-border hover:border-primary/50 hover:-translate-y-2"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full shadow-lg shadow-primary/30">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div className={`inline-flex p-3 rounded-xl mb-4 transition-all duration-300 ${plan.popular ? "bg-primary/20" : "bg-muted group-hover:bg-primary/10"}`}>
                    <plan.icon className={`w-6 h-6 transition-colors duration-300 ${plan.popular ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-bold font-mono">
                    {plan.monthlyPrice !== "Custom" && "$"}
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                  {isAnnual && plan.monthlyPrice !== "Custom" && (
                    <div className="text-sm text-muted-foreground mt-1">
                      <span className="line-through">${plan.monthlyPrice}</span>
                      <span className="text-green-400 ml-2">Save ${(parseInt(plan.monthlyPrice) - parseInt(plan.annualPrice)) * 12}/yr</span>
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 group/item">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center group-hover/item:bg-primary/30 transition-colors">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground/50"}`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "cyber" : "cyber-outline"}
                  className="w-full group/btn"
                  size="lg"
                >
                  {plan.monthlyPrice === "Custom" ? "Contact Sales" : "Get Started"}
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </Button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Enterprise CTA */}
        <AnimatedSection delay={500} className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom solution? We offer tailored packages for enterprises.
          </p>
          <Button variant="link" className="text-primary group">
            Schedule a consultation 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Pricing;
