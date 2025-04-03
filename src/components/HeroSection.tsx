
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-tab-blue/5 to-tab-teal/5 -z-10" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-tab-blue/5 rounded-full blur-3xl animate-pulse-slow -z-10" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-tab-teal/5 rounded-full blur-3xl animate-pulse-slow -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-tab-blue tracking-tight mb-6">
            Revolutionizing HVAC Management with{" "}
            <span className="text-tab-green">AI-Native Intelligence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The TAB System transforms HVAC testing, adjusting, and balancing with intelligent agents that automate workflows, optimize performance, and predict maintenance needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-tab-blue hover:bg-tab-blue/90 text-white text-lg px-8 py-6 h-auto"
              size="lg"
            >
              Request Demo
            </Button>
            <Button 
              className="bg-white border border-tab-blue/20 hover:bg-gray-50 text-tab-blue text-lg px-8 py-6 h-auto"
              variant="outline"
              size="lg"
            >
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
