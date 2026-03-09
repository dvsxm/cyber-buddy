import AnimatedSection from "@/components/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Activity, Terminal, AlertTriangle, CheckCircle2, BarChart3, Crosshair } from "lucide-react";

const enhancements = [
  {
    title: "Automated Adversary Emulation",
    icon: Crosshair,
    phase: "Testing",
    description:
      "Integrate Atomic Red Team scripts into the Kali Endpoint Agent. After hardening with Lynis, run specific 'Atomics' to verify that Wazuh actually triggers alerts for common MITRE ATT&CK techniques.",
    examples: [
      "T1053 — Scheduled Tasks: Verify Wazuh alerts on cron job creation",
      "T1059 — Command & Scripting: Detect PowerShell/Bash reverse shells",
      "T1078 — Valid Accounts: Alert on brute-force and credential stuffing",
      "T1190 — Exploit Public-Facing Application: Trigger on SQLi/XSS patterns",
    ],
  },
  {
    title: "Custom Decoder Integration Testing",
    icon: Terminal,
    phase: "Validation",
    description:
      "Ensure nmap/ffuf scan output is piped into Wazuh's Analysis Engine via custom decoders. Authorized internal scans should trigger 'Authorized Internal Scanning' alerts — not just fill up logs.",
    examples: [
      "Create Wazuh decoder for nmap XML output parsing",
      "Tag authorized scans with source IP whitelist rules",
      "Trigger 'High Severity' alert if scan originates from non-Kali source",
      "Auto-correlate scan results with known asset inventory",
    ],
  },
  {
    title: "VM Fleet Resource Monitoring",
    icon: BarChart3,
    phase: "Observability",
    description:
      "Deploy Netdata or Prometheus + Grafana specifically for the VM fleet. Monitor CPU steal time and IOPS on Elasticsearch VMs to prevent silent drops in log ingestion during high-volume events.",
    examples: [
      "CPU steal time alerts (>10% threshold) on all ES nodes",
      "IOPS monitoring with baseline deviation alerts on NVMe volumes",
      "Memory pressure alerts when ES heap exceeds 75% utilization",
      "Network I/O saturation detection between agent and manager VMs",
    ],
  },
];

const PipelineEnhancements = () => {
  return (
    <AnimatedSection delay={700} className="mb-12">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        Pipeline & Testing Enhancements
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Robust testing and monitoring to ensure the SIEM pipeline performs under real-world conditions.
      </p>
      <div className="space-y-4">
        {enhancements.map((e, i) => (
          <div
            key={i}
            className="rounded-xl bg-card/80 backdrop-blur-md border border-border p-6 hover:border-primary/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/30 flex-shrink-0">
                <e.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{e.title}</h3>
                  <Badge variant="outline" className="text-xs text-primary border-primary/30 bg-primary/10">
                    {e.phase}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{e.description}</p>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/50 space-y-2">
                  {e.examples.map((ex, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs font-mono text-muted-foreground">{ex}</span>
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

export default PipelineEnhancements;
