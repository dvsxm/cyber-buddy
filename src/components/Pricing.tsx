import { Button } from "@/components/ui/button";
import { Check, X, Zap, Building2, Rocket } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      icon: Rocket,
      description: "Perfect for small teams and startups",
      price: "49",
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
      price: "149",
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
      price: "Custom",
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <span className="text-sm text-primary font-medium">Simple Pricing</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-gradient-cyber">Protection Level</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Flexible plans designed to scale with your business. All plans include our core security features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl transition-all duration-500 ${
                plan.popular
                  ? "bg-gradient-to-b from-primary/20 to-card border-2 border-primary glow-cyber scale-105"
                  : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className={`inline-flex p-3 rounded-xl mb-4 ${plan.popular ? "bg-primary/20" : "bg-muted"}`}>
                  <plan.icon className={`w-6 h-6 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold">
                  {plan.price !== "Custom" && "$"}
                  {plan.price}
                </span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                    )}
                    <span className={feature.included ? "text-foreground" : "text-muted-foreground/50"}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "cyber" : "cyber-outline"}
                className="w-full"
                size="lg"
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom solution? We offer tailored packages for enterprises.
          </p>
          <Button variant="link" className="text-primary">
            Schedule a consultation →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
