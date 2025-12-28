import { memo, useState } from "react";
import { 
  Monitor, 
  Cpu, 
  Server, 
  Wifi, 
  Code, 
  Layers, 
  Clock, 
  FileCode,
  Target,
  FileWarning,
  Calendar,
  AlertTriangle,
  Shield,
  Search,
  Brain,
  Box,
  Wrench,
  Database,
  HardDrive,
  Copy,
  ClipboardCheck,
  BookOpen,
  Stethoscope,
  FileSearch,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface SubItem {
  term: string;
  description: string;
}

interface Category {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  subItems: SubItem[];
}

const categories: Category[] = [
  {
    id: "hardware",
    title: "Hardware & Physical Assets",
    icon: Monitor,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    subItems: [
      { term: "Endpoints", description: "Any physical device that connects to a network (laptops, phones, servers)" },
      { term: "Firmware", description: "The permanent software programmed into a hardware device (like the BIOS or UEFI)" },
      { term: "OT (Operational Technology)", description: "Hardware used to monitor or control physical devices, like those in a factory or power plant" },
      { term: "Air-gapping", description: "Physically isolating a piece of hardware from any network connection" },
    ],
  },
  {
    id: "software",
    title: "Software & Operating Systems",
    icon: Code,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    subItems: [
      { term: "Binaries", description: "The compiled, executable version of software that a computer runs" },
      { term: "The Stack", description: "The layers of software a system uses (e.g., OS → Middleware → Application)" },
      { term: "Legacy Systems", description: "Outdated software or hardware that is no longer supported with security updates" },
      { term: "SOE (Standard Operating Environment)", description: "A specific, 'clean' version of an OS that a company deploys to all employees to ensure consistency" },
    ],
  },
  {
    id: "vulnerabilities",
    title: "Vulnerabilities & Exploits",
    icon: Target,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    subItems: [
      { term: "Attack Surface", description: "The sum of all points where an unauthorized user can try to enter or extract data" },
      { term: "CVE (Common Vulnerabilities and Exposures)", description: "The industry-standard list of publicly known security flaws" },
      { term: "Zero-Day", description: "A vulnerability that has been discovered but has not yet been patched by the manufacturer" },
      { term: "CVE Scoring (CVSS)", description: "A numerical score (0–10) used to rank how dangerous a vulnerability is" },
    ],
  },
  {
    id: "defensive",
    title: "Defensive Tools (Antivirus & Anti-Exploits)",
    icon: Shield,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    subItems: [
      { term: "EDR (Endpoint Detection and Response)", description: "Advanced security that watches for suspicious behavior on a computer" },
      { term: "Anti-Malware", description: "A broader term than antivirus, covering ransomware, spyware, and trojans" },
      { term: "Heuristics", description: "A method used by security software to identify new threats based on patterns, rather than a known list" },
      { term: "Sandbox", description: "A safe, isolated environment where a suspicious file is opened to see if it does anything malicious" },
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance & Data (Updates & Storage)",
    icon: Wrench,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    subItems: [
      { term: "Patch Management", description: "The process of regularly updating software to fix security bugs" },
      { term: "Data at Rest / Data in Transit", description: "Terms describing whether data is sitting on a hard drive or moving across a network" },
      { term: "Cold Storage", description: "Keeping backups on a device that is not connected to the internet" },
      { term: "Redundancy", description: "Having multiple copies or backups of a system so if one fails, another takes over" },
    ],
  },
  {
    id: "benchmarks",
    title: "Cyber Benchmarks & Compliance",
    icon: ClipboardCheck,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    subItems: [
      { term: "Security Posture", description: "The overall 'health' or strength of your cybersecurity defenses" },
      { term: "Frameworks (NIST, ISO 27001)", description: "The 'rulebooks' or standards companies follow to ensure they are secure" },
      { term: "Cyber Hygiene", description: "The routine practices (like changing passwords and updating software) that keep a system safe" },
      { term: "Gap Analysis", description: "A report that shows the difference between your current security and where it should be" },
    ],
  },
];

const DeviceManagement = memo(() => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-5 rounded-xl bg-card border border-border">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-lg bg-primary/10">
          <Cpu className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-semibold text-sm">Device Management</h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isExpanded = expandedCategories.includes(category.id);

          return (
            <div
              key={category.id}
              className={`rounded-lg border border-border/50 overflow-hidden transition-all duration-300 ${
                isExpanded ? "bg-background/50" : "bg-background/30 hover:bg-background/40"
              }`}
            >
              {/* Category Header Button */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center gap-3 p-3 text-left transition-all"
              >
                <div className={`w-9 h-9 rounded-lg ${category.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${category.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground leading-tight">{category.title}</p>
                  <p className="text-xs text-muted-foreground">{category.subItems.length} items</p>
                </div>
                <div className="flex-shrink-0">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* Expanded Sub-items */}
              {isExpanded && (
                <div className="px-3 pb-3 space-y-2">
                  {category.subItems.map((subItem, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2 rounded-md bg-muted/30 border border-border/30"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${category.color.replace('text-', 'bg-')} mt-1.5 flex-shrink-0`} />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground">{subItem.term}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{subItem.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

DeviceManagement.displayName = "DeviceManagement";

export default DeviceManagement;
