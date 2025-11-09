import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import RegisterDialog from "@/components/register-dialog";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 md:py-28 lg:py-32 px-5 text-center overflow-hidden grid-bg">
      {/* Data visualization background elements */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        {/* Grid lines and data points */}
        <div className="absolute top-20 left-10 w-64 h-64">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M10,80 L30,60 L50,70 L70,40 L90,50" stroke="black" strokeWidth="2" fill="none" className="animate-pulse" />
            <circle cx="10" cy="80" r="3" fill="black" />
            <circle cx="30" cy="60" r="3" fill="black" />
            <circle cx="50" cy="70" r="3" fill="black" />
            <circle cx="70" cy="40" r="3" fill="black" />
            <circle cx="90" cy="50" r="3" fill="black" />
          </svg>
        </div>
        
        <div className="absolute bottom-20 right-10 w-72 h-72">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect x="10" y="60" width="15" height="50" fill="black" opacity="0.6" className="animate-float" />
            <rect x="30" y="40" width="15" height="70" fill="black" opacity="0.7" />
            <rect x="50" y="70" width="15" height="40" fill="black" opacity="0.5" className="animate-float" style={{ animationDelay: '1s' }} />
            <rect x="70" y="30" width="15" height="80" fill="black" opacity="0.8" />
            <rect x="90" y="50" width="15" height="60" fill="black" opacity="0.6" className="animate-float" style={{ animationDelay: '2s' }} />
          </svg>
        </div>
        
        {/* Circular data visualization */}
        <div className="absolute top-1/2 right-1/4 w-48 h-48 opacity-50">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="1" opacity="0.3" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="black" strokeWidth="1" opacity="0.4" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="black" strokeWidth="1" opacity="0.5" />
            <line x1="50" y1="50" x2="85" y2="30" stroke="black" strokeWidth="1" opacity="0.4" />
            <line x1="50" y1="50" x2="75" y2="75" stroke="black" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>
      </div>
      
      {/* Subtle background gradients */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            fillOpacity="1"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            className="dark:fill-slate-900"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <Badge variant="secondary" className="mb-6">
          <span className="mr-1">✨</span> AI-Powered Mental Health Monitoring
        </Badge>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
          iMental State Tracker
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Monitor your daily activities, detect potential symptoms of mental health concerns, and receive personalized AI-driven insights with tailored recommendations to address mental health issues at the earliest stage.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <RegisterDialog 
            trigger={
              <Button size="lg">
                Request Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            }
          />
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
