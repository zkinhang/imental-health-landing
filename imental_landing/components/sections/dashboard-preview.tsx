"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TrendingUp, TrendingDown, Heart, Activity, MessageSquare, Droplet, LineChart, AlertTriangle, AlertCircle, Info } from "lucide-react";
import MetricChart from "@/components/dashboard/metric-chart";
import { reportData } from "@/lib/report-data";

export default function DashboardPreview() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const metrics = [
    {
      id: "sleep",
      title: "Sleep Quality",
      icon: Activity,
      userScore: 65,
      avgScore: 82,
      change: -13,
      unit: "Positivity Score",
      analysis: "A sharp drop in sleep quality this week resulted in a score much lower than forecasted.",
      alerts: [
        {
          type: "destructive",
          title: "AI Recommendation",
          description: "🌙 Establish a regular sleep schedule. Avoid caffeine after 4 p.m. Try relaxation routines (e.g., deep breathing, light reading).",
        },
        {
          type: "destructive",
          title: "Forecast Alert",
          description: "Your sleep was much worse than the predicted recovery, indicating a persistent negative trend.",
        },
        {
          type: "info",
          title: "Future Outlook",
          description: "Forecast shows a continuing downward trend. Close monitoring recommended.",
        },
      ],
    },
    {
      id: "activity",
      title: "Physical Activity",
      icon: Heart,
      userScore: 58,
      avgScore: 70,
      change: -2,
      unit: "Positivity Score",
      analysis: "Your activity levels have slowly declined over the past few weeks and have now fallen just below the healthy range.",
      alerts: [
        {
          type: "destructive",
          title: "AI Recommendation",
          description: "🏃‍♂️ Go for light exercise such as a 20-30 min walk or stretching. Rebuild consistency gradually. Avoid overexertion. ",
        },
        {
          type: "info",
          title: "Future Outlook",
          description: "Forecast shows a continuing downward trend. Close monitoring recommended.",
        },
      ],
    },
    {
      id: "words",
      title: "Words Used",
      icon: MessageSquare,
      userScore: 71,
      avgScore: 75,
      change: -1,
      unit: "Positivity Score",
      analysis: "Your positivity score, while still healthy, has continued a subtle downward trend over the last several weeks.",
      alerts: [
        {
          type: "info",
          title: "Future Outlook",
          description: "Forecast shows a continuing downward trend. Close monitoring recommended.",
        },
      ],
    },
    {
      id: "blood-pressure",
      title: "Blood Pressure",
      icon: Droplet,
      userScore: "122/81",
      avgScore: "120/80",
      change: null,
      unit: "mmHg",
      analysis: "Your blood pressure has slightly increased this week, moving into the elevated range. This may be related to recent stress or changes in sleep.",
      alerts: [
        {
          type: "destructive",
          title: "AI Recommendation",
          description: "🧘‍♂️ Practice deep breathing or short mindfulness sessions. Reduce salty or processed food. Take short breaks between work.",
        },
        {
          type: "info",
          title: "Future Outlook",
          description: "Forecast shows a continuing upward trend. Close monitoring recommended.",
        },
      ],
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 70) return "stroke-green-500";
    if (score >= 60) return "stroke-amber-500";
    return "stroke-red-500";
  };

  const openChart = (metricId: string) => {
    setSelectedMetric(metricId);
  };

  return (
    <section id="dashboard-preview" className="relative py-12 md:py-16 lg:py-20 px-4 md:px-5 bg-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden grid-bg">
      {/* Dashboard analytics visualization */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-20">
        {/* Multiple small charts */}
        <div className="absolute top-20 left-10 w-64 h-48">
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <rect x="5" y="40" width="8" height="15" fill="black" opacity="0.3" />
            <rect x="18" y="30" width="8" height="25" fill="black" opacity="0.4" />
            <rect x="31" y="35" width="8" height="20" fill="black" opacity="0.3" />
            <rect x="44" y="20" width="8" height="35" fill="black" opacity="0.5" />
            <rect x="57" y="25" width="8" height="30" fill="black" opacity="0.4" />
            <rect x="70" y="15" width="8" height="40" fill="black" opacity="0.6" />
          </svg>
        </div>
        
        {/* Pie chart */}
        <div className="absolute bottom-20 right-20 w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="20" strokeDasharray="60 200" opacity="0.2" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="20" strokeDasharray="80 200" strokeDashoffset="-60" opacity="0.3" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 md:mb-4 tracking-tight">
          Your Weekly Wellness Dashboard
        </h2>
        <p className="text-center text-muted-foreground text-sm md:text-base lg:text-lg max-w-3xl mx-auto mb-8 md:mb-10 lg:mb-12 px-4">
          Get comprehensive insights with AI-powered predictions and personalized recommendations
        </p>

        <Card className="shadow-xl border-2 border-gray-300/50 bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm">
          <CardHeader className="border-b p-4 md:p-6 bg-gradient-to-r from-gray-100/80 via-gray-50/80 to-gray-100/80">
            <CardTitle className="text-xl md:text-2xl lg:text-3xl">Weekly Wellness Report Example</CardTitle>
            <CardDescription className="text-xs md:text-sm lg:text-base">
              For the week of Sep 16 - Sep 22, 2025
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-4 md:p-6 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                const isNumeric = typeof metric.userScore === "number";
                
                return (
                  <Card key={metric.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-gray-400 bg-white/95 dark:from-slate-800 dark:to-slate-900 hover:scale-[1.02] backdrop-blur-sm">
                    <CardHeader className="pb-3 md:pb-4 p-4 md:p-6">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary shrink-0" />
                          <CardTitle className="text-base md:text-lg lg:text-xl">{metric.title}</CardTitle>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => openChart(metric.id)}
                          className="text-xs md:text-sm shrink-0"
                        >
                          <LineChart className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          <span className="hidden sm:inline">View Details</span>
                          <span className="sm:hidden">Details</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 md:p-6 pt-0">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex-1 space-y-3">
                          {isNumeric ? (
                            <>
                              {/* Circular Progress */}
                              <div className="relative w-32 h-32 md:w-36 md:h-36 mx-auto">
                                {/* Background circle */}
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle
                                    cx="50%"
                                    cy="50%"
                                    r="45%"
                                    fill="none"
                                    stroke="hsl(var(--muted))"
                                    strokeWidth="8"
                                  />
                                  {/* Progress circle */}
                                  <circle
                                    cx="50%"
                                    cy="50%"
                                    r="45%"
                                    fill="none"
                                    stroke={
                                      (metric.userScore as number) >= 70
                                        ? "hsl(142.1 76.2% 36.3%)"
                                        : (metric.userScore as number) >= 60
                                        ? "hsl(24.6 95% 53.1%)"
                                        : "hsl(0 84.2% 60.2%)"
                                    }
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 45}`}
                                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - (metric.userScore as number) / 100)}`}
                                    className="transition-all duration-1000 ease-out"
                                  />
                                </svg>
                                {/* Score text in center */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                  <span className={`text-3xl md:text-4xl font-bold ${getScoreColor(metric.userScore as number)}`}>
                                    {metric.userScore}
                                  </span>
                                  <span className="text-xs text-muted-foreground">/ 100</span>
                                </div>
                              </div>
                              <div className="text-center space-y-2">
                                <p className="text-xs md:text-sm font-medium text-muted-foreground">Your Score</p>
                                {metric.change !== null && (
                                  <Badge variant={metric.change > 0 ? "default" : "destructive"} className="gap-1">
                                    {metric.change > 0 ? (
                                      <TrendingUp className="h-3 w-3" />
                                    ) : (
                                      <TrendingDown className="h-3 w-3" />
                                    )}
                                    <span>{metric.change > 0 ? "+" : ""}{metric.change}</span>
                                  </Badge>
                                )}
                              </div>
                            </>
                          ) : (
                            <div className="space-y-2 text-center">
                              <div className="text-3xl md:text-4xl font-bold text-red-600">
                                {metric.userScore}
                              </div>
                              <p className="text-xs md:text-sm text-muted-foreground">Your Reading</p>
                            </div>
                          )}
                        </div>
                        
                        <Separator orientation="vertical" className="hidden md:block h-32 md:h-36" />
                        <Separator orientation="horizontal" className="md:hidden" />
                        
                        <div className="flex-1 space-y-3 text-center">
                          <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-bold text-muted-foreground">
                              {metric.avgScore}
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              {isNumeric ? "Average Score" : "Normal Range"}
                            </p>
                            {isNumeric && (
                              <Badge variant="outline" className="text-xs">
                                {metric.unit}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {metric.analysis}
                      </p>

                      <Separator className="my-4" />

                      {metric.alerts.map((alert, idx) => {
                        const AlertIcon = alert.type === "destructive" ? AlertTriangle : alert.type === "info" ? Info : AlertCircle;
                        return (
                          <Alert key={idx} variant={alert.type as any} className="mb-3 last:mb-0">
                            <AlertIcon className="h-4 w-4" />
                            <AlertTitle className="text-xs md:text-sm">{alert.title}</AlertTitle>
                            <AlertDescription className="text-xs md:text-sm">
                              {alert.description}
                            </AlertDescription>
                          </Alert>
                        );
                      })}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Modal */}
      <Dialog open={!!selectedMetric} onOpenChange={(open) => !open && setSelectedMetric(null)}>
        <DialogContent className="w-full h-full max-h-full sm:w-[95vw] sm:h-auto sm:max-h-[90vh] sm:max-w-3xl p-4 sm:p-6 gap-4 sm:gap-6 overflow-y-auto sm:rounded-lg rounded-none">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-base sm:text-lg md:text-xl lg:text-2xl text-left pr-8">
              {selectedMetric && metrics.find(m => m.id === selectedMetric)?.title} - History & Forecast
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto flex-1">
            {selectedMetric && <MetricChart metricId={selectedMetric} />}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
