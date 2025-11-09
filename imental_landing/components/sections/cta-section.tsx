import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-24 px-5 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Data streams visualization */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0 }} />
              <stop offset="50%" style={{ stopColor: 'white', stopOpacity: 0.5 }} />
              <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={`${i * 15}%`}
              x2="100%"
              y2={`${i * 15}%`}
              stroke="url(#grad1)"
              strokeWidth="1"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </svg>
        
        {/* Binary/matrix style background */}
        <div className="absolute inset-0 font-mono text-xs opacity-20">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
              {Math.random().toString(2).substr(2, 50)}
            </div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight drop-shadow-lg">
          Start Your Mental Health Journey Today
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-95">
          Take control of your mental well-being with AI-powered insights and personalized recommendations
        </p>
        <Button size="lg" variant="secondary" className="shadow-xl hover:shadow-2xl hover:scale-105 transition-all" asChild>
          <Link href="#">
            Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
