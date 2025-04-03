
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Data Collection & Integration",
    description: "Connect your building systems and IoT sensors to our platform, which begins collecting and analyzing HVAC performance data.",
    highlights: [
      "Seamless BMS integration",
      "IoT sensor compatibility",
      "Automated data processing"
    ]
  },
  {
    number: "02",
    title: "AI-Powered Analysis",
    description: "Our intelligent agents analyze system performance, identify optimization opportunities, and develop predictive maintenance schedules.",
    highlights: [
      "Real-time performance analysis",
      "Pattern recognition",
      "Predictive modeling"
    ]
  },
  {
    number: "03",
    title: "Automated Optimization",
    description: "The system executes optimizations automatically or presents recommendations for approval, continuously improving building performance.",
    highlights: [
      "Automated adjustments",
      "Energy efficiency optimization",
      "Comfort parameter balancing"
    ]
  },
  {
    number: "04",
    title: "Continuous Learning & Improvement",
    description: "As more data is collected, our AI agents become increasingly effective at optimizing your specific building systems and requirements.",
    highlights: [
      "System-specific learning",
      "Ongoing algorithm refinement",
      "Performance trend analysis"
    ]
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-tab-blue mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A seamless process that transforms your building's HVAC operations from manual to intelligently automated.
          </p>
        </div>
        
        <div className="space-y-12 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex flex-col items-center md:items-start">
                <div className="bg-tab-blue/10 text-tab-blue font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  {step.number}
                </div>
                <div className={`hidden md:block h-full w-0.5 bg-tab-blue/10 ${index === steps.length - 1 ? 'hidden' : 'ml-6 mt-2'}`} />
              </div>
              <div className="md:w-3/4">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {step.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-tab-green mr-2" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
