import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function SymptoMarker() {
  const indicators = [
    {
      metric: "Sleep Distribution",
      correlation: "High",
      dataSource: "Smart Watch",
      sensor: "Optical HR sensor",
      level: "success",
    },
    {
      metric: "Phone Usage",
      correlation: "High",
      dataSource: "Phone",
      sensor: "Screen time API",
      level: "success",
    },
    {
      metric: "Exercise Pattern",
      correlation: "High",
      dataSource: "Phone",
      sensor: "Heart Rate Sensor",
      level: "success",
    },
    {
      metric: "Words Used",
      correlation: "Median",
      dataSource: "Phone",
      sensor: "Keyboard input logs",
      level: "warning",
    },
    {
      metric: "Blood Pressure",
      correlation: "Median",
      dataSource: "Smart Watch",
      sensor: "Optical sensor",
      level: "warning",
    },
    {
      metric: "Daily Steps/Rates",
      correlation: "Low",
      dataSource: "Smart Watch",
      sensor: "Gyroscope",
      level: "danger",
    },
    {
      metric: "Low HRV",
      correlation: "Low",
      dataSource: "Smart Watch",
      sensor: "Optical HR sensor",
      level: "danger",
    },
  ];

  return (
    <section id="symptomarker" className="relative py-20 md:py-24 lg:py-28 px-5 bg-gray-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 grid-bg">
      {/* Data table visualization elements */}
      <div className="absolute inset-0 opacity-[0.06] dark:opacity-20">
        {/* Scatter plot visualization */}
        <div className="absolute top-10 left-1/4 w-80 h-80">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {[...Array(30)].map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 90 + 5}
                cy={Math.random() * 90 + 5}
                r={Math.random() * 2 + 1}
                fill="black"
                opacity={Math.random() * 0.5 + 0.3}
              />
            ))}
          </svg>
        </div>
        
        {/* Matrix/heatmap style */}
        <div className="absolute bottom-10 right-1/4 w-64 h-64">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {[0, 20, 40, 60, 80].map((x) =>
              [0, 20, 40, 60, 80].map((y) => (
                <rect
                  key={`${x}-${y}`}
                  x={x}
                  y={y}
                  width="15"
                  height="15"
                  fill="black"
                  opacity={Math.random() * 0.3 + 0.1}
                />
              ))
            )}
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">
          SymptoMARKER Indicators
        </h2>
        <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mb-12">
          Our system monitors multiple health metrics using advanced sensor technology from your smart devices
        </p>

        <Card className="overflow-hidden shadow-xl border-2 border-gray-300/30 bg-white/95 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-200/80 via-gray-100/80 to-gray-200/80 border-b-2 border-gray-300">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Effectiveness
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Data Source
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Sensor / Input Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {indicators.map((indicator, index) => (
                  <tr key={index} className="hover:bg-gray-100/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{indicator.metric}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          indicator.level === "success"
                            ? "success"
                            : indicator.level === "warning"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {indicator.correlation}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {indicator.dataSource}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {indicator.sensor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
}
