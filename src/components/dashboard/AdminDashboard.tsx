
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  FileUp, 
  Users, 
  FolderPlus, 
  BarChart4, 
  Layers,
  ChevronRight,
  PlusCircle,
  FileText,
  Settings,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "sonner";

// Mock data for the dashboard
const mockProjects = [
  { id: 1, name: "Downtown Office Tower", status: "In Progress", units: 42, completion: "65%" },
  { id: 2, name: "Westside Medical Center", status: "Pending", units: 86, completion: "0%" },
  { id: 3, name: "North Campus Expansion", status: "Completed", units: 38, completion: "100%" },
  { id: 4, name: "City Center Hotel", status: "In Progress", units: 124, completion: "28%" },
];

const mockTeamMembers = [
  { id: 1, name: "Sarah Johnson", role: "Engineer", assignedProjects: 3 },
  { id: 2, name: "Michael Chen", role: "Technician", assignedProjects: 2 },
  { id: 3, name: "Robert Davis", role: "Engineer", assignedProjects: 1 },
  { id: 4, name: "Emily Rodriguez", role: "Technician", assignedProjects: 4 },
];

type AdminDashboardProps = {
  user: any;
};

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showProjectForm, setShowProjectForm] = useState(false);

  const handleCreateProject = () => {
    setShowProjectForm(true);
  };

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Project created successfully", {
      description: "New project has been added to your dashboard"
    });
    setShowProjectForm(false);
  };

  const handleCardAction = (action: string) => {
    switch(action) {
      case "projects":
        setActiveTab("projects");
        toast.info("Viewing all projects");
        break;
      case "team":
        setActiveTab("team");
        toast.info("Viewing team members");
        break;
      case "units":
        toast.info("Unit management", { 
          description: "View all tracked units across projects" 
        });
        break;
      case "completion":
        toast.info("Performance overview", { 
          description: "View detailed completion metrics" 
        });
        break;
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:border-tab-blue hover:shadow-md transition-all cursor-pointer" 
              onClick={() => handleCardAction("projects")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Layers className="h-4 w-4 text-tab-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-tab-blue flex justify-end items-center">
            <span>Manage Projects</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </CardFooter>
        </Card>
        <Card className="hover:border-tab-blue hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleCardAction("team")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-tab-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">8 active assignments</p>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-tab-blue flex justify-end items-center">
            <span>View Team</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </CardFooter>
        </Card>
        <Card className="hover:border-tab-blue hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleCardAction("units")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Units Tracked</CardTitle>
            <Layers className="h-4 w-4 text-tab-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">290</div>
            <p className="text-xs text-muted-foreground">148 tested, 142 pending</p>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-tab-blue flex justify-end items-center">
            <span>View All Units</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </CardFooter>
        </Card>
        <Card className="hover:border-tab-blue hover:shadow-md transition-all cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50"
              onClick={() => handleCardAction("completion")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <BarChart4 className="h-4 w-4 text-tab-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48.3%</div>
            <p className="text-xs text-muted-foreground">+5.2% from last week</p>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-tab-blue flex justify-end items-center">
            <span>View Analytics</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </CardFooter>
        </Card>
      </div>

      {showProjectForm ? (
        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle>Create New Project</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setShowProjectForm(false)}>Cancel</Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmitProject}>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Project Name</label>
                  <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter project name" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Client</label>
                  <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter client name" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Start Date</label>
                    <input type="date" className="w-full p-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Expected Completion</label>
                    <input type="date" className="w-full p-2 border rounded-md" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Project Description</label>
                  <textarea className="w-full p-2 border rounded-md" rows={3} placeholder="Brief project description"></textarea>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Assign Team Members</label>
                  <select className="w-full p-2 border rounded-md" multiple>
                    {mockTeamMembers.map(member => (
                      <option key={member.id} value={member.id}>{member.name} ({member.role})</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple members</p>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowProjectForm(false)}>Cancel</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Create Project</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>
                    Overview of your active and recent projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Completion</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockProjects.slice(0, 3).map((project) => (
                        <TableRow key={project.id} className="hover:bg-gray-50 cursor-pointer" 
                                  onClick={() => toast.info(`Project details: ${project.name}`, 
                                  { description: `Status: ${project.status}, Units: ${project.units}` })}>
                          <TableCell className="font-medium">{project.name}</TableCell>
                          <TableCell>
                            <span 
                              className={`inline-block px-2 py-1 text-xs rounded-full ${
                                project.status === "Completed" 
                                  ? "bg-green-100 text-green-800" 
                                  : project.status === "In Progress" 
                                  ? "bg-blue-100 text-blue-800" 
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {project.status}
                            </span>
                          </TableCell>
                          <TableCell>{project.completion}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => setActiveTab("projects")}>
                    View All Projects
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common administrative tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="w-full justify-start h-auto p-4 flex flex-col items-start text-left bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 text-blue-700"
                    onClick={handleCreateProject}>
                    <FolderPlus className="mb-2 h-5 w-5" />
                    <div>
                      <div className="font-medium text-sm">Create Project</div>
                      <div className="text-xs text-blue-600 mt-1">Set up a new TAB project</div>
                    </div>
                  </Button>
                  
                  <Button className="w-full justify-start h-auto p-4 flex flex-col items-start text-left bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 text-green-700"
                    onClick={() => toast.success("Import dialog opened", { description: "Upload your units spreadsheet to begin" })}>
                    <FileUp className="mb-2 h-5 w-5" />
                    <div>
                      <div className="font-medium text-sm">Import Units</div>
                      <div className="text-xs text-green-600 mt-1">Bulk add from spreadsheet</div>
                    </div>
                  </Button>
                  
                  <Button className="w-full justify-start h-auto p-4 flex flex-col items-start text-left bg-gradient-to-br from-purple-50 to-fuchsia-50 hover:from-purple-100 hover:to-fuchsia-100 border border-purple-200 text-purple-700"
                    onClick={() => setActiveTab("team")}>
                    <Users className="mb-2 h-5 w-5" />
                    <div>
                      <div className="font-medium text-sm">Manage Team</div>
                      <div className="text-xs text-purple-600 mt-1">Add or edit team members</div>
                    </div>
                  </Button>
                  
                  <Button className="w-full justify-start h-auto p-4 flex flex-col items-start text-left bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200 text-amber-700"
                    onClick={() => toast.info("Reports generator opened", { description: "Create custom project reports" })}>
                    <BarChart4 className="mb-2 h-5 w-5" />
                    <div>
                      <div className="font-medium text-sm">Reports</div>
                      <div className="text-xs text-amber-600 mt-1">Generate project analytics</div>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>System Notifications</CardTitle>
                  <CardDescription>Recent alerts and updates</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Mark All as Read
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">License Renewal</h4>
                      <p className="text-xs text-yellow-700 mt-1">Your TAB system license will expire in 15 days. Please renew to avoid service interruption.</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                          Renew Now
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Report Ready</h4>
                      <p className="text-xs text-blue-700 mt-1">Monthly progress report for "Downtown Office Tower" has been generated.</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                          View Report
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Projects</CardTitle>
                  <CardDescription>
                    Manage your TAB projects
                  </CardDescription>
                </div>
                <Button onClick={handleCreateProject}>
                  <FolderPlus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Units</TableHead>
                      <TableHead>Completion</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProjects.map((project) => (
                      <TableRow key={project.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>
                          <span 
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              project.status === "Completed" 
                                ? "bg-green-100 text-green-800" 
                                : project.status === "In Progress" 
                                ? "bg-blue-100 text-blue-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {project.status}
                          </span>
                        </TableCell>
                        <TableCell>{project.units}</TableCell>
                        <TableCell>{project.completion}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="h-8 px-2 text-xs"
                                    onClick={() => toast.info(`View ${project.name}`, { description: "Opening project details" })}>
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 px-2 text-xs"
                                    onClick={() => toast.info(`Edit ${project.name}`, { description: "Opening project editor" })}>
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage your team and assignments
                  </CardDescription>
                </div>
                <Button onClick={() => toast.success("Add member dialog opened", { description: "Create a new team member account" })}>
                  <Users className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Assigned Projects</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTeamMembers.map((member) => (
                      <TableRow key={member.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>
                          <span 
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              member.role === "Engineer" 
                                ? "bg-purple-100 text-purple-800" 
                                : "bg-teal-100 text-teal-800"
                            }`}
                          >
                            {member.role}
                          </span>
                        </TableCell>
                        <TableCell>{member.assignedProjects}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="h-8 px-2 text-xs"
                                    onClick={() => toast.info(`${member.name}'s profile`, { description: "View team member details" })}>
                              Profile
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 px-2 text-xs"
                                    onClick={() => toast.info(`Assign ${member.name}`, { description: "Manage project assignments" })}>
                              Assign
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default AdminDashboard;
