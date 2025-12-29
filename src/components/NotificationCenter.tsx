import { memo, useState } from "react";
import { 
  Bell, 
  AlertTriangle, 
  Shield, 
  CheckCircle, 
  Info,
  X,
  ChevronRight,
  Clock
} from "lucide-react";
import { Button } from "./ui/button";

interface Notification {
  id: string;
  type: "critical" | "warning" | "success" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NotificationCenter = memo(() => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "critical",
      title: "Critical Threat Detected",
      message: "Ransomware attempt blocked on endpoint DEV-PC-042",
      time: "2 min ago",
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Suspicious Login Attempt",
      message: "Multiple failed logins from IP 192.168.1.105",
      time: "15 min ago",
      read: false,
    },
    {
      id: "3",
      type: "success",
      title: "Scan Complete",
      message: "Full system scan completed. No threats found.",
      time: "1 hour ago",
      read: true,
    },
    {
      id: "4",
      type: "info",
      title: "Update Available",
      message: "Security definitions v2.4.1 ready to install",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const getNotificationStyle = (type: Notification["type"]) => {
    switch (type) {
      case "critical":
        return { icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" };
      case "warning":
        return { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" };
      case "success":
        return { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" };
      case "info":
        return { icon: Info, color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" };
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="rounded-2xl bg-card/60 backdrop-blur-md border border-border p-6 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded-lg bg-primary/10">
            <Bell className="w-5 h-5 text-primary" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-xs font-bold text-primary-foreground flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Notifications</h3>
            <p className="text-xs text-muted-foreground">{unreadCount} unread alerts</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
          Mark all read
        </Button>
      </div>

      {/* Notification List */}
      <div className="space-y-3 max-h-[320px] overflow-y-auto custom-scrollbar">
        {notifications.map((notification) => {
          const style = getNotificationStyle(notification.type);
          return (
            <div
              key={notification.id}
              className={`relative p-4 rounded-xl ${style.bg} border ${style.border} ${
                !notification.read ? 'ring-1 ring-primary/20' : ''
              } group transition-all hover:scale-[1.02]`}
            >
              <button
                onClick={() => dismissNotification(notification.id)}
                className="absolute top-2 right-2 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-background/50 transition-all"
              >
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
              
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-lg ${style.bg}`}>
                  <style.icon className={`w-4 h-4 ${style.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-foreground truncate">{notification.title}</p>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button variant="outline" size="sm" className="w-full mt-4 group">
        View All Alerts
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Button>
    </div>
  );
});

NotificationCenter.displayName = "NotificationCenter";

export default NotificationCenter;
