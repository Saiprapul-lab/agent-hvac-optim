
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  FileCheck, 
  RefreshCw, 
  FileX, 
  BarChart4, 
  Search
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
const mockPendingTests = [
  { id: 1, unitName: "AHU-01", project: "Downtown Office Tower", submittedBy: "Michael Chen", submittedOn: "2023-04-01" },
  { id: 2, unitName: "VAV-15", project: "Downtown Office Tower", submittedBy: "Emily Rodriguez", submittedOn: "2023-04-02" },
  { id: 3, unitName: "RTU-03", project: "Westside Medical Center", submittedBy: "Michael Chen", submittedOn: "2023-04-01" },
  { id: 4, unitName: "FCU-22", project: "City Center Hotel", submittedBy: "Emily Rodriguez", submittedOn: "2023-04-03" },
];

const mockCertifiedTests = [
  { id: 1, unitName: "AHU-02", project: "Downtown Office Tower", certifiedDate: "2023-03-28", status: "Passed" },
  { id: 2, unitName: "VAV-16", project: "Downtown Office Tower", certifiedDate: "2023-03-29", status: "Passed" },
  { id: 3, unitName: "FCU-05", project: "North Campus Expansion", certifiedDate: "2023-03-25", status: "Failed" },
  { id: 4, unitName: "RTU-01", project: "North Campus Expansion", certifiedDate: "2023-03-27", status: "Passed" },
];

type EngineerDashboardProps = {
  user: any;
};

const EngineerDashboard = ({ user }: EngineerDashboardProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <RefreshCw className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 high priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certified This Week</CardTitle>
            <FileCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+8 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Issues</CardTitle>
            <FileX className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">3 awaiting retest</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <BarChart4 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 nearing completion</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="certified">Certified Tests</TabsTrigger>
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tests Awaiting Review</CardTitle>
                <CardDescription>
                  Verify and certify test results
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPendingTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.unitName}</TableCell>
                      <TableCell>{test.project}</TableCell>
                      <TableCell>{test.submittedBy}</TableCell>
                      <TableCell>{test.submittedOn}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
                            Review
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
        <TabsContent value="certified" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Certified Tests</CardTitle>
              <CardDescription>
                Previously reviewed and certified tests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Certified Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCertifiedTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.unitName}</TableCell>
                      <TableCell>{test.project}</TableCell>
                      <TableCell>{test.certifiedDate}</TableCell>
                      <TableCell>
                        <span 
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            test.status === "Passed" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {test.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
                          View Report
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                System performance metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart4 className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p>Performance analytics charts would appear here</p>
                <Button className="mt-4" variant="outline">Generate Analysis</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EngineerDashboard;
