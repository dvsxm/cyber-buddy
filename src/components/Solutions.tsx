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
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Our Solutions
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
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:glow-cyber"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
