import AnimatedSection from "./AnimatedSection";
import { Shield, Lock, Cloud, Database, Server, Key, FileCheck, Fingerprint } from "lucide-react";

const integrations = [
  { name: "AWS", icon: Cloud, color: "text-orange-400" },
  { name: "Azure", icon: Cloud, color: "text-blue-400" },
  { name: "Google Cloud", icon: Cloud, color: "text-green-400" },
  { name: "Kubernetes", icon: Server, color: "text-blue-500" },
  { name: "Docker", icon: Database, color: "text-cyan-400" },
  { name: "GitHub", icon: FileCheck, color: "text-purple-400" },
  { name: "Okta", icon: Key, color: "text-indigo-400" },
  { name: "Auth0", icon: Fingerprint, color: "text-orange-500" },
];

const IntegrationLogos = () => {
  return (
    <section className="py-16 relative overflow-hidden border-y border-border/50">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-10">
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium mb-2">
            Seamless Integrations
          </p>
          <h3 className="text-2xl font-bold">
            Works with your <span className="text-gradient-cyber">existing stack</span>
          </h3>
        </AnimatedSection>

        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          
          {/* Scrolling Logos */}
          <div className="flex gap-8 overflow-hidden">
            <div className="flex gap-8 animate-marquee">
              {[...integrations, ...integrations].map((integration, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-6 py-4 rounded-xl bg-card/60 border border-border/50 hover:border-primary/30 transition-all duration-300 group flex-shrink-0"
                >
                  <div className={`w-10 h-10 rounded-lg bg-background/80 flex items-center justify-center ${integration.color} group-hover:scale-110 transition-transform`}>
                    <integration.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-foreground whitespace-nowrap">{integration.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationLogos;