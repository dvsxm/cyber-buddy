import { Shield, Award, FileCheck, Lock, CheckCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const certifications = [
  {
    name: "SOC 2 Type II",
    description: "Verified security controls",
    icon: Shield,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    name: "ISO 27001",
    description: "Information security certified",
    icon: Award,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    name: "GDPR Compliant",
    description: "EU data protection",
    icon: FileCheck,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    name: "HIPAA Compliant",
    description: "Healthcare data protection",
    icon: Lock,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    name: "PCI DSS",
    description: "Payment card security",
    icon: CheckCircle,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
];

const SecurityCertifications = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-10">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
            Compliance & Certifications
          </span>
          <h3 className="text-2xl md:text-3xl font-bold">
            Enterprise-Grade <span className="text-gradient-cyber">Security Standards</span>
          </h3>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {certifications.map((cert, index) => (
            <AnimatedSection key={cert.name} delay={index * 100}>
              <div className="group p-5 rounded-xl bg-card/60 border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 text-center">
                <div className={`w-12 h-12 rounded-xl ${cert.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <cert.icon className={`w-6 h-6 ${cert.color}`} />
                </div>
                <h4 className="font-semibold text-sm mb-1">{cert.name}</h4>
                <p className="text-xs text-muted-foreground">{cert.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityCertifications;