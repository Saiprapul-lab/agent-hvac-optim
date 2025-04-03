
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-tab-blue font-bold text-2xl">
              TAB<span className="text-tab-green">System</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-tab-blue transition-colors">
              Features
            </a>
            <a href="#agents" className="text-gray-600 hover:text-tab-blue transition-colors">
              Intelligent Agents
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-tab-blue transition-colors">
              How It Works
            </a>
            <Link to="/login">
              <Button 
                variant="outline" 
                className="border-tab-blue text-tab-blue hover:bg-tab-blue/10"
              >
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button 
                className="bg-tab-blue hover:bg-tab-blue/90 text-white"
                variant="default"
              >
                Sign Up
              </Button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-5 space-y-4">
            <a 
              href="#features" 
              className="block text-gray-600 hover:text-tab-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#agents" 
              className="block text-gray-600 hover:text-tab-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Intelligent Agents
            </a>
            <a 
              href="#how-it-works" 
              className="block text-gray-600 hover:text-tab-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button 
                variant="outline" 
                className="w-full border-tab-blue text-tab-blue hover:bg-tab-blue/10 mb-2"
              >
                Log In
              </Button>
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
              <Button 
                className="w-full bg-tab-blue hover:bg-tab-blue/90 text-white"
                variant="default"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
