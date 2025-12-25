import { Shield, Award, CheckCircle2, Lock } from "lucide-react";

const Compliance = () => {
  const certifications = [
    {
      icon: Shield,
      name: "SOC 2 Type II",
      description: "Certified",
      color: "text-primary",
    },
    {
      icon: Award,
      name: "ISO 27001",
      description: "Compliant",
      color: "text-green-400",
    },
    {
      icon: Lock,
      name: "GDPR",
      description: "Ready",
      color: "text-blue-400",
    },
    {
      icon: CheckCircle2,
      name: "HIPAA",
      description: "Certified",
      color: "text-purple-400",
    },
  ];

  const awards = [
    { title: "Gartner Leader", year: "2024" },
    { title: "Forrester Wave", year: "Leader" },
    { title: "G2 Best Security", year: "#1 Rated" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Enterprise-Grade <span className="text-gradient-cyber">Compliance</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet regulatory requirements with our comprehensive compliance framework
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <div
              key={cert.name}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 text-center"
            >
              <div className="inline-flex p-4 rounded-xl bg-muted mb-4 group-hover:glow-cyber transition-all duration-300">
                <cert.icon className={`w-8 h-8 ${cert.color}`} />
              </div>
              <h3 className="font-semibold mb-1">{cert.name}</h3>
              <p className="text-sm text-muted-foreground">{cert.description}</p>
            </div>
          ))}
        </div>

        {/* Awards Banner */}
        <div className="flex flex-wrap items-center justify-center gap-8 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20">
          {awards.map((award, index) => (
            <div key={award.title} className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">{award.year}</div>
              <div className="text-sm text-muted-foreground">{award.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Compliance;
