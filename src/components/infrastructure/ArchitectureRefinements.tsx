import AnimatedSection from "@/components/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Cpu, Database, HardDrive, CheckCircle2, AlertTriangle } from "lucide-react";

const refinements = [
  {
    title: "Cluster vs. Single Node",
    icon: Database,
    severity: "critical" as const,
    description:
      "Split Elasticsearch into at least two nodes for shard replication. If one VM crashes, threat data remains searchable. Eliminates single point of failure.",
    recommendation:
      "Deploy ES Node 1 (primary) + ES Node 2 (replica) with cross-node shard allocation. Use cluster.routing.allocation.awareness for rack/VM awareness.",
    status: "planned",
  },
  {
    title: "JVM Heap & Compressed OOPs",
    icon: Cpu,
    severity: "high" as const,
    description:
      "Even with 64GB available, JVM heap must not exceed 31.5GB to maintain Compressed Ordinary Object Pointers (OOPs). Exceeding this switches to 64-bit pointers, causing significant memory overhead.",
    recommendation:
      "Set -Xms31g -Xmx31g in jvm.options. Remaining RAM serves OS file system cache for Lucene segment reads.",
    status: "planned",
  },
  {
    title: "Hot/Warm Storage Tiering (ILM)",
    icon: HardDrive,
    severity: "medium" as const,
    description:
      "Implement Index Lifecycle Management with Hot/Warm architecture. Move logs older than 7–14 days to cheaper, slower storage, keeping NVMe SSDs available for high-velocity ingestion.",
    recommendation:
      'Configure ILM policy: Hot phase (NVMe SSD, 0–7 days) → Warm phase (HDD/Standard SSD, 7–90 days) → Delete phase (90+ days). Use node.attr.data: "hot"|"warm" tags.',
    status: "planned",
  },
];

const severityColors = {
  critical: "text-red-400 border-red-500/30 bg-red-500/10",
  high: "text-orange-400 border-orange-500/30 bg-orange-500/10",
  medium: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
};

const ArchitectureRefinements = () => {
  return (
    <AnimatedSection delay={500} className="mb-12">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        <Cpu className="w-5 h-5 text-primary" />
        Architecture & Performance Refinements
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Production-grade hardening for high-volume threat ingestion and fault tolerance.
      </p>
      <div className="space-y-4">
        {refinements.map((r, i) => (
          <div
            key={i}
            className="rounded-xl bg-card/80 backdrop-blur-md border border-border p-6 hover:border-primary/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/30 flex-shrink-0">
                <r.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{r.title}</h3>
                  <Badge variant="outline" className={`text-xs ${severityColors[r.severity]}`}>
                    {r.severity}
                  </Badge>
                  <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-500/30 bg-yellow-500/10">
                    {r.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{r.description}</p>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs font-mono text-muted-foreground">{r.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default ArchitectureRefinements;
