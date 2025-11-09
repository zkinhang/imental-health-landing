import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Connect Your Devices",
      description:
        "Sync your smartphone and smartwatch to begin collecting health data from multiple sensors seamlessly.",
    },
    {
      number: 2,
      title: "AI Analyzes Your Data",
      description:
        "Our AI model processes your data using proven research methods and personalizes insights to your unique profile.",
    },
    {
      number: 3,
      title: "Receive Personalized Insights",
      description:
        "Get tailored recommendations and early alerts to help you maintain optimal mental health and well-being.",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 md:py-24 lg:py-28 px-5 bg-gray-50 dark:bg-slate-900 overflow-hidden grid-bg">
      {/* Process flow visualization */}
      <div className="absolute inset-0 opacity-[0.06] dark:opacity-20">
        {/* Flowchart-style connections */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="black" opacity="0.4" />
            </marker>
          </defs>
          <path d="M100,100 L300,100 L300,200 L500,200" stroke="black" strokeWidth="2" fill="none" opacity="0.3" markerEnd="url(#arrowhead)" className="animate-pulse" />
          <path d="M600,150 L800,150 L800,250" stroke="black" strokeWidth="2" fill="none" opacity="0.3" markerEnd="url(#arrowhead)" className="animate-pulse" style={{ animationDelay: '1s' }} />
        </svg>
        
        {/* Node elements */}
        <div className="absolute top-1/3 left-1/4">
          <div className="w-16 h-16 border-4 border-black/20 rounded-lg rotate-45" />
        </div>
        <div className="absolute bottom-1/3 right-1/4">
          <div className="w-20 h-20 border-4 border-black/20 rounded-full" />
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">
          How It Works
        </h2>
        <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mb-12">
          Simple, seamless, and secure mental health monitoring in three easy steps
        </p>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines between steps */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 opacity-30 z-0" />
          
          {steps.map((step) => (
            <Card key={step.number} className="stagger-item text-center relative z-10 hover:shadow-2xl transition-all duration-300 border-2 hover:border-gray-400 bg-white/95 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-800 via-gray-700 to-black text-white flex items-center justify-center font-bold text-2xl shadow-xl hover:scale-110 transition-transform border-4 border-gray-300">
                  {step.number}
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
