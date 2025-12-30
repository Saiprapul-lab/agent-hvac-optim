import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Upload,
  FileCheck,
  UserPlus,
  Zap,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "success" | "warning" | "info" | "pending";
  icon: "check" | "alert" | "upload" | "file" | "user" | "test";
  title: string;
  description: string;
  timestamp: string;
  project?: string;
}

const mockActivity: ActivityItem[] = [
  {
    id: "1",
    type: "success",
    icon: "check",
    title: "Test completed",
    description: "Unit AHU-042 passed all criteria",
    timestamp: "Just now",
    project: "Downtown Office Tower",
  },
  {
    id: "2",
    type: "info",
    icon: "test",
    title: "Test in progress",
    description: "Michael Chen testing VAV-018",
    timestamp: "2m ago",
    project: "City Center Hotel",
  },
  {
    id: "3",
    type: "warning",
    icon: "alert",
    title: "Deficiency logged",
    description: "Airflow imbalance detected on FCU-112",
    timestamp: "8m ago",
    project: "Downtown Office Tower",
  },
  {
    id: "4",
    type: "success",
    icon: "file",
    title: "Report generated",
    description: "Weekly progress report ready",
    timestamp: "15m ago",
  },
  {
    id: "5",
    type: "info",
    icon: "user",
    title: "Team member assigned",
    description: "Emily Rodriguez → Westside Medical",
    timestamp: "32m ago",
  },
  {
    id: "6",
    type: "success",
    icon: "upload",
    title: "Units imported",
    description: "86 units added from spreadsheet",
    timestamp: "1h ago",
    project: "Westside Medical Center",
  },
];

const ActivityFeed = () => {
  const getIcon = (item: ActivityItem) => {
    const iconClass = "h-4 w-4";
    switch (item.icon) {
      case "check":
        return <CheckCircle2 className={`${iconClass} text-success`} />;
      case "alert":
        return <AlertCircle className={`${iconClass} text-warning`} />;
      case "upload":
        return <Upload className={`${iconClass} text-primary`} />;
      case "file":
        return <FileCheck className={`${iconClass} text-success`} />;
      case "user":
        return <UserPlus className={`${iconClass} text-primary`} />;
      case "test":
        return <Zap className={`${iconClass} text-info`} />;
    }
  };

  const getTypeBg = (type: ActivityItem["type"]) => {
    switch (type) {
      case "success":
        return "bg-success/10";
      case "warning":
        return "bg-warning/10";
      case "info":
        return "bg-info/10";
      case "pending":
        return "bg-muted";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-medium">Live Activity</h3>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 bg-success rounded-full animate-status-dot" />
          <span className="text-xs text-muted-foreground">Real-time</span>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-1">
          {mockActivity.map((item, index) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`p-1.5 rounded-md ${getTypeBg(item.type)}`}>
                {getIcon(item)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {item.description}
                </p>
                {item.project && (
                  <span className="inline-block text-[10px] text-primary mt-1 bg-primary/10 px-1.5 py-0.5 rounded">
                    {item.project}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ActivityFeed;
