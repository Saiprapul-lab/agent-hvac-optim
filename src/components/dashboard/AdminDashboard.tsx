import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sparkles,
  FolderKanban,
  Users,
  Layers,
  TrendingUp,
  Plus,
  FileUp,
  BarChart3,
  ChevronRight,
  Search,
  Bell,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Settings,
  PanelRightOpen,
  PanelRightClose,
} from "lucide-react";
import { toast } from "sonner";
import CommandPalette from "./CommandPalette";
import AIAgentSidebar from "./AIAgentSidebar";
import ActivityFeed from "./ActivityFeed";
import MetricCard from "./MetricCard";
import ActionCard from "./ActionCard";
import StatusIndicator from "./StatusIndicator";

// Mock data
const attentionItems = [
  {
    id: "1",
    type: "urgent",
    title: "3 units overdue for testing",
    project: "Downtown Office Tower",
    action: "view-overdue",
  },
  {
    id: "2",
    type: "warning",
    title: "License expires in 15 days",
    project: "System",
    action: "renew-license",
  },
  {
    id: "3",
    type: "info",
    title: "Weekly report ready for review",
    project: "All Projects",
    action: "view-report",
  },
];

const recentProjects = [
  { id: 1, name: "Downtown Office Tower", status: "active", progress: 65, units: 42 },
  { id: 2, name: "Westside Medical Center", status: "pending", progress: 0, units: 86 },
  { id: 3, name: "City Center Hotel", status: "active", progress: 28, units: 124 },
  { id: 4, name: "North Campus Expansion", status: "completed", progress: 100, units: 38 },
];

type AdminDashboardProps = {
  user: any;
};

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const [aiSidebarOpen, setAiSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleCommandAction = (action: string) => {
    switch (action) {
      case "new-project":
        toast.success("Opening new project form");
        break;
      case "ai-assistant":
        setAiSidebarOpen(true);
        break;
      case "quick-test":
        toast.info("Quick test mode activated");
        break;
      default:
        toast.info(`Action: ${action}`);
    }
  };

  const handleAttentionItem = (action: string) => {
    toast.info(`Navigating to: ${action}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success";
      case "pending":
        return "bg-warning";
      case "completed":
        return "bg-primary";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background dark">
      {/* Command Palette */}
      <CommandPalette onAction={handleCommandAction} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-12 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => toast.info("Search activated")}
            >
              <Search className="h-3.5 w-3.5" />
              <span className="text-xs">Search</span>
              <span className="kbd">⌘K</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setAiSidebarOpen(!aiSidebarOpen)}
            >
              {aiSidebarOpen ? (
                <PanelRightClose className="h-4 w-4" />
              ) : (
                <PanelRightOpen className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Area */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                {/* Greeting & Status */}
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                      Good {currentTime.getHours() < 12 ? "morning" : currentTime.getHours() < 17 ? "afternoon" : "evening"}, {user?.name?.split(" ")[0] || "Admin"}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      Here's what needs your attention today
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <StatusIndicator status="online" size="sm" />
                    <span>All systems operational</span>
                  </div>
                </div>

                {/* Attention Required - AI-Surfaced */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Needs Attention</span>
                    <span className="text-xs text-muted-foreground">• AI-prioritized</span>
                  </div>
                  <div className="grid gap-2">
                    {attentionItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleAttentionItem(item.action)}
                        className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:bg-secondary/50 hover:border-primary/20 transition-all group text-left w-full"
                      >
                        {item.type === "urgent" ? (
                          <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                        ) : item.type === "warning" ? (
                          <Clock className="h-4 w-4 text-warning shrink-0" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.project}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <MetricCard
                    title="Active Projects"
                    value={4}
                    change="+2 this month"
                    changeType="positive"
                    icon={FolderKanban}
                    onClick={() => toast.info("Viewing projects")}
                  />
                  <MetricCard
                    title="Team Members"
                    value={12}
                    change="8 active"
                    changeType="neutral"
                    icon={Users}
                    onClick={() => toast.info("Viewing team")}
                  />
                  <MetricCard
                    title="Units Tracked"
                    value={290}
                    change="148 tested"
                    changeType="neutral"
                    icon={Layers}
                    onClick={() => toast.info("Viewing units")}
                  />
                  <MetricCard
                    title="Completion Rate"
                    value="48.3%"
                    change="+5.2%"
                    changeType="positive"
                    icon={TrendingUp}
                    onClick={() => toast.info("Viewing analytics")}
                    glowing
                  />
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <span className="text-sm font-medium">Quick Actions</span>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <ActionCard
                      title="New Project"
                      description="Start a new TAB project"
                      icon={Plus}
                      variant="primary"
                      shortcut="⌘N"
                      onClick={() => toast.success("Opening new project form")}
                    />
                    <ActionCard
                      title="Import Units"
                      description="Bulk add from spreadsheet"
                      icon={FileUp}
                      variant="default"
                      onClick={() => toast.info("Import dialog opening")}
                    />
                    <ActionCard
                      title="Quick Test"
                      description="Start a rapid test session"
                      icon={Zap}
                      variant="success"
                      shortcut="⌘T"
                      onClick={() => toast.info("Quick test mode")}
                    />
                    <ActionCard
                      title="Generate Report"
                      description="AI-powered analytics"
                      icon={BarChart3}
                      variant="default"
                      onClick={() => toast.info("Generating report")}
                    />
                  </div>
                </div>

                {/* Projects List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Recent Projects</span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
                      View all
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {recentProjects.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => toast.info(`Opening ${project.name}`)}
                        className="flex items-center gap-4 p-3 rounded-lg bg-card border border-border hover:bg-secondary/50 hover:border-primary/20 transition-all group w-full text-left"
                      >
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(project.status)}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{project.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {project.units} units • {project.progress}% complete
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Progress bar */}
                          <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden hidden md:block">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-10 text-right">
                            {project.progress}%
                          </span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Activity Feed - Right Panel */}
          <div className="w-72 border-l border-border hidden lg:block">
            <ActivityFeed />
          </div>
        </div>
      </div>

      {/* AI Agent Sidebar */}
      <AIAgentSidebar
        isOpen={aiSidebarOpen}
        onClose={() => setAiSidebarOpen(false)}
        onAction={handleCommandAction}
      />
    </div>
  );
};

export default AdminDashboard;
