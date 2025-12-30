import { Star, Quote } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const caseStudies = [
  {
    company: "TechCorp Global",
    logo: "TC",
    industry: "Technology",
    stats: {
      threatsBlocked: "2.5M+",
      costSaved: "$1.2M",
      timeReduced: "85%",
    },
    quote:
      "CyberShield has transformed our security posture. We've seen a 95% reduction in security incidents since implementation.",
    author: "Sarah Chen",
    role: "CISO",
    rating: 5,
  },
  {
    company: "FinanceFirst Bank",
    logo: "FF",
    industry: "Finance",
    stats: {
      threatsBlocked: "5M+",
      costSaved: "$3.5M",
      timeReduced: "90%",
    },
    quote:
      "The AI-powered threat detection caught a sophisticated attack that our previous solution missed completely.",
    author: "Michael Rodriguez",
    role: "VP of Security",
    rating: 5,
  },
  {
    company: "HealthPlus Systems",
    logo: "HP",
    industry: "Healthcare",
    stats: {
      threatsBlocked: "1.8M+",
      costSaved: "$850K",
      timeReduced: "75%",
    },
    quote:
      "HIPAA compliance became seamless with CyberShield. Their team understands healthcare security like no other.",
    author: "Dr. Emily Watson",
    role: "CTO",
    rating: 5,
  },
];

const CaseStudies = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Trusted by <span className="text-gradient-cyber">Industry Leaders</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how organizations across industries have transformed their security with CyberShield
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <AnimatedSection key={study.company} delay={index * 150}>
              <div className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xl font-bold text-primary">
                    {study.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold">{study.company}</h3>
                    <p className="text-sm text-muted-foreground">{study.industry}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-background/50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary font-mono">
                      {study.stats.threatsBlocked}
                    </div>
                    <div className="text-xs text-muted-foreground">Threats Blocked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400 font-mono">
                      {study.stats.costSaved}
                    </div>
                    <div className="text-xs text-muted-foreground">Cost Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-accent font-mono">
                      {study.stats.timeReduced}
                    </div>
                    <div className="text-xs text-muted-foreground">Time Reduced</div>
                  </div>
                </div>

                {/* Quote */}
                <div className="flex-1 relative mb-6">
                  <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground italic relative z-10 pl-4">
                    "{study.quote}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="font-medium">{study.author}</p>
                    <p className="text-sm text-muted-foreground">{study.role}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(study.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;