import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useState } from "react";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(1);

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

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-6">
        {/* Stats Bar */}
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors duration-500">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 100}>
                <div className="text-center group cursor-default">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2 font-mono group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Trusted by <span className="text-gradient-cyber">Security Leaders</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our clients say about their experience with CyberShield
          </p>
        </AnimatedSection>

        {/* Testimonials Carousel for Mobile */}
        <div className="md:hidden relative">
          <AnimatedSection>
            <div className="p-8 rounded-2xl bg-card border border-border">
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                "{testimonials[activeIndex].content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                  {testimonials[activeIndex].image}
                </div>
                <div>
                  <div className="font-semibold">{testimonials[activeIndex].name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid for Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={index * 150}>
              <div
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 relative hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors" />

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
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold group-hover:scale-110 transition-transform">
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
            </AnimatedSection>
          ))}
        </div>

        {/* CTA Banner */}
        <AnimatedSection delay={500}>
          <div className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 text-center relative overflow-hidden group hover:border-primary/40 transition-colors">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">
              Join 500+ companies protecting their digital assets
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto relative z-10">
              Start your free trial today and experience enterprise-grade security
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 glow-cyber hover:scale-105"
              >
                Start Free Trial
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-primary/50 text-primary font-semibold hover:bg-primary/10 transition-all duration-300"
              >
                Schedule Demo
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Testimonials;
