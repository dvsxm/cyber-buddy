import { useState } from "react";
import { Send, CheckCircle, MapPin, Phone, Mail, Clock } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "./ui/button";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    interest: "demo",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    { icon: MapPin, label: "Address", value: "100 Security Way, San Francisco, CA 94105" },
    { icon: Phone, label: "Phone", value: "+1 (800) CYBER-01" },
    { icon: Mail, label: "Email", value: "hello@cybershield.com" },
    { icon: Clock, label: "Hours", value: "24/7 Support Available" },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient-cyber">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to secure your infrastructure? Get in touch with our team for a personalized demo.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <AnimatedSection delay={100}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <p className="text-muted-foreground mb-8">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="h-48 rounded-xl bg-card border border-border overflow-hidden relative">
                <div className="absolute inset-0 bg-grid-cyber opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Global Offices</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={200}>
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border">
              {isSubmitted ? (
                <div className="text-center py-12 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We'll be in touch soon.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">I'm interested in</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Demo", "Pricing", "Support"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormData({ ...formData, interest: option.toLowerCase() })}
                          className={`py-2 rounded-lg text-sm font-medium transition-all ${
                            formData.interest === option.toLowerCase()
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your security needs..."
                    />
                  </div>

                  <Button type="submit" variant="cyber" className="w-full group">
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By submitting, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </>
              )}
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;