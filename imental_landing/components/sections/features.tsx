import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BarChart3, Bell } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI-Generated Mental State Reports",
      description:
        "Our on-device AI model analyzes your data based on published professional journals and personalizes insights with your individual profile through ongoing data analysis.",
    },
    {
      icon: BarChart3,
      title: "Multi SymptoMARKER Analysis",
      description:
        "Beyond statistical analysis, our system provides trend notifications and reports using automated linear regression prediction across multiple symptom markers, not just single indicators.",
    },
    {
      icon: Bell,
      title: "Recommendation Alerts",
      description:
        "When your status shows patterns common to your professional group that may indicate future risks, receive proactive notifications to help you take preventive action.",
    },
  ];

  return (
    <section id="features" className="relative py-20 md:py-24 lg:py-28 px-5 bg-gray-50 dark:bg-slate-900 grid-bg">
      {/* Analytics visualization elements */}
      <div className="absolute inset-0 opacity-[0.07] dark:opacity-20 overflow-hidden">
        {/* Network/connection visualization */}
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="black" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
        
        {/* Data flow lines */}
        <div className="absolute top-1/4 right-0 w-96 h-96">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M0,100 Q50,50 100,100 T200,100" stroke="black" strokeWidth="1" fill="none" opacity="0.3" className="animate-pulse" />
            <path d="M0,120 Q50,70 100,120 T200,120" stroke="black" strokeWidth="1" fill="none" opacity="0.2" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">
          Main Features
        </h2>
        <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mb-12">
          Comprehensive mental health monitoring powered by advanced AI and multi-sensor analysis
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="stagger-item transition-all hover:shadow-2xl hover:scale-105 hover:-translate-y-2 duration-300 border-2 hover:border-primary/50 bg-white/90 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center shadow-lg">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
