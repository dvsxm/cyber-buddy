import AnimatedSection from "@/components/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Network, CheckCircle2, Key } from "lucide-react";

const hardeningItems = [
  {
    title: "Dedicated Management VLAN",
    icon: Network,
    priority: "critical" as const,
    description:
      "Isolate the Wazuh Manager and ELK stack on a dedicated VLAN, separated from standard endpoint traffic. Administrative access to Kibana only through a Jump Box or VPN tunnel.",
    checklist: [
      "Create isolated VLAN (e.g., VLAN 100) for SIEM infrastructure",
      "Deploy Jump Box with MFA for admin access",
      "Firewall rules: deny all inbound except agent ports (1514/1515) and VPN",
      "No direct internet access for ELK nodes",
    ],
  },
  {
    title: "Mutual TLS (mTLS) for Agents",
    icon: Lock,
    priority: "critical" as const,
    description:
      "Enforce mutual TLS for all agent-to-manager communication. Prevents rogue agents from spoofing data or unauthorized entities from intercepting log streams.",
    checklist: [
      "Generate CA and sign individual agent certificates",
      "Configure ossec.conf with <auth><ssl_agent_ca> verification",
      "Rotate certificates on 90-day schedule via automation",
      "Alert on certificate expiration within 14 days",
    ],
  },
  {
    title: "Secret Management & IaC",
    icon: Key,
    priority: "high" as const,
    description:
      "Transition from curl-to-bash deployment scripts to Ansible or SaltStack for configuration management. Store all credentials (Wazuh API keys, Nginx SSL certs, ES passwords) in encrypted vaults.",
    checklist: [
      "Migrate install scripts to Ansible playbooks",
      "Use ansible-vault for API keys and SSL certificates",
      "Version control all playbooks (git with .gitignore for vault keys)",
      "Implement least-privilege service accounts for each component",
    ],
  },
];

const priorityColors = {
  critical: "text-red-400 border-red-500/30 bg-red-500/10",
  high: "text-orange-400 border-orange-500/30 bg-orange-500/10",
};

const SecurityHardening = () => {
  return (
    <AnimatedSection delay={600} className="mb-12">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        Security Hardening & Isolation
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        The security stack must be more secure than the infrastructure it monitors.
      </p>
      <div className="grid md:grid-cols-1 gap-4">
        {hardeningItems.map((item, i) => (
          <div
            key={i}
            className="rounded-xl bg-card/80 backdrop-blur-md border border-border p-6 hover:border-primary/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/30 flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <Badge variant="outline" className={`text-xs ${priorityColors[item.priority]}`}>
                    {item.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <div className="space-y-2">
                  {item.checklist.map((check, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default SecurityHardening;
