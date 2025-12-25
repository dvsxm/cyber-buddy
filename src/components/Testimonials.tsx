import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CISO",
      company: "TechCorp Global",
      image: "SC",
      content:
        "CyberShield transformed our security posture. Their AI-powered threat detection caught attacks that our previous solution missed entirely.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "VP of Engineering",
      company: "DataFlow Systems",
      image: "MJ",
      content:
        "The real-time monitoring and instant alerts have been game-changers. We've reduced our incident response time by 85%.",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Security Director",
      company: "FinSecure Bank",
      image: "ER",
      content:
        "Their compliance framework made our SOC 2 and HIPAA audits seamless. The team's expertise is unmatched in the industry.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "500+", label: "Enterprise Clients" },
    { value: "99.97%", label: "Uptime SLA" },
    { value: "50M+", label: "Threats Blocked Daily" },
    { value: "<30s", label: "Avg. Response Time" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 p-8 rounded-2xl bg-card border border-border">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 font-mono">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Trusted by <span className="text-gradient-cyber">Security Leaders</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our clients say about their experience with CyberShield
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Join 500+ companies protecting their digital assets
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Start your free trial today and experience enterprise-grade security
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors glow-cyber"
            >
              Start Free Trial
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-primary/50 text-primary font-semibold hover:bg-primary/10 transition-colors"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
