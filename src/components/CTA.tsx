import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Sparkles, CheckCircle2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const CTA = () => {
  const benefits = [
    "No credit card required",
    "14-day free trial",
    "Cancel anytime",
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-grid-cyber opacity-20" />
      
      {/* Animated Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "500ms" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1000ms" }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Get Started Today</span>
            </div>

            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 mb-8 glow-cyber group hover:scale-110 transition-transform duration-300">
              <Shield className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
            </div>

            {/* Content */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Secure Your <span className="text-gradient-cyber">Digital Future</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Join thousands of organizations that trust CyberShield to protect their most valuable assets. Get started with a free security assessment.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Button variant="cyber" size="xl" className="group w-full sm:w-auto">
                Get Free Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="cyber-outline" size="xl" className="w-full sm:w-auto">
                Schedule Demo
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {benefits.map((benefit, index) => (
                <AnimatedSection key={benefit} delay={index * 100}>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTA;
