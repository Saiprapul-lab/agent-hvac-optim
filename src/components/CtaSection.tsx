
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-tab-blue to-tab-blue-light text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Building's Performance?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join forward-thinking facility managers who are leveraging AI to reduce energy costs, improve occupant comfort, and streamline HVAC management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-white hover:bg-gray-100 text-tab-blue text-lg px-8 py-6 h-auto"
              size="lg"
            >
              Request Demo
            </Button>
            <Button 
              className="bg-transparent hover:bg-white/10 border border-white text-white text-lg px-8 py-6 h-auto"
              variant="outline"
              size="lg"
            >
              Contact Sales <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
