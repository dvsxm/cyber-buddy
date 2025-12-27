import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, ArrowRight, Zap, Activity } from "lucide-react";

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in backdrop-blur-sm">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Enterprise-Grade Protection</span>
            <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">ACTIVE</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Defend Your Digital
            <span className="block text-gradient-cyber drop-shadow-lg">Infrastructure</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Advanced threat detection, real-time monitoring, and intelligent response systems to protect your business from evolving cyber threats.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button variant="cyber" size="xl" className="group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <Button variant="cyber-outline" size="xl" className="group">
              <Zap className="w-5 h-5 mr-2 text-primary" />
              View Demo
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[
              { icon: Shield, text: "99.9% Threat Detection", color: "text-primary" },
              { icon: Lock, text: "End-to-End Encryption", color: "text-primary" },
              { icon: Eye, text: "24/7 Monitoring", color: "text-primary" },
            ].map((item, index) => (
              <div key={item.text} className="flex items-center gap-2 text-muted-foreground px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:bg-card">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Security Icons */}
        <div className="hidden lg:block absolute top-1/3 left-10 animate-float">
          <div className="p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-border glow-cyber hover:scale-110 transition-transform duration-300">
            <Shield className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-1/3 right-10 animate-float" style={{ animationDelay: '2s' }}>
          <div className="p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-border glow-cyber hover:scale-110 transition-transform duration-300">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="hidden lg:block absolute top-1/2 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="p-3 rounded-xl bg-card/60 backdrop-blur-md border border-primary/20">
            <Activity className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
