import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "How quickly can CyberShield be deployed?",
      answer:
        "CyberShield can be deployed within minutes for cloud environments. For on-premise solutions, our team typically completes full deployment within 24-48 hours, including initial configuration and testing.",
    },
    {
      question: "What types of threats does CyberShield detect?",
      answer:
        "Our AI-powered platform detects a wide range of threats including ransomware, phishing attacks, zero-day exploits, DDoS attacks, insider threats, malware, SQL injection, and advanced persistent threats (APTs).",
    },
    {
      question: "Is CyberShield compliant with major security frameworks?",
      answer:
        "Yes, CyberShield is fully compliant with SOC 2 Type II, ISO 27001, GDPR, HIPAA, PCI DSS, and FedRAMP. We provide comprehensive compliance reporting and audit support.",
    },
    {
      question: "How does the pricing scale for larger organizations?",
      answer:
        "Our Enterprise plan offers custom pricing based on your specific needs, including number of endpoints, users, and required features. Contact our sales team for a tailored quote.",
    },
    {
      question: "Do you offer 24/7 monitoring and support?",
      answer:
        "Professional and Enterprise plans include 24/7 monitoring by our Security Operations Center (SOC). All paid plans include priority support with guaranteed response times.",
    },
    {
      question: "Can CyberShield integrate with our existing security tools?",
      answer:
        "Absolutely. CyberShield integrates seamlessly with major SIEM platforms, identity providers, cloud services (AWS, Azure, GCP), and hundreds of other security tools via our REST API and pre-built connectors.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-card/50 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-gradient-cyber">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about CyberShield's security platform
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6 text-foreground font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help.
          </p>
          <a
            href="#contact"
            className="text-primary font-medium hover:underline"
          >
            Contact our team →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
