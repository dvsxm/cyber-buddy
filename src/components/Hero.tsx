import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-30" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Animated Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Enterprise-Grade Protection</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Defend Your Digital
            <span className="block text-gradient-cyber">Infrastructure</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Advanced threat detection, real-time monitoring, and intelligent response systems to protect your business from evolving cyber threats.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button variant="cyber" size="xl" className="group">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="cyber-outline" size="xl">
              View Demo
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm">99.9% Threat Detection</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="w-5 h-5 text-primary" />
              <span className="text-sm">End-to-End Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Eye className="w-5 h-5 text-primary" />
              <span className="text-sm">24/7 Monitoring</span>
            </div>
          </div>
        </div>

        {/* Floating Security Icons */}
        <div className="hidden lg:block absolute top-1/3 left-10 animate-float">
          <div className="p-4 rounded-2xl bg-card border border-border glow-cyber">
            <Shield className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-1/3 right-10 animate-float" style={{ animationDelay: '2s' }}>
          <div className="p-4 rounded-2xl bg-card border border-border glow-cyber">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
