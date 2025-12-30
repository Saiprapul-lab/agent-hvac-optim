import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
  variant?: "default" | "primary" | "success" | "warning";
  shortcut?: string;
}

const ActionCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  variant = "default",
  shortcut,
}: ActionCardProps) => {
  const variantStyles = {
    default: "hover:border-border/80 hover:bg-secondary/50",
    primary: "border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/30",
    success: "border-success/20 bg-success/5 hover:bg-success/10 hover:border-success/30",
    warning: "border-warning/20 bg-warning/5 hover:bg-warning/10 hover:border-warning/30",
  };

  const iconStyles = {
    default: "text-muted-foreground group-hover:text-foreground",
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-lg border border-border text-left transition-all duration-200 group",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("p-2 rounded-md bg-secondary/50", variant !== "default" && "bg-current/10")}>
          <Icon className={cn("h-5 w-5", iconStyles[variant])} />
        </div>
        {shortcut && (
          <span className="kbd opacity-60 group-hover:opacity-100">{shortcut}</span>
        )}
      </div>
      <div className="mt-3">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </button>
  );
};

export default ActionCard;
