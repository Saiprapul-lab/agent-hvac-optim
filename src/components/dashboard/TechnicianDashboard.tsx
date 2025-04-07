
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Clipboard, 
  CheckCircle, 
  Camera, 
  Upload, 
  Clock,
  ListChecks,
  ChevronRight,
  PlusCircle,
  AlertCircle,
  Calendar
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
const mockAssignedUnits = [
  { id: 1, unitName: "AHU-03", project: "Downtown Office Tower", type: "Air Handling Unit", dueDate: "2023-04-08", status: "Not Started" },
  { id: 2, unitName: "VAV-22", project: "Downtown Office Tower", type: "Variable Air Volume", dueDate: "2023-04-07", status: "In Progress" },
  { id: 3, unitName: "RTU-04", project: "Westside Medical Center", type: "Rooftop Unit", dueDate: "2023-04-12", status: "Not Started" },
  { id: 4, unitName: "FCU-18", project: "City Center Hotel", type: "Fan Coil Unit", dueDate: "2023-04-05", status: "In Progress" },
];

const mockCompletedTests = [
  { id: 1, unitName: "AHU-01", project: "Downtown Office Tower", completedDate: "2023-04-01", status: "Submitted" },
  { id: 2, unitName: "VAV-15", project: "Downtown Office Tower", completedDate: "2023-04-02", status: "Rejected" },
  { id: 3, unitName: "FCU-10", project: "City Center Hotel", completedDate: "2023-03-29", status: "Approved" },
];

type TechnicianDashboardProps = {
  user: any;
};

const TechnicianDashboard = ({ user }: TechnicianDashboardProps) => {
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("assigned");

  const handleStartTest = (unit: any) => {
    toast.success(`Starting test for ${unit.unitName}`, {
      description: `Preparing test forms for ${unit.type} in ${unit.project}`,
    });
    setSelectedUnit(unit);
  };

  const handleViewDetails = (test: any) => {
    toast.info(`Viewing details for ${test.unitName}`, {
      description: `Completed on ${test.completedDate}`,
    });
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "photos":
        toast.success("Camera access requested", {
          description: "Upload equipment photos to document your work."
        });
        break;
      case "submit":
        toast.success("Test submission form opened", {
          description: "Submit your completed test for engineer review."
        });
        break;
      case "schedule":
        toast.success("Schedule opened", {
          description: "View and manage your upcoming testing assignments."
        });
        break;
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:border-teal-500 hover:shadow-md transition-all cursor-pointer" 
              onClick={() => setActiveTab("assigned")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Units</CardTitle>
            <Clipboard className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">7 due this week</p>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-teal-600 flex justify-end items-center">
            <span>View All</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </CardFooter>
        </Card>
        <Card className="hover:border-teal-500 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setActiveTab("completed")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">3 pending review</p>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-teal-600 flex justify-end items-center">
            <span>View All</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </CardFooter>
        </Card>
        <Card className="hover:border-teal-500 hover:shadow-md transition-all cursor-pointer"
              onClick={() => toast.info("Project overview", { description: "View comprehensive details about your active projects."})}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <ListChecks className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Across 2 locations</p>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-teal-600 flex justify-end items-center">
            <span>View Projects</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </CardFooter>
        </Card>
        <Card className="hover:border-teal-500 hover:shadow-md transition-all cursor-pointer bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
              onClick={() => toast.warning("Urgent deadline approaching", { description: "FCU-18 test is due tomorrow."})}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadline</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Apr 5</div>
            <p className="text-xs text-muted-foreground">FCU-18, City Center Hotel</p>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-amber-600 flex justify-end items-center">
            <span>Start Test Now</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </CardFooter>
        </Card>
      </div>

      {selectedUnit ? (
        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>Testing: {selectedUnit.unitName}</CardTitle>
                <CardDescription>{selectedUnit.project} - {selectedUnit.type}</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setSelectedUnit(null)}>
                Back to List
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-sm mb-2 text-gray-600">UNIT DETAILS</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-gray-500">Unit ID:</span>
                      <span>{selectedUnit.unitName}</span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-gray-500">Type:</span>
                      <span>{selectedUnit.type}</span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-gray-500">Due Date:</span>
                      <span className="text-amber-600 font-medium">{selectedUnit.dueDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-sm mb-2 text-gray-600">TEST CHECKLIST</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="check1" className="rounded text-teal-600" />
                      <label htmlFor="check1" className="text-sm">Verify equipment model</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="check2" className="rounded text-teal-600" />
                      <label htmlFor="check2" className="text-sm">Record nameplate data</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="check3" className="rounded text-teal-600" />
                      <label htmlFor="check3" className="text-sm">Measure airflow (CFM)</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="check4" className="rounded text-teal-600" />
                      <label htmlFor="check4" className="text-sm">Check static pressure</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-3 text-gray-600">MEASUREMENT DATA</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Supply Air CFM</label>
                    <input type="text" className="w-full mt-1 border rounded px-2 py-1" placeholder="Enter value" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Return Air CFM</label>
                    <input type="text" className="w-full mt-1 border rounded px-2 py-1" placeholder="Enter value" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Static Pressure (in wc)</label>
                    <input type="text" className="w-full mt-1 border rounded px-2 py-1" placeholder="Enter value" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Fan Speed (RPM)</label>
                    <input type="text" className="w-full mt-1 border rounded px-2 py-1" placeholder="Enter value" />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Upload className="mr-1 h-4 w-4" />
                  Submit Test
                </Button>
                <Button variant="outline">
                  <Camera className="mr-1 h-4 w-4" />
                  Add Photos
                </Button>
                <Button variant="outline" className="text-amber-600 border-amber-300 hover:bg-amber-50">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  Report Issue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="assigned">Assigned Units</TabsTrigger>
            <TabsTrigger value="completed">Completed Tests</TabsTrigger>
          </TabsList>
          <TabsContent value="assigned" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Assigned Units</CardTitle>
                <CardDescription>
                  Units requiring testing and balancing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unit</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAssignedUnits.map((unit) => (
                      <TableRow key={unit.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{unit.unitName}</TableCell>
                        <TableCell>{unit.project}</TableCell>
                        <TableCell>{unit.type}</TableCell>
                        <TableCell className={unit.dueDate === "2023-04-05" ? "text-amber-600 font-medium" : ""}>
                          {unit.dueDate}
                        </TableCell>
                        <TableCell>
                          <span 
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              unit.status === "Not Started" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {unit.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 px-2 text-xs hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                              onClick={() => handleStartTest(unit)}
                            >
                              Start Test
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
          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Tests</CardTitle>
                <CardDescription>
                  Tests you have submitted
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unit</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Completed Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCompletedTests.map((test) => (
                      <TableRow key={test.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{test.unitName}</TableCell>
                        <TableCell>{test.project}</TableCell>
                        <TableCell>{test.completedDate}</TableCell>
                        <TableCell>
                          <span 
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              test.status === "Approved" 
                                ? "bg-green-100 text-green-800" 
                                : test.status === "Rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {test.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 px-2 text-xs"
                            onClick={() => handleViewDetails(test)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common test-related tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="w-full justify-start h-auto p-4 flex flex-col items-start bg-gradient-to-br from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 border border-teal-200 text-teal-700"
                  onClick={() => handleQuickAction("photos")}>
                  <Camera className="mb-2 h-6 w-6" />
                  <div className="text-left">
                    <div className="font-medium text-sm">Upload Photos</div>
                    <div className="text-xs text-teal-600 mt-1">Document your equipment</div>
                  </div>
                </Button>
                <Button className="w-full justify-start h-auto p-4 flex flex-col items-start bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 text-blue-700"
                  onClick={() => handleQuickAction("submit")}>
                  <Upload className="mb-2 h-6 w-6" />
                  <div className="text-left">
                    <div className="font-medium text-sm">Submit Test</div>
                    <div className="text-xs text-blue-600 mt-1">Complete your work</div>
                  </div>
                </Button>
                <Button className="w-full justify-start h-auto p-4 flex flex-col items-start bg-gradient-to-br from-purple-50 to-fuchsia-50 hover:from-purple-100 hover:to-fuchsia-100 border border-purple-200 text-purple-700"
                  onClick={() => handleQuickAction("schedule")}>
                  <Calendar className="mb-2 h-6 w-6" />
                  <div className="text-left">
                    <div className="font-medium text-sm">View Schedule</div>
                    <div className="text-xs text-purple-600 mt-1">Plan your week</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default TechnicianDashboard;
