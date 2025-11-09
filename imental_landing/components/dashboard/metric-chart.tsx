"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ReferenceLine, 
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart,
  Legend,
  Tooltip
} from "recharts";
import { getMetricDataById } from "@/lib/report-data";
import { TrendingUp, TrendingDown, AlertTriangle, Info, Clock, Activity, CheckCircle2 } from "lucide-react";

interface MetricChartProps {
  metricId: string;
}

export default function MetricChart({ metricId }: MetricChartProps) {
  const metricData = getMetricDataById(metricId);

  if (!metricData) {
    return <div>Metric data not found</div>;
  }

  const { history, previousForecast, threshold, unit, discrepancyWarning } = metricData;

  // Enhanced chart configuration with better colors and styling
  const chartConfig = {
    actual: {
      label: `Actual ${unit}`,
      color: "#0EA5E9", // Primary blue - strong, visible
    },
    previousForecast: {
      label: "Previous Forecast",
      color: "#94A3B8", // Muted gray - historical reference
    },
    futureForecast: {
      label: "AI Prediction",
      color: "#F97316", // Orange - attention-grabbing for predictions
    },
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    // Filter out shadow entries
    const filteredPayload = payload.filter((entry: any) => 
      entry.dataKey !== 'previousForecastShadow' && 
      entry.dataKey !== 'futureForecastShadow' &&
      entry.dataKey !== 'thresholdHigh' &&
      entry.dataKey !== 'thresholdLow'
    );

    if (filteredPayload.length === 0) return null;

    return (
      <div className="rounded-lg border bg-background p-3 shadow-md">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Week {label.toString().replace('W', '')}
        </p>
        <div className="space-y-1.5">
          {filteredPayload.map((entry: any) => {
            const config = chartConfig[entry.dataKey as keyof typeof chartConfig];
            return (
              <div key={entry.dataKey} className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-2">
                  <div 
                    className="h-2.5 w-2.5 rounded-full" 
                    style={{ backgroundColor: config?.color || entry.color }}
                  />
                  <span className="text-xs font-medium text-foreground">
                    {config?.label || entry.name}
                  </span>
                </div>
                <span className="text-xs font-bold text-foreground tabular-nums">
                  {entry.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Calculate future forecast using linear regression for better accuracy
  const calculateFutureForecast = () => {
    const n = history.length;
    const recentData = history.slice(-4); // Use last 4 weeks for trend
    
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    recentData.forEach((value, index) => {
      sumX += index;
      sumY += value;
      sumXY += index * value;
      sumX2 += index * index;
    });
    
    const slope = (recentData.length * sumXY - sumX * sumY) / (recentData.length * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / recentData.length;
    
    const futureValues = [];
    for (let i = 1; i <= 3; i++) {
      futureValues.push(Math.round(slope * (recentData.length - 1 + i) + intercept));
    }
    return futureValues;
  };

  const lastValue = history[history.length - 1];
  const futureValues = calculateFutureForecast();

  // Prepare chart data - need to ensure continuous lines
  const chartData = [];
  const totalWeeks = history.length + 3; // 8 weeks history + 3 weeks future = 11 total

  for (let i = 0; i < totalWeeks; i++) {
    const weekData: any = {
      week: `Week ${i + 1}`,
      weekLabel: `W${i + 1}`,
    };

    // Historical actual data (weeks 1-8)
    if (i < history.length) {
      weekData.actual = history[i];
      
      // IMPORTANT: Also add futureForecast starting point at the last actual week
      // This creates the connection point between actual and forecast lines
      if (i === history.length - 1) {
        weekData.futureForecast = history[i]; // Same value as actual at Week 8
        weekData.futureForecastShadow = history[i]; // For the shadow area
      }
    }

    // Previous forecast (what was predicted before)
    if (previousForecast && i < previousForecast.length && previousForecast[i] !== null) {
      weekData.previousForecast = previousForecast[i];
      weekData.previousForecastShadow = previousForecast[i]; // For the shadow area
    }

    // Future forecast (weeks 9-11) - continue from Week 8
    if (i >= history.length) {
      const futureIndex = i - history.length;
      weekData.futureForecast = futureValues[futureIndex];
      weekData.futureForecastShadow = futureValues[futureIndex]; // For the shadow area
    }

    // Add threshold ranges for visual reference
    if (threshold) {
      weekData.thresholdHigh = threshold[1];
      weekData.thresholdLow = threshold[0];
    }

    chartData.push(weekData);
  }

  // Debug: Log the chart data to console
  console.log('=== CHART DEBUG ===');
  console.log('Metric:', metricData.metric);
  console.log('History length:', history.length);
  console.log('Future Values:', futureValues);
  console.log('Last Value:', lastValue);
  console.log('Chart Data (total weeks):', chartData.length);
  console.log('Full Chart Data:', JSON.stringify(chartData, null, 2));

  // Calculate analytics
  const forecastThisWeek = previousForecast && previousForecast[previousForecast.length - 1];
  const actualThisWeek = history[history.length - 1];
  const previousWeek = history[history.length - 2];
  const weeklyChange = actualThisWeek - previousWeek;
  const hasDiscrepancy = discrepancyWarning && forecastThisWeek && Math.abs(actualThisWeek - forecastThisWeek) / forecastThisWeek > 0.15;

  // Trend analysis
  const isDownwardTrend = futureValues.every((v, i, a) => i === 0 || v < a[i - 1]);
  const isUpwardTrend = futureValues.every((v, i, a) => i === 0 || v > a[i - 1]);
  const willExceedThreshold = threshold && futureValues.some(v => v < threshold[0] || v > threshold[1]);
  
  // Calculate forecast accuracy
  const forecastAccuracy = previousForecast && forecastThisWeek 
    ? Math.max(0, 100 - Math.abs((actualThisWeek - forecastThisWeek) / forecastThisWeek * 100))
    : null;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-medium uppercase tracking-wide">Current Score</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold">{actualThisWeek}</div>
            <div className="flex items-center gap-2">
              <Badge variant={weeklyChange >= 0 ? "default" : "destructive"} className="text-xs gap-1">
                {weeklyChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {weeklyChange >= 0 ? '+' : ''}{weeklyChange} this week
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-medium uppercase tracking-wide">3-Week Prediction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-orange-600 dark:text-orange-500">{futureValues[2]}</div>
            <div className="flex items-center gap-2">
              <Badge variant={isUpwardTrend ? "default" : isDownwardTrend ? "secondary" : "outline"} className="text-xs">
                {isUpwardTrend ? '↗ Improving' : isDownwardTrend ? '↘ Declining' : '→ Stable'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {forecastAccuracy !== null && (
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs font-medium uppercase tracking-wide">Forecast Accuracy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-bold">{Math.round(forecastAccuracy)}</span>
                <span className="text-2xl text-muted-foreground">%</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Last week's prediction</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator className="my-6" />

      {/* Enhanced Chart with Area Fill */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Trend Analysis & Forecasting</CardTitle>
          <CardDescription>
            Historical data (solid blue), previous predictions (dashed gray), and AI forecast (dashed orange)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  {/* Gradient for healthy range */}
                  <linearGradient id="healthyRange" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0.05}/>
                  </linearGradient>
                  {/* Gradient for actual data */}
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                  {/* Gradient for previous forecast - gray shadow */}
                  <linearGradient id="previousForecastGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#94A3B8" stopOpacity={0}/>
                  </linearGradient>
                  {/* Gradient for future forecast - orange shadow */}
                  <linearGradient id="futureForecastGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
                
                <XAxis
                  dataKey="weekLabel"
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />
                
                <YAxis
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                  label={{ 
                    value: unit, 
                    angle: -90, 
                    position: 'insideLeft', 
                    style: { fontSize: 12, fill: 'hsl(var(--foreground))' } 
                  }}
                />
                
                <ChartTooltip 
                  content={<CustomTooltip />}
                />
                
                <ChartLegend content={<ChartLegendContent />} />
                
                {/* Healthy range visualization */}
                {threshold && (
                  <>
                    <ReferenceLine
                      y={threshold[1]}
                      stroke="hsl(var(--chart-3))"
                      strokeDasharray="3 3"
                      strokeWidth={1}
                      opacity={0.5}
                      label={{ 
                        value: 'Upper Healthy Limit', 
                        position: 'insideTopRight', 
                        fontSize: 10,
                        fill: 'hsl(var(--muted-foreground))'
                      }}
                    />
                    <ReferenceLine
                      y={threshold[0]}
                      stroke="hsl(var(--chart-3))"
                      strokeDasharray="3 3"
                      strokeWidth={1}
                      opacity={0.5}
                      label={{ 
                        value: 'Lower Healthy Limit', 
                        position: 'insideBottomRight', 
                        fontSize: 10,
                        fill: 'hsl(var(--muted-foreground))'
                      }}
                    />
                  </>
                )}

                {/* Actual scores with area fill */}
                <Area
                  type="monotone"
                  dataKey="actual"
                  name="Actual Score"
                  stroke={chartConfig.actual.color}
                  strokeWidth={3}
                  fill="url(#actualGradient)"
                  dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                  isAnimationActive={false}
                />

                {/* Previous forecast - SHADOW (completely hidden from legend) */}
                <Area
                  type="monotone"
                  dataKey="previousForecastShadow"
                  stroke="none"
                  fill="url(#previousForecastGradient)"
                  fillOpacity={1}
                  connectNulls
                  isAnimationActive={false}
                />
                {/* Previous forecast - LINE with small dots */}
                <Line
                  type="monotone"
                  dataKey="previousForecast"
                  name="Previous Forecast"
                  stroke={chartConfig.previousForecast.color}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 2, strokeWidth: 1, fill: chartConfig.previousForecast.color }}
                  activeDot={{ r: 4, strokeWidth: 1.5 }}
                  connectNulls
                  isAnimationActive={false}
                />

                {/* Future forecast - SHADOW (completely hidden from legend) */}
                <Area
                  type="monotone"
                  dataKey="futureForecastShadow"
                  stroke="none"
                  fill="url(#futureForecastGradient)"
                  fillOpacity={1}
                  connectNulls={false}
                  isAnimationActive={false}
                />
                {/* Future forecast - LINE with small triangular dots */}
                <Line
                  type="monotone"
                  dataKey="futureForecast"
                  name="AI Prediction"
                  stroke={chartConfig.futureForecast.color}
                  strokeWidth={5}
                  strokeDasharray="10 5"
                  dot={{ r: 3, strokeWidth: 2, fill: chartConfig.futureForecast.color }}
                  activeDot={{ r: 5, strokeWidth: 2 }}
                  connectNulls={false}
                  isAnimationActive={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Insights and Alerts */}
      <div className="space-y-3">
        {hasDiscrepancy && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Forecast Discrepancy Detected</AlertTitle>
            <AlertDescription>{discrepancyWarning}</AlertDescription>
          </Alert>
        )}

        {forecastThisWeek !== null && actualThisWeek !== null && (
          <Alert variant={forecastAccuracy && forecastAccuracy > 85 ? "success" : "info"}>
            {forecastAccuracy && forecastAccuracy > 85 ? <CheckCircle2 className="h-4 w-4" /> : <Info className="h-4 w-4" />}
            <AlertTitle>Last Week's Forecast vs Actual</AlertTitle>
            <AlertDescription>
              We predicted <strong>{Math.round(forecastThisWeek)}</strong>, your actual was <strong>{actualThisWeek}</strong>
              {Math.abs(actualThisWeek - forecastThisWeek) <= forecastThisWeek * 0.05 ? (
                <> , which was within the predicted range.</>
              ) : (
                <>
                  . Difference: <strong>{Math.abs(actualThisWeek - forecastThisWeek).toFixed(0)}</strong> {unit}{" "}
                  {actualThisWeek > forecastThisWeek ? "higher" : "lower"} than predicted.
                </>
              )}
            </AlertDescription>
          </Alert>
        )}

        {willExceedThreshold && (
          <Alert variant="warning">
            <Clock className="h-4 w-4" />
            <AlertTitle>Threshold Alert - Action Recommended</AlertTitle>
            <AlertDescription>
              {isDownwardTrend ? (
                <>
                  AI predicts scores will fall below healthy range
                  <strong> ({threshold[0]})</strong> within 3 weeks.
                </>
              ) : (
                <>
                  AI predicts scores may exceed healthy range
                  <strong> ({threshold[1]})</strong> within 3 weeks.
                </>
              )}
            </AlertDescription>
          </Alert>
        )}

        {(isDownwardTrend || isUpwardTrend) && !willExceedThreshold && (
          <Alert variant={isUpwardTrend ? "success" : "info"}>
            {isUpwardTrend ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <AlertTitle>Trend Analysis</AlertTitle>
            <AlertDescription>
              {isUpwardTrend 
                ? `Positive trend detected! AI forecasts continued improvement over the next 3 weeks: ${futureValues[0]} → ${futureValues[1]} → ${futureValues[2]}`
                : `Gradual decline observed. Predicted trajectory: ${futureValues[0]} → ${futureValues[1]} → ${futureValues[2]}. Consider lifestyle adjustments.`
              }
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
