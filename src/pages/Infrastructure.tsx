import { useState } from "react";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedSection from "@/components/AnimatedSection";
import { 
  Server, HardDrive, Cpu, Database, Shield, Activity, 
  CheckCircle2, AlertTriangle, ArrowRight, Terminal, 
  Monitor, Network, Lock, Zap, Cloud, Box
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const vmSpecs = [
  {
    name: "Wazuh Manager",
    icon: Shield,
    specs: { ram: "16GB RAM", cores: "8 cores", storage: "SSD RAID" },
    status: "planned" as const,
    description: "Central SIEM manager for log ingestion, active response, and threat correlation.",
    scalingTip: "Shard indices; offload to SSD RAID for high EPS throughput.",
  },
  {
    name: "Elasticsearch",
    icon: Database,
    specs: { ram: "64GB RAM max heap", cores: "16 cores", storage: "NVMe SSD" },
    status: "planned" as const,
    description: "Indexing engine for threat data, ML anomaly detection, and fast query response.",
    scalingTip: "1:32 RAM:heap ratio; ILM policies keep queries <2s.",
  },
  {
    name: "Kibana / Frontend Proxy",
    icon: Monitor,
    specs: { ram: "4GB RAM", cores: "4 cores", storage: "Standard SSD" },
    status: "planned" as const,
    description: "Visualization layer proxied via Nginx for CyberShield frontend API feeds.",
    scalingTip: "Proxy via Nginx for CyberShield frontend; cache dashboard queries.",
  },
  {
    name: "Kali Endpoint Agent",
    icon: Terminal,
    specs: { ram: "8GB RAM", cores: "4 cores", storage: "Standard" },
    status: "planned" as const,
    description: "Pentest and scanning endpoint with nmap/ffuf/Zeek integrations.",
    scalingTip: "Deploy lightweight agents; auto-report logs, vulns, FIM to manager.",
  },
];

const backends = [
  {
    name: "Wazuh + ELK",
    recommended: true,
    strengths: "Free, agent-based IDS/EDR, ML native",
    weaknesses: "Steeper indexing tuning",
    fit: "High: Matches Kali/Wazuh skills",
  },
  {
    name: "Zeek + Kafka + Grafana",
    recommended: false,
    strengths: "Network-focused parsing, streaming",
    weaknesses: "Less host vuln scanning",
    fit: "Good: Network eng background",
  },
  {
    name: "OpenSearch + Fluentd",
    recommended: false,
    strengths: "AWS-native search, log shipper",
    weaknesses: "Vendor lock if cloud-heavy",
    fit: "Medium: If Azure/AWS shift",
  },
  {
    name: "Splunk Free",
    recommended: false,
    strengths: "Rich queries, dashboards",
    weaknesses: "500MB/day limit",
    fit: "Low: Cost for scale",
  },
];

const deploymentSteps = [
  {
    step: 1,
    title: "Provision VMs",
    description: "Use Proxmox or VirtualBox for VM orchestration. Deploy Ubuntu 22.04 LTS base images.",
    status: "ready",
    icon: Box,
  },
  {
    step: 2,
    title: "Install Wazuh All-in-One",
    description: "curl -sO https://packages.wazuh.com/4.8/wazuh-install.sh && sudo bash ./wazuh-install.sh -a",
    status: "ready",
    icon: Terminal,
  },
  {
    step: 3,
    title: "Configure Agents",
    description: "Deploy agents on monitored VMs. Configure active response for auto-blocking DDoS/phishing.",
    status: "ready",
    icon: Network,
  },
  {
    step: 4,
    title: "Connect to CyberShield",
    description: "Feed Kibana APIs to CyberShield frontend for response time, geo-threats, and MTTR metrics.",
    status: "pending",
    icon: Zap,
  },
  {
    step: 5,
    title: "Add ML Jobs",
    description: "Configure ML anomaly detection in Kibana for phishing/DDoS prediction. Add Filebeat for vector heatmaps.",
    status: "pending",
    icon: Cpu,
  },
  {
    step: 6,
    title: "Harden & Test",
    description: "Run lynis for hardening. Test in isolated VM. Integrate nmap/ffuf scans via custom Wazuh rules.",
    status: "pending",
    icon: Lock,
  },
];

const statusColors = {
  online: "bg-green-500",
  planned: "bg-yellow-500",
  offline: "bg-red-500",
  ready: "text-green-400",
  pending: "text-yellow-400",
};

const Infrastructure = () => {
  const [selectedBackend, setSelectedBackend] = useState(0);

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Navbar />
      
      <section className="pt-24 pb-16 relative">
        <div className="absolute inset-0 bg-grid-cyber opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          
          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <Server className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Backend Infrastructure</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Infrastructure <span className="text-gradient-cyber">Command Center</span>
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              On-prem VM deployment plan for Wazuh + ELK Stack backend. Scalable SIEM architecture 
              designed for high-volume threat ingestion, ML analytics, and real-time alerting.
            </p>
          </AnimatedSection>

          {/* VM Specs Grid */}
          <AnimatedSection delay={100} className="mb-12">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-primary" />
              Virtual Machine Fleet
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {vmSpecs.map((vm, i) => (
                <div key={i} className="rounded-xl bg-card/80 backdrop-blur-md border border-border p-6 hover:border-primary/30 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/30">
                        <vm.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{vm.name}</h3>
                        <Badge variant="outline" className="mt-1 text-yellow-400 border-yellow-500/30 bg-yellow-500/10 text-xs">
                          {vm.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{vm.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 rounded-md bg-muted text-xs font-mono text-foreground">{vm.specs.ram}</span>
                    <span className="px-2 py-1 rounded-md bg-muted text-xs font-mono text-foreground">{vm.specs.cores}</span>
                    <span className="px-2 py-1 rounded-md bg-muted text-xs font-mono text-foreground">{vm.specs.storage}</span>
                  </div>
                  <p className="text-xs text-muted-foreground italic">💡 {vm.scalingTip}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Deployment Steps */}
          <AnimatedSection delay={200} className="mb-12">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Deployment Pipeline
            </h2>
            <div className="rounded-xl bg-card/60 backdrop-blur-md border border-border p-6">
              <div className="space-y-4">
                {deploymentSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-background/30 border border-border/30 hover:border-border/60 transition-all">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                      {step.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <step.icon className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">{step.title}</span>
                        {step.status === "ready" ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">{step.description}</p>
                    </div>
                    <Badge variant="outline" className={`text-xs ${step.status === "ready" ? "text-green-400 border-green-500/30 bg-green-500/10" : "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"}`}>
                      {step.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Backend Comparison */}
          <AnimatedSection delay={300} className="mb-12">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Cloud className="w-5 h-5 text-primary" />
              Backend Alternatives
            </h2>
            <div className="rounded-xl bg-card/60 backdrop-blur-md border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-4 font-medium text-muted-foreground">Backend</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Strengths</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Weaknesses</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Fit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backends.map((b, i) => (
                      <tr key={i} className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${b.recommended ? "bg-primary/5" : ""}`}>
                        <td className="p-4 font-medium text-foreground flex items-center gap-2">
                          {b.name}
                          {b.recommended && (
                            <Badge className="bg-primary/20 text-primary text-xs">Recommended</Badge>
                          )}
                        </td>
                        <td className="p-4 text-muted-foreground">{b.strengths}</td>
                        <td className="p-4 text-muted-foreground">{b.weaknesses}</td>
                        <td className="p-4 text-muted-foreground">{b.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>

          {/* Configuration Highlights */}
          <AnimatedSection delay={400}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl bg-card/60 backdrop-blur-md border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Threat Ingestion
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Enable active response for auto-blocking DDoS/phishing
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Tune decoders for attack type classification
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Sigma/YARA rules integrated with Wazuh/Zeek
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    MITRE ATT&CK and VirusTotal feed integration
                  </li>
                </ul>
              </div>
              <div className="rounded-xl bg-card/60 backdrop-blur-md border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-primary" />
                  Dashboard Backend
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Kibana APIs feed response time/MTTR graphs
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Filebeat for vector heatmap data pipeline
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    ILM policies for index optimization (&lt;2s queries)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    UEBA module for user behavior anomaly detection
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>
    </div>
  );
};

export default Infrastructure;
