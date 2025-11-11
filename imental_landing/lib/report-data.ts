export interface MetricData {
  metric: string;
  userScore: number | string;
  avgScore: number | string;
  previousScore: number | string;
  unit: string;
  threshold: [number, number];
  analysis: string;
  warning: string | null;
  discrepancyWarning: string | null;
  history: number[];
  previousForecast: (number | null)[];
}

export const reportData: MetricData[] = [
  {
    metric: "Sleep Quality",
    userScore: 65,
    avgScore: 82,
    previousScore: 78,
    unit: "Score",
    threshold: [70, 95],
    analysis: "🌙 Establish a regular sleep schedule. Avoid caffeine after 4 p.m. Try relaxation routines (e.g., deep breathing, light reading).",
    warning: "Score is below recommended range. Prioritizing consistent sleep is crucial for recovery.",
    discrepancyWarning: "Your sleep was much worse than the predicted recovery, indicating a persistent negative trend.",
    history: [78, 80, 75, 79, 72, 76, 78, 65],
    previousForecast: [null, null, null, null, null, null, 77, 78]
  },
  {
    metric: "Physical Activity",
    userScore: 58,
    avgScore: 70,
    previousScore: 60,
    unit: "Score",
    threshold: [60, 95],
    analysis: "🏃‍♂️ Go for light exercise such as a 20-30 min walk or stretching. Rebuild consistency gradually. Avoid overexertion.",
    warning: "Activity score is below recommended range. Fatigue or changes in routine may be a factor.",
    discrepancyWarning: null,
    history: [70, 68, 69, 65, 64, 62, 60, 58],
    previousForecast: [null, null, null, null, null, 63, 61, 59]
  },
  {
    metric: "Words Used",
    userScore: 71,
    avgScore: 75,
    previousScore: 72,
    unit: "Positivity Score",
    threshold: [70, 95],
    analysis: "Your positivity score, while still healthy, has continued a subtle downward trend over the last several weeks.",
    warning: null,
    discrepancyWarning: null,
    history: [78, 77, 78, 76, 75, 74, 72, 71],
    previousForecast: [null, null, null, null, null, 74, 73, 72]
  },
  {
    metric: "Blood Pressure",
    userScore: 122,
    avgScore: 120,
    previousScore: 121,
    unit: "mmHg",
    threshold: [90, 120],
    analysis: "Your blood pressure has slightly increased this week, moving into the elevated range. This may be related to recent stress or changes in sleep.",
    warning: "Blood pressure is now in the elevated range. It's important to monitor this, especially after stressful periods.",
    discrepancyWarning: null,
    history: [120, 122, 119, 121, 118, 120, 121, 122],
    previousForecast: [null, null, null, null, null, 120, 121, 121]
  }
];

export const getMetricDataById = (id: string): MetricData | undefined => {
  const metricMap: { [key: string]: string } = {
    "sleep": "Sleep Quality",
    "activity": "Physical Activity",
    "words": "Words Used",
    "blood-pressure": "Blood Pressure"
  };
  
  const metricName = metricMap[id];
  return reportData.find(m => m.metric === metricName);
};
