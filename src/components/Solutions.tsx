import { Shield, Bug, Server, Lock, Globe, Database } from "lucide-react";

const solutions = [
  {
    icon: Shield,
    title: "Threat Detection",
    description: "AI-powered threat detection that identifies and neutralizes attacks before they cause damage.",
  },
  {
    icon: Bug,
    title: "Vulnerability Assessment",
    description: "Comprehensive security audits to identify weaknesses in your systems and applications.",
  },
  {
    icon: Server,
    title: "Network Security",
    description: "Advanced firewall and intrusion detection systems to protect your network infrastructure.",
  },
  {
    icon: Lock,
    title: "Data Encryption",
    description: "Military-grade encryption for data at rest and in transit, ensuring complete confidentiality.",
  },
  {
    icon: Globe,
    title: "Web Application Security",
    description: "Protect your web applications from SQL injection, XSS, and other common attacks.",
  },
  {
    icon: Database,
    title: "Cloud Security",
    description: "Secure your cloud infrastructure with multi-layered protection and compliance monitoring.",
  },
];

const Solutions = () => {
  return (
    <section id="solutions" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <span className="text-sm text-primary font-medium uppercase tracking-wider">Our Solutions</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Comprehensive <span className="text-gradient-cyber">Security</span> Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            Protect every aspect of your digital ecosystem with our enterprise-grade security services.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className="group p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-primary/20">
                  <solution.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="absolute inset-0 w-14 h-14 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                {solution.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {solution.description}
              </p>
              
              {/* Learn more link */}
              <div className="mt-6 pt-4 border-t border-border/50">
                <a href="#" className="inline-flex items-center gap-2 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:gap-3">
                  Learn more
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
