import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sparkles,
  ChevronRight,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
  Lightbulb,
  X,
  MessageSquare,
  Send,
} from "lucide-react";

interface AIInsight {
  id: string;
  type: "alert" | "suggestion" | "insight" | "action";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  action?: string;
  timestamp: string;
}

interface AIAgentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onAction?: (action: string) => void;
}

const mockInsights: AIInsight[] = [
  {
    id: "1",
    type: "alert",
    title: "3 units overdue for testing",
    description: "Downtown Office Tower has units pending since Nov 28. Recommend prioritizing today.",
    priority: "high",
    action: "view-overdue",
    timestamp: "2m ago",
  },
  {
    id: "2",
    type: "suggestion",
    title: "Optimize team allocation",
    description: "Sarah has capacity. Consider reassigning 2 units from Michael to balance workload.",
    priority: "medium",
    action: "optimize-team",
    timestamp: "15m ago",
  },
  {
    id: "3",
    type: "insight",
    title: "Completion rate trending up",
    description: "Project completion is 12% higher than last month. Medical Center driving gains.",
    priority: "low",
    timestamp: "1h ago",
  },
  {
    id: "4",
    type: "action",
    title: "Auto-generate weekly report",
    description: "I can compile this week's progress into a stakeholder report. Shall I proceed?",
    priority: "medium",
    action: "generate-report",
    timestamp: "2h ago",
  },
];

const AIAgentSidebar = ({ isOpen, onClose, onAction }: AIAgentSidebarProps) => {
  const [inputValue, setInputValue] = useState("");

  const getInsightIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "suggestion":
        return <Lightbulb className="h-4 w-4 text-primary" />;
      case "insight":
        return <TrendingUp className="h-4 w-4 text-agent-pulse" />;
      case "action":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
    }
  };

  const getPriorityClass = (priority: AIInsight["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-warning";
      case "medium":
        return "border-l-primary";
      case "low":
        return "border-l-muted-foreground";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 h-full bg-card border-l border-border flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-agent-pulse rounded-full animate-status-dot" />
          </div>
          <span className="font-medium text-sm">AERO Agent</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Agent Status */}
      <div className="px-4 py-3 bg-agent-gradient border-b border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Actively monitoring 4 projects</span>
        </div>
      </div>

      {/* Insights Feed */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          <p className="text-xs font-medium text-muted-foreground px-1 mb-3">
            PROACTIVE INSIGHTS
          </p>
          {mockInsights.map((insight) => (
            <div
              key={insight.id}
              className={`p-3 rounded-lg bg-secondary/50 border-l-2 ${getPriorityClass(insight.priority)} hover:bg-secondary transition-colors cursor-pointer group`}
              onClick={() => insight.action && onAction?.(insight.action)}
            >
              <div className="flex items-start gap-2">
                {getInsightIcon(insight.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">{insight.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {insight.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-muted-foreground">{insight.timestamp}</span>
                    {insight.action && (
                      <ChevronRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Ask anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue.trim()) {
                onAction?.(`chat:${inputValue}`);
                setInputValue("");
              }
            }}
          />
          <Button size="icon" variant="ghost" className="h-6 w-6" disabled={!inputValue.trim()}>
            <Send className="h-3 w-3" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Press ⌘I to open AI assistant
        </p>
      </div>
    </div>
  );
};

export default AIAgentSidebar;
