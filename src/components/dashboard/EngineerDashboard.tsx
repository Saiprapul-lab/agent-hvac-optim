
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  FileCheck, 
  RefreshCw, 
  FileX, 
  BarChart4, 
  Search,
  Filter
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
import { useIsMobile } from "@/hooks/use-mobile";
import { Textarea } from "@/components/ui/textarea";

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
  const isMobile = useIsMobile();
  const [selectedTest, setSelectedTest] = useState<any>(null);
  
  const handleReviewTest = (test: any) => {
    setSelectedTest(test);
  };
  
  const handleBackToList = () => {
    setSelectedTest(null);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {selectedTest ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Test Review: {selectedTest.unitName}</CardTitle>
              <CardDescription>
                Project: {selectedTest.project}
              </CardDescription>
            </div>
            <Button variant="outline" onClick={handleBackToList}>
              Back to List
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium mb-2">Test Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Submitted By:</div>
                  <div>{selectedTest.submittedBy}</div>
                  <div className="font-medium">Date:</div>
                  <div>{selectedTest.submittedOn}</div>
                  <div className="font-medium">Unit Type:</div>
                  <div>Air Handling Unit</div>
                  <div className="font-medium">Location:</div>
                  <div>Level 3, Mechanical Room</div>
                </div>
              </div>
              <div>
                <h3 className="text-md font-medium mb-2">Test Measurements</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Air Flow:</div>
                  <div>2,500 CFM</div>
                  <div className="font-medium">Static Pressure:</div>
                  <div>1.5" WC</div>
                  <div className="font-medium">Supply Temp:</div>
                  <div>55°F</div>
                  <div className="font-medium">Return Temp:</div>
                  <div>75°F</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-2">Engineer Notes</h3>
              <Textarea placeholder="Add your certification notes here..." className="w-full" rows={4} />
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 justify-end">
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                Request Retest
              </Button>
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                Flag for Review
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Certify Results
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="w-full sm:w-auto mb-2">
            <TabsTrigger value="pending" className="flex-1 sm:flex-none">Pending Review</TabsTrigger>
            <TabsTrigger value="certified" className="flex-1 sm:flex-none">Certified Tests</TabsTrigger>
            <TabsTrigger value="performance" className="flex-1 sm:flex-none">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Tests Awaiting Review</CardTitle>
                  <CardDescription>
                    Verify and certify test results
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <Button variant="outline" size={isMobile ? "sm" : "default"}>
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size={isMobile ? "sm" : "default"}>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unit</TableHead>
                      {!isMobile && <TableHead>Project</TableHead>}
                      <TableHead>Submitted By</TableHead>
                      {!isMobile && <TableHead>Date</TableHead>}
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPendingTests.map((test) => (
                      <TableRow key={test.id}>
                        <TableCell className="font-medium">{test.unitName}</TableCell>
                        {!isMobile && <TableCell>{test.project}</TableCell>}
                        <TableCell>{test.submittedBy}</TableCell>
                        {!isMobile && <TableCell>{test.submittedOn}</TableCell>}
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 px-2 text-xs"
                            onClick={() => handleReviewTest(test)}
                          >
                            Review
                          </Button>
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
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unit</TableHead>
                      {!isMobile && <TableHead>Project</TableHead>}
                      {!isMobile && <TableHead>Certified Date</TableHead>}
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCertifiedTests.map((test) => (
                      <TableRow key={test.id}>
                        <TableCell className="font-medium">{test.unitName}</TableCell>
                        {!isMobile && <TableCell>{test.project}</TableCell>}
                        {!isMobile && <TableCell>{test.certifiedDate}</TableCell>}
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
      )}
    </div>
  );
};

export default EngineerDashboard;
