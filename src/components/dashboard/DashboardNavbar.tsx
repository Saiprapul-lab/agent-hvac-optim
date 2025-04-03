
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutDashboard, FileText, Users, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardNavbarProps {
  user: {
    name: string;
    role: string;
  };
  onLogout: () => void;
}

const DashboardNavbar = ({ user, onLogout }: DashboardNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-tab-blue font-bold text-2xl">
              TAB<span className="text-tab-green">System</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <span className="text-gray-600">
              Logged in as: <span className="font-medium">{user.name}</span> ({user.role})
            </span>
            <Button onClick={onLogout} variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-700">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-5 space-y-4">
            <div className="py-2 px-3 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-600">Logged in as:</p>
              <p className="font-medium">{user.name} ({user.role})</p>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <Button 
                onClick={onLogout} 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
