import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "online" | "busy" | "away" | "offline";
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  label?: string;
}

const StatusIndicator = ({ status, size = "md", pulse = true, label }: StatusIndicatorProps) => {
  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3 w-3",
  };

  const statusColors = {
    online: "bg-success",
    busy: "bg-warning",
    away: "bg-muted-foreground",
    offline: "bg-destructive",
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "rounded-full",
          sizeClasses[size],
          statusColors[status],
          pulse && status === "online" && "animate-status-dot"
        )}
      />
      {label && (
        <span className="text-xs text-muted-foreground capitalize">{label}</span>
      )}
    </div>
  );
};

export default StatusIndicator;
