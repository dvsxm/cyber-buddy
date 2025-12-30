import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Search } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const categories = [
  {
    name: "Getting Started",
    questions: [
      {
        q: "How do I get started with CyberShield?",
        a: "Simply sign up for a free trial, connect your infrastructure using our simple integration guide, and you'll be protected within minutes. Our onboarding wizard will walk you through each step.",
      },
      {
        q: "What integrations do you support?",
        a: "We support all major cloud providers (AWS, Azure, GCP), container platforms (Kubernetes, Docker), CI/CD tools (GitHub, GitLab, Jenkins), and identity providers (Okta, Auth0, Azure AD).",
      },
    ],
  },
  {
    name: "Security",
    questions: [
      {
        q: "How does AI threat detection work?",
        a: "Our AI analyzes patterns across billions of security events using machine learning models trained on real-world attack data. It identifies anomalies and threats in real-time, with a detection rate of over 99.9%.",
      },
      {
        q: "Is my data secure with CyberShield?",
        a: "Absolutely. We use end-to-end encryption, zero-knowledge architecture, and are SOC 2 Type II, ISO 27001, and GDPR compliant. Your data never leaves your infrastructure.",
      },
    ],
  },
  {
    name: "Billing",
    questions: [
      {
        q: "What's included in the free trial?",
        a: "The 14-day free trial includes full access to all Professional plan features, including AI threat detection, 24/7 monitoring, and priority support. No credit card required.",
      },
      {
        q: "Can I change plans at any time?",
        a: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately, and we'll prorate any differences.",
      },
    ],
  },
];

const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState("Getting Started");

  const toggleItem = (key: string) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(key)) {
      newOpen.delete(key);
    } else {
      newOpen.add(key);
    }
    setOpenItems(newOpen);
  };

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Support
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-gradient-cyber">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions about CyberShield
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {/* Category Tabs */}
          <AnimatedSection delay={100} className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === category.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </AnimatedSection>

          {/* Questions */}
          <div className="space-y-4">
            {(searchQuery ? filteredCategories : categories.filter((c) => c.name === activeCategory)).map(
              (category) =>
                category.questions.map((item, index) => {
                  const key = `${category.name}-${index}`;
                  const isOpen = openItems.has(key);

                  return (
                    <AnimatedSection key={key} delay={index * 100}>
                      <div className="rounded-xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-colors">
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full flex items-center justify-between p-5 text-left"
                        >
                          <div className="flex items-center gap-3">
                            <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="font-medium">{item.q}</span>
                          </div>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 pt-0 animate-fade-in">
                            <div className="pl-8 text-muted-foreground">
                              {item.a}
                            </div>
                          </div>
                        )}
                      </div>
                    </AnimatedSection>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;