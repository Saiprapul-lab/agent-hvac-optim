
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Clipboard, 
  CheckCircle, 
  Camera, 
  Upload, 
  Clock,
  ListChecks
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
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Units</CardTitle>
            <Clipboard className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">7 due this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">3 pending review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <ListChecks className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Across 2 locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadline</CardTitle>
            <Clock className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Apr 5</div>
            <p className="text-xs text-muted-foreground">FCU-18, City Center Hotel</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assigned" className="w-full">
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
                    <TableRow key={unit.id}>
                      <TableCell className="font-medium">{unit.unitName}</TableCell>
                      <TableCell>{unit.project}</TableCell>
                      <TableCell>{unit.type}</TableCell>
                      <TableCell>{unit.dueDate}</TableCell>
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
                          <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
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
                    <TableRow key={test.id}>
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
                        <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
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
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <Camera className="mr-2 h-4 w-4" />
                Upload Equipment Photos
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Submit Completed Test
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechnicianDashboard;
