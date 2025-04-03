
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-tab-blue font-bold text-2xl">
              TAB<span className="text-tab-green">System</span>
            </div>
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
            <Button 
              className="bg-tab-blue hover:bg-tab-blue/90 text-white"
              variant="default"
            >
              Request Demo
            </Button>
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
            <Button 
              className="w-full bg-tab-blue hover:bg-tab-blue/90 text-white"
              variant="default"
            >
              Request Demo
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
