import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "./ui/button";

const DemoVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            See It In Action
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Watch the <span className="text-gradient-cyber">Demo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how CyberShield protects your infrastructure in real-time
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto">
            {/* Video Container */}
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card/80 backdrop-blur-sm group">
              {/* Video Placeholder with animated demo */}
              <div className="aspect-video bg-gradient-to-br from-cyber-dark to-background relative overflow-hidden">
                {/* Simulated Dashboard Preview */}
                <div className="absolute inset-0 p-6">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="h-4 w-64 bg-muted/30 rounded" />
                  </div>

                  {/* Dashboard Grid */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-20 bg-muted/20 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>

                  {/* Main Chart Area */}
                  <div className="h-40 bg-muted/20 rounded-lg mb-4 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-3/4 flex items-end gap-1 px-4">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-primary/50 rounded-t animate-pulse"
                          style={{
                            height: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-16 bg-muted/20 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>

                {/* Play Button Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 glow-cyber-lg group"
                    >
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </button>
                  </div>
                )}

                {/* Scan line effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 animate-scan" />
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Progress Bar */}
                <div className="w-full h-1 bg-muted rounded-full mb-3 cursor-pointer">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 hover:bg-card rounded-lg transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-foreground" />
                      ) : (
                        <Play className="w-5 h-5 text-foreground" />
                      )}
                    </button>
                    <button className="p-2 hover:bg-card rounded-lg transition-colors">
                      <SkipForward className="w-5 h-5 text-foreground" />
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 hover:bg-card rounded-lg transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-foreground" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-foreground" />
                      )}
                    </button>
                    <span className="text-sm text-muted-foreground ml-2">0:00 / 2:30</span>
                  </div>
                  <button className="p-2 hover:bg-card rounded-lg transition-colors">
                    <Maximize className="w-5 h-5 text-foreground" />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Description */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground mb-4">
                Learn how to set up your security dashboard and start protecting your infrastructure in under 5 minutes
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button variant="cyber" className="group">
                  Start Free Trial
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Button>
                <Button variant="cyber-outline">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default DemoVideo;