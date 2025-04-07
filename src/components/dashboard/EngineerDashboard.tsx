
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  FileCheck, 
  RefreshCw, 
  FileX, 
  BarChart4, 
  Search,
  Filter,
  ChevronRight,
  CheckCircle,
  XCircle,
  Flag,
  AlertTriangle,
  Clock
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
import { toast } from "sonner";

// Mock data for the dashboard
const mockPendingTests = [
  { id: 1, unitName: "AHU-01", project: "Downtown Office Tower", submittedBy: "Michael Chen", submittedOn: "2023-04-01", priority: "High" },
  { id: 2, unitName: "VAV-15", project: "Downtown Office Tower", submittedBy: "Emily Rodriguez", submittedOn: "2023-04-02", priority: "Medium" },
  { id: 3, unitName: "RTU-03", project: "Westside Medical Center", submittedBy: "Michael Chen", submittedOn: "2023-04-01", priority: "Low" },
  { id: 4, unitName: "FCU-22", project: "City Center Hotel", submittedBy: "Emily Rodriguez", submittedOn: "2023-04-03", priority: "High" },
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
  const [activeTab, setActiveTab] = useState("pending");
  const [certificationNotes, setCertificationNotes] = useState("");
  
  const handleReviewTest = (test: any) => {
    setSelectedTest(test);
    toast.info(`Reviewing ${test.unitName}`, {
      description: `Submitted by ${test.submittedBy} on ${test.submittedOn}`
    });
  };
  
  const handleBackToList = () => {
    setSelectedTest(null);
  };

  const handleCardAction = (action: string) => {
    switch(action) {
      case "pending":
        setActiveTab("pending");
        toast.info("Viewing pending review tests");
        break;
      case "certified":
        setActiveTab("certified");
        toast.info("Viewing certified tests");
        break;
      case "issues":
        toast.info("Flagged issues", { description: "Viewing tests with identified problems" });
        break;
      case "projects":
        toast.info("Active projects", { description: "Viewing project performance metrics" });
        break;
    }
  };

  const handleCertifyTest = () => {
    if (certificationNotes.trim() === "") {
      toast.warning("Please add certification notes");
      return;
    }
    
    toast.success(`Test for ${selectedTest.unitName} certified`, {
      description: "Results have been approved and recorded"
    });
    setSelectedTest(null);
    setCertificationNotes("");
  };

  const handleRequestRetest = () => {
    toast.warning(`Retest requested for ${selectedTest.unitName}`, {
      description: "Technician has been notified"
    });
    setSelectedTest(null);
    setCertificationNotes("");
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:border-purple-400 hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleCardAction("pending")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <RefreshCw className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 high priority</p>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-purple-600 flex justify-end items-center">
            <span>View All</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </CardFooter>
        </Card>
        <Card className="hover:border-purple-400 hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleCardAction("certified")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certified This Week</CardTitle>
            <FileCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+8 from last week</p>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-purple-600 flex justify-end items-center">
            <span>View All</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </CardFooter>
        </Card>
        <Card className="hover:border-purple-400 hover:shadow-md transition-all cursor-pointer bg-gradient-to-br from-red-50 to-pink-50 border-red-200"
              onClick={() => handleCardAction("issues")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Issues</CardTitle>
            <FileX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">3 awaiting retest</p>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-red-600 flex justify-end items-center">
            <span>View Issues</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </CardFooter>
        </Card>
        <Card className="hover:border-purple-400 hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleCardAction("projects")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <BarChart4 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 nearing completion</p>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-purple-600 flex justify-end items-center">
            <span>View Projects</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </CardFooter>
        </Card>
      </div>

      {selectedTest ? (
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between bg-gray-50 border-b">
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
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-md font-medium mb-3 text-gray-700">Test Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium text-gray-500">Submitted By:</div>
                  <div>{selectedTest.submittedBy}</div>
                  <div className="font-medium text-gray-500">Date:</div>
                  <div>{selectedTest.submittedOn}</div>
                  <div className="font-medium text-gray-500">Unit Type:</div>
                  <div>Air Handling Unit</div>
                  <div className="font-medium text-gray-500">Location:</div>
                  <div>Level 3, Mechanical Room</div>
                  <div className="font-medium text-gray-500">Priority:</div>
                  <div>
                    <span 
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        selectedTest.priority === "High" 
                          ? "bg-red-100 text-red-800" 
                          : selectedTest.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {selectedTest.priority}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-md font-medium mb-3 text-gray-700">Test Measurements</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium text-gray-500">Air Flow:</div>
                  <div>2,500 CFM <span className="ml-2 text-green-600 text-xs">(+4% from design)</span></div>
                  <div className="font-medium text-gray-500">Static Pressure:</div>
                  <div>1.5" WC <span className="ml-2 text-green-600 text-xs">(100% of design)</span></div>
                  <div className="font-medium text-gray-500">Supply Temp:</div>
                  <div>55°F <span className="ml-2 text-green-600 text-xs">(within range)</span></div>
                  <div className="font-medium text-gray-500">Return Temp:</div>
                  <div>75°F <span className="ml-2 text-green-600 text-xs">(within range)</span></div>
                  <div className="font-medium text-gray-500">Fan Speed:</div>
                  <div>1,150 RPM <span className="ml-2 text-green-600 text-xs">(95% of max)</span></div>
                  <div className="font-medium text-gray-500">Noise Level:</div>
                  <div>45 dBA <span className="ml-2 text-amber-600 text-xs">(above spec)</span></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-md font-medium text-gray-700">Technician Notes</h3>
              <div className="border rounded-lg p-4 bg-gray-50 text-sm">
                <p>AHU-01 is operating within most specifications. The noise level is slightly above the specified range but acceptable for the mechanical room location. All dampers are functioning properly and the unit achieves the required airflow. Temperature differential is within expected parameters.</p>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="border bg-white rounded p-1">
                    <div className="text-xs text-gray-500 mb-1">Equipment Photo</div>
                    <div className="bg-gray-200 h-16 flex items-center justify-center text-xs text-gray-500">
                      Photo 1
                    </div>
                  </div>
                  <div className="border bg-white rounded p-1">
                    <div className="text-xs text-gray-500 mb-1">Control Panel</div>
                    <div className="bg-gray-200 h-16 flex items-center justify-center text-xs text-gray-500">
                      Photo 2
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-md font-medium text-gray-700">Engineer Certification</h3>
              <Textarea 
                placeholder="Add your certification notes here..." 
                className="w-full" 
                rows={4} 
                value={certificationNotes}
                onChange={(e) => setCertificationNotes(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3 justify-end">
              <Button 
                variant="outline" 
                className="border-red-500 text-red-500 hover:bg-red-50"
                onClick={handleRequestRetest}
              >
                <XCircle className="mr-1 h-4 w-4" />
                Request Retest
              </Button>
              <Button 
                variant="outline" 
                className="border-orange-500 text-orange-500 hover:bg-orange-50"
                onClick={() => toast.warning("Issue flagged for further review", { description: "Added to pending issues queue" })}
              >
                <Flag className="mr-1 h-4 w-4" />
                Flag for Review
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleCertifyTest}
              >
                <CheckCircle className="mr-1 h-4 w-4" />
                Certify Results
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                      <TableHead>Priority</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPendingTests.map((test) => (
                      <TableRow key={test.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{test.unitName}</TableCell>
                        {!isMobile && <TableCell>{test.project}</TableCell>}
                        <TableCell>{test.submittedBy}</TableCell>
                        {!isMobile && <TableCell>{test.submittedOn}</TableCell>}
                        <TableCell>
                          <span 
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              test.priority === "High" 
                                ? "bg-red-100 text-red-800" 
                                : test.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {test.priority}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 px-2 text-xs hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
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
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing 4 of 12 pending tests
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Urgent Reviews</CardTitle>
                <CardDescription>
                  Tests requiring immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50 border-red-200">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <h3 className="text-sm font-medium">FCU-22, City Center Hotel</h3>
                        <p className="text-xs text-gray-500">Submitted by Emily Rodriguez, requires urgent review</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700"
                            onClick={() => handleReviewTest(mockPendingTests[3])}>
                      Review Now
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-amber-50 border-amber-200">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-amber-600" />
                      <div>
                        <h3 className="text-sm font-medium">AHU-01, Downtown Office Tower</h3>
                        <p className="text-xs text-gray-500">Waiting 6 days for review, requires attention</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100"
                            onClick={() => handleReviewTest(mockPendingTests[0])}>
                      Review
                    </Button>
                  </div>
                </div>
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
                      <TableRow key={test.id} className="hover:bg-gray-50">
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
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 px-2 text-xs"
                            onClick={() => toast.info(`Viewing report for ${test.unitName}`, { description: `Certified on ${test.certifiedDate}` })}
                          >
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
                  <Button 
                    className="mt-4" 
                    variant="outline"
                    onClick={() => toast.info("Generating analysis", { description: "Preparing performance metrics report" })}
                  >
                    Generate Analysis
                  </Button>
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
