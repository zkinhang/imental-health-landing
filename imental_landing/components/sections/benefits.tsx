import { Card, CardContent } from "@/components/ui/card";
import { Lock, Target, Zap, Smartphone, RefreshCw, Lightbulb } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: Lock,
      title: "Privacy-First Design",
      description: "Secured AI analysis process ensures your sensitive health data never leaves your device",
    },
    {
      icon: Target,
      title: "Evidence-Based Approach",
      description: "Built on published professional journals and validated research methodologies",
    },
    {
      icon: Zap,
      title: "Early Detection",
      description: "Identify potential mental health concerns at the earliest stage for timely intervention",
    },
    {
      icon: Smartphone,
      title: "Seamless Integration",
      description: "Works with your existing smart devices without any additional hardware",
    },
    {
      icon: RefreshCw,
      title: "Continuous Monitoring",
      description: "24/7 passive tracking provides comprehensive insights into your mental well-being",
    },
    {
      icon: Lightbulb,
      title: "Actionable Insights",
      description: "Receive clear, personalized recommendations you can implement immediately",
    },
  ];

  return (
    <section id="benefits" className="relative py-20 md:py-24 lg:py-28 px-5 bg-gray-50 dark:bg-slate-900 grid-bg">
      {/* Benefits visualization */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-20">
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {[...Array(15)].map((_, i) => (
              <circle
                key={i}
                cx={`${(i % 5) * 20 + 10}%`}
                cy={`${Math.floor(i / 5) * 30 + 15}%`}
                r="30"
                fill="none"
                stroke="black"
                strokeWidth="1"
                opacity="0.2"
              />
            ))}
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">
          Why Choose iMental State Tracker?
        </h2>
        <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mb-12">
          Experience the next generation of mental health monitoring
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-gray-400 bg-white/95 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm">
              <CardContent className="flex gap-4 p-6">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-gray-800 via-gray-700 to-black flex items-center justify-center shadow-lg">
                  <benefit.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">{benefit.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
