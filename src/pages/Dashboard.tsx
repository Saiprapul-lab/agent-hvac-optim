
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import EngineerDashboard from "@/components/dashboard/EngineerDashboard";
import TechnicianDashboard from "@/components/dashboard/TechnicianDashboard";
import { toast } from "sonner";

// Mock authentication - In a real app, you would use a proper auth system
const mockAuthCheck = () => {
  const user = localStorage.getItem("tabSystemUser");
  return user ? JSON.parse(user) : null;
};

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = mockAuthCheck();
    setUser(loggedInUser);
    setLoading(false);
    
    if (loggedInUser) {
      toast.success(`Welcome back, ${loggedInUser.name}!`, {
        description: `You've logged in as a ${loggedInUser.role}.`,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tabSystemUser");
    toast.info("Successfully logged out");
    navigate("/login");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background dark">
      <DashboardNavbar user={user} onLogout={handleLogout} />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.name}</h1>
            <p className="text-gray-600">{user.role} Dashboard</p>
          </div>
          
          {user.role === "Admin" && <AdminDashboard user={user} />}
          {user.role === "Engineer" && <EngineerDashboard user={user} />}
          {user.role === "Technician" && <TechnicianDashboard user={user} />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
