import { useEffect, useState, useCallback } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  FileText,
  Plus,
  Search,
  Sparkles,
  Zap,
  BarChart3,
  Bell,
  LogOut,
} from "lucide-react";

interface CommandPaletteProps {
  onAction?: (action: string) => void;
  onLogout?: () => void;
}

const CommandPalette = ({ onAction, onLogout }: CommandPaletteProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = useCallback((action: string) => {
    setOpen(false);
    onAction?.(action);
  }, [onAction]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => handleSelect("new-project")}>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Project</span>
            <span className="ml-auto text-xs text-muted-foreground">⌘N</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("ai-assistant")}>
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            <span>Ask AI Assistant</span>
            <span className="ml-auto text-xs text-muted-foreground">⌘I</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("quick-test")}>
            <Zap className="mr-2 h-4 w-4" />
            <span>Quick Test</span>
            <span className="ml-auto text-xs text-muted-foreground">⌘T</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => handleSelect("dashboard")}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("projects")}>
            <FolderKanban className="mr-2 h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("team")}>
            <Users className="mr-2 h-4 w-4" />
            <span>Team Members</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("analytics")}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("reports")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Reports</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="System">
          <CommandItem onSelect={() => handleSelect("notifications")}>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
          <CommandItem onSelect={() => { setOpen(false); onLogout?.(); }}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
