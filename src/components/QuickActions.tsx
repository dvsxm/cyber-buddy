import { memo } from "react";
import { 
  Shield, 
  Scan, 
  Lock, 
  RefreshCw, 
  Download, 
  Settings,
  Wifi,
  WifiOff
} from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

interface QuickAction {
  icon: React.ElementType;
  label: string;
  description: string;
  variant: "default" | "destructive" | "outline";
  action: () => void;
}

const QuickActions = memo(() => {
  const handleAction = (actionName: string) => {
    toast({
      title: `${actionName} Initiated`,
      description: "This action is being processed...",
    });
  };

  const actions: QuickAction[] = [
    {
      icon: Scan,
      label: "Quick Scan",
      description: "Scan for threats",
      variant: "default",
      action: () => handleAction("Quick Scan"),
    },
    {
      icon: Shield,
      label: "Full Scan",
      description: "Deep system scan",
      variant: "outline",
      action: () => handleAction("Full System Scan"),
    },
    {
      icon: Lock,
      label: "Lockdown",
      description: "Isolate endpoint",
      variant: "destructive",
      action: () => handleAction("Endpoint Lockdown"),
    },
    {
      icon: RefreshCw,
      label: "Update",
      description: "Update definitions",
      variant: "outline",
      action: () => handleAction("Definition Update"),
    },
  ];

  const systemStatus = [
    { label: "Firewall", status: true, icon: Shield },
    { label: "Network", status: true, icon: Wifi },
    { label: "VPN", status: false, icon: WifiOff },
  ];

  return (
    <div className="rounded-2xl bg-card/60 backdrop-blur-md border border-border p-6 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Settings className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Quick Actions</h3>
            <p className="text-xs text-muted-foreground">One-click remediation</p>
          </div>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            className="h-auto py-3 px-4 flex flex-col items-start gap-1 group"
            onClick={action.action}
          >
            <div className="flex items-center gap-2 w-full">
              <action.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-sm">{action.label}</span>
            </div>
            <span className="text-xs opacity-70">{action.description}</span>
          </Button>
        ))}
      </div>

      {/* System Status */}
      <div className="border-t border-border pt-4">
        <p className="text-xs text-muted-foreground mb-3">System Status</p>
        <div className="flex items-center gap-4">
          {systemStatus.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.status ? 'bg-green-500' : 'bg-red-500'}`} />
              <item.icon className={`w-4 h-4 ${item.status ? 'text-green-400' : 'text-red-400'}`} />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Download Report Button */}
      <Button variant="outline" size="sm" className="w-full mt-4 group">
        <Download className="w-4 h-4 mr-2" />
        Export Security Report
      </Button>
    </div>
  );
});

QuickActions.displayName = "QuickActions";

export default QuickActions;
