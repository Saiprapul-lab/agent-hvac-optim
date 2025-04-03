
import { Card, CardContent } from "@/components/ui/card";
import { 
  ActivitySquare, 
  Cpu, 
  Gauge, 
  LineChart, 
  Plug, 
  RefreshCw 
} from "lucide-react";

const features = [
  {
    icon: <ActivitySquare className="h-10 w-10 text-tab-blue" />,
    title: "Event-Driven Automation",
    description: "Real-time responsiveness through advanced event-driven architecture for immediate system reactions."
  },
  {
    icon: <Cpu className="h-10 w-10 text-tab-green" />,
    title: "AI Integration",
    description: "Intelligent agents optimize workflows and enhance decision-making across all HVAC operations."
  },
  {
    icon: <LineChart className="h-10 w-10 text-tab-teal" />,
    title: "Predictive Analytics",
    description: "Transition from reactive maintenance to proactive HVAC management with AI-powered predictions."
  },
  {
    icon: <Plug className="h-10 w-10 text-tab-blue" />,
    title: "Seamless Integration",
    description: "Flexible connectivity with IoT sensors, Building Management Systems, and third-party services."
  },
  {
    icon: <Gauge className="h-10 w-10 text-tab-green" />,
    title: "Energy Optimization",
    description: "Intelligent algorithms that continuously adjust systems for maximum efficiency and comfort."
  },
  {
    icon: <RefreshCw className="h-10 w-10 text-tab-teal" />,
    title: "Continuous Improvement",
    description: "System that evolves and improves with each data point, becoming more efficient over time."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-tab-blue mb-4">
            Strategic Capabilities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform leverages cutting-edge technology to transform how buildings manage their HVAC systems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-5">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
