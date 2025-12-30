import { Check, X, Minus } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "./ui/button";

const features = [
  { name: "Real-time threat detection", starter: true, pro: true, enterprise: true },
  { name: "24/7 monitoring", starter: true, pro: true, enterprise: true },
  { name: "Email alerts", starter: true, pro: true, enterprise: true },
  { name: "SMS & push notifications", starter: false, pro: true, enterprise: true },
  { name: "API access", starter: false, pro: true, enterprise: true },
  { name: "Custom integrations", starter: false, pro: true, enterprise: true },
  { name: "Advanced AI detection", starter: false, pro: true, enterprise: true },
  { name: "Dedicated account manager", starter: false, pro: false, enterprise: true },
  { name: "Custom SLA", starter: false, pro: false, enterprise: true },
  { name: "On-premise deployment", starter: false, pro: false, enterprise: true },
  { name: "Compliance reporting", starter: false, pro: true, enterprise: true },
  { name: "Threat hunting", starter: false, pro: false, enterprise: true },
];

const ComparisonTable = () => {
  const renderValue = (value: boolean | "partial") => {
    if (value === true) {
      return (
        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
          <Check className="w-4 h-4 text-green-400" />
        </div>
      );
    }
    if (value === "partial") {
      return (
        <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto">
          <Minus className="w-4 h-4 text-yellow-400" />
        </div>
      );
    }
    return (
      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center mx-auto">
        <X className="w-4 h-4 text-muted-foreground" />
      </div>
    );
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Compare <span className="text-gradient-cyber">Plans</span>
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See which plan is right for your organization
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    Features
                  </th>
                  <th className="py-4 px-4 text-center">
                    <div className="font-semibold">Starter</div>
                    <div className="text-sm text-muted-foreground">$49/mo</div>
                  </th>
                  <th className="py-4 px-4 text-center relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      Popular
                    </div>
                    <div className="font-semibold text-primary">Professional</div>
                    <div className="text-sm text-muted-foreground">$149/mo</div>
                  </th>
                  <th className="py-4 px-4 text-center">
                    <div className="font-semibold">Enterprise</div>
                    <div className="text-sm text-muted-foreground">Custom</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={feature.name}
                    className={`border-b border-border/50 hover:bg-card/50 transition-colors ${
                      index % 2 === 0 ? "bg-card/20" : ""
                    }`}
                  >
                    <td className="py-4 px-4 text-sm">{feature.name}</td>
                    <td className="py-4 px-4">{renderValue(feature.starter)}</td>
                    <td className="py-4 px-4 bg-primary/5">{renderValue(feature.pro)}</td>
                    <td className="py-4 px-4">{renderValue(feature.enterprise)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="py-6 px-4"></td>
                  <td className="py-6 px-4 text-center">
                    <Button variant="cyber-outline" size="sm">
                      Get Started
                    </Button>
                  </td>
                  <td className="py-6 px-4 text-center bg-primary/5">
                    <Button variant="cyber" size="sm">
                      Get Started
                    </Button>
                  </td>
                  <td className="py-6 px-4 text-center">
                    <Button variant="cyber-outline" size="sm">
                      Contact Sales
                    </Button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ComparisonTable;