
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  ClipboardCheck, 
  UserCog 
} from "lucide-react";

const agents = [
  {
    icon: <UserCog className="h-16 w-16 text-tab-blue mb-6" />,
    title: "Admin Agent",
    badge: "Project Management",
    description: "Intelligent assistant that automates project creation, scheduling, and resource allocation. Eliminates manual setup complexity and reduces scheduling inefficiencies.",
    features: [
      "Natural language project management",
      "Automated resource optimization",
      "AI-driven reporting and analytics",
      "Intelligent scheduling and coordination"
    ]
  },
  {
    icon: <Brain className="h-16 w-16 text-tab-green mb-6" />,
    title: "Engineer Agent",
    badge: "System Optimization",
    description: "Automated advisor that proactively suggests system improvements, analyzes data efficiently, and streamlines certification processes for maximum building performance.",
    features: [
      "Real-time data validation and analysis",
      "Anomaly detection and diagnosis",
      "Proactive system recommendations",
      "Predictive performance analytics"
    ]
  },
  {
    icon: <ClipboardCheck className="h-16 w-16 text-tab-teal mb-6" />,
    title: "Tester Agent",
    badge: "Field Operations",
    description: "Intelligent testing guide for field technicians that ensures accurate data collection, recommends optimized testing sequences, and provides real-time troubleshooting.",
    features: [
      "Intelligent field-testing guidance",
      "Speech recognition for hands-free notes",
      "Offline AI support in remote locations",
      "Automated reporting and documentation"
    ]
  }
];

const AgentsSection = () => {
  return (
    <section id="agents" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-tab-blue mb-4">
            Intelligent Agents
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-native platform features specialized intelligent agents that transform every aspect of HVAC management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center"
            >
              {agent.icon}
              <Badge className="bg-tab-blue/10 text-tab-blue hover:bg-tab-blue/20 mb-4">
                {agent.badge}
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{agent.title}</h3>
              <p className="text-gray-600 mb-6">{agent.description}</p>
              <ul className="space-y-2 text-left w-full">
                {agent.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-tab-green mr-2">•</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
