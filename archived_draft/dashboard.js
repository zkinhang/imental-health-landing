// Mock data for the user's weekly wellness report with history and threshold ranges
const reportData = [
    {
        metric: "Sleep Quality",
        userScore: 65,
        avgScore: 82,
        previousScore: 78,
        unit: "Score",
        threshold: [70, 95],
        analysis: "A sharp drop in sleep quality this week resulted in a score much lower than forecasted.",
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
        analysis: "Your activity levels have slowly declined over the past few weeks and have now fallen just below the healthy range.",
        warning: "Activity score is below recommended range. Fatigue or changes in routine may be a factor.",
        discrepancyWarning: null,
        history: [70, 68, 69, 65, 64, 62, 60, 58],
        previousForecast: [null, null, null, null, null, 63, 61, 59]
    },
    {
        metric: "Word Positivity",
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
        userScore: '122/81',
        avgScore: '120/80',
        previousScore: '121/79',
        unit: "mmHg",
        threshold: [90, 120],
        analysis: "Your blood pressure has slightly increased this week, moving into the elevated range. This may be related to recent stress or changes in sleep.",
        warning: "Blood pressure is now in the elevated range. It's important to monitor this, especially after stressful periods.",
        discrepancyWarning: null,
        history: [120, 122, 119, 121, 118, 120, 121, 122],
        previousForecast: [null, null, null, null, null, 120, 121, 121]
    }
];

let historyChartInstance = null;

// --- Analysis Functions ---
function getForecastDiscrepancyAnalysis(metricData) {
    const { history, previousForecast, discrepancyWarning } = metricData;
    if (!discrepancyWarning) return null;

    const actualThisWeek = history[history.length - 1];
    const forecastForThisWeek = previousForecast ? previousForecast[previousForecast.length - 1] : null;

    if (actualThisWeek !== null && forecastForThisWeek !== null) {
        const diff = actualThisWeek - forecastForThisWeek;
        if (Math.abs(diff / forecastForThisWeek) > 0.15) {
            return {
                text: discrepancyWarning,
                isPositive: diff > 0
            };
        }
    }
    return null;
}

function getForecastAnalysis(metricData) {
    const { history, threshold } = metricData;
    let futureAlert = '';

    if (history && history.length >= 2 && typeof history[0] === 'number') {
        const lastValue = history[history.length - 1];
        const secondLastValue = history[history.length - 2];
        const trend = lastValue - secondLastValue;

        const futureForecastValues = [
            Math.round(lastValue + trend),
            Math.round(lastValue + 2 * trend),
            Math.round(lastValue + 3 * trend)
        ];

        const isDownwardTrend = futureForecastValues.every((v, i, a) => i === 0 || v < a[i - 1]);
        let isOutsideRange = false;
        let outsideRangeMessage = '';

        if (threshold && Array.isArray(threshold)) {
            if (futureForecastValues.some(v => v < threshold[0])) {
                isOutsideRange = true;
                outsideRangeMessage = "fall below healthy range.";
            } else if (futureForecastValues.some(v => v > threshold[1])) {
                isOutsideRange = true;
                outsideRangeMessage = "rise above healthy range.";
            }
        }

        if (isDownwardTrend && isOutsideRange) {
            futureAlert = `Forecast shows downward trend, predicted to ${outsideRangeMessage}`;
        } else if (isDownwardTrend) {
            futureAlert = `Forecast shows a continuing downward trend. Close monitoring recommended.`;
        } else if (isOutsideRange) {
            futureAlert = `Forecast predicts metric will ${outsideRangeMessage}`;
        }
    }
    return futureAlert;
}

// --- Charting and Modal ---
const modal = document.getElementById('chartModal');
const modalTitle = document.getElementById('chartModalTitle');
const forecastAnalysisContainer = document.getElementById('forecast-analysis-container');

function showHistoryChart(metricName) {
    const metricData = reportData.find(d => d.metric === metricName);
    if (!metricData || !metricData.history) return;

    modalTitle.innerText = `${metricData.metric} - History & Forecast`;
    const ctx = document.getElementById('historyChart').getContext('2d');
    if (historyChartInstance) historyChartInstance.destroy();

    const history = metricData.history;
    const previousForecastData = metricData.previousForecast;

    let futureForecastData = [];
    if (history && history.length >= 2 && typeof history[0] === 'number') {
        const lastValue = history[history.length - 1];
        const secondLastValue = history[history.length - 2];
        const trend = lastValue - secondLastValue;
        const futureValues = [
            Math.round(lastValue + trend),
            Math.round(lastValue + 2 * trend),
            Math.round(lastValue + 3 * trend)
        ];
        futureForecastData = [...Array(history.length - 1).fill(null), lastValue, ...futureValues];
    }

    const chartLabels = [...Array.from({ length: history.length }, (_, i) => `Wk ${i}`), 'Wk ' + history.length, 'Wk ' + (history.length + 1), 'Wk ' + (history.length + 2)];
    
    let datasets = [
        {
            label: `Your ${metricData.unit}`,
            data: history,
            borderColor: '#4f46e5',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            fill: true,
            tension: 0.3,
            order: 1
        },
        {
            label: `Previous Forecast`,
            data: previousForecastData,
            borderColor: '#6b7280',
            borderDash: [2, 2],
            fill: false,
            tension: 0.3,
            order: 2,
            pointRadius: 3
        },
        {
            label: `Future Forecast`,
            data: futureForecastData,
            borderColor: '#f97316',
            borderDash: [5, 5],
            fill: false,
            tension: 0.3,
            order: 2,
            pointRadius: 3
        }
    ];

    if (metricData.threshold && Array.isArray(metricData.threshold)) {
        datasets.push({
            label: 'Healthy Range',
            data: Array(history.length + 3).fill(metricData.threshold[1]),
            borderColor: 'transparent',
            pointRadius: 0,
            fill: {
                target: { value: metricData.threshold[0] },
                above: 'rgba(34, 197, 94, 0.1)'
            },
            order: 3
        });
    }

    historyChartInstance = new Chart(ctx, {
        type: 'line',
        data: { labels: chartLabels, datasets: datasets },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: metricData.unit
                    }
                }
            }
        }
    });

    let analysisHTML = '';
    const forecastForThisWeek = previousForecastData ? previousForecastData[previousForecastData.length - 1] : null;
    const actualThisWeek = history[history.length - 1];

    const discrepancyAlert = getForecastDiscrepancyAnalysis(metricData);
    if (discrepancyAlert) {
        if (discrepancyAlert.isPositive) {
            analysisHTML += `
                <div class="analysis-card positive">
                    <div style="display: flex; gap: 16px;">
                        <div style="padding-top: 4px;">
                            <svg style="width: 24px; height: 24px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#22c55e">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                            </svg>
                        </div>
                        <div>
                            <p style="font-weight: bold; margin-bottom: 4px;">Positive Forecast</p>
                            <p style="margin: 0;">${discrepancyAlert.text}</p>
                        </div>
                    </div>
                </div>`;
        } else {
            analysisHTML += `
                <div class="analysis-card warning">
                    <div style="display: flex; gap: 16px;">
                        <div style="padding-top: 4px;">
                            <svg style="width: 24px; height: 24px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ef4444">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                        </div>
                        <div>
                            <p style="font-weight: bold; margin-bottom: 4px;">Forecast Alert</p>
                            <p style="margin: 0;">${discrepancyAlert.text}</p>
                        </div>
                    </div>
                </div>`;
        }
    }

    if (forecastForThisWeek !== null && actualThisWeek !== null) {
        const diff = actualThisWeek - forecastForThisWeek;
        const tolerance = forecastForThisWeek * 0.05;
        let comparisonText = '';
        if (Math.abs(diff) <= tolerance) {
            comparisonText = `which was within the predicted range.`;
        } else {
            comparisonText = `which is <strong>${Math.abs(diff).toFixed(0)} ${metricData.unit} ${diff > 0 ? 'higher' : 'lower'}</strong> than predicted.`;
        }
        analysisHTML += `
            <div class="analysis-card neutral">
                <p>We previously forecasted a value of <strong>${forecastForThisWeek.toFixed(0)}</strong> for this week. Your actual result was <strong>${actualThisWeek.toFixed(0)}</strong>, ${comparisonText}</p>
            </div>`;
    }

    const futureAlert = getForecastAnalysis(metricData);
    if (futureAlert) {
        analysisHTML += `
            <div class="analysis-card info">
                <div style="display: flex; gap: 16px;">
                    <div style="padding-top: 4px;">
                        <svg style="width: 24px; height: 24px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f59e0b">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div>
                        <p style="font-weight: bold; margin-bottom: 4px;">Future Outlook</p>
                        <p style="margin: 0;">${futureAlert}</p>
                    </div>
                </div>
            </div>`;
    }

    forecastAnalysisContainer.innerHTML = analysisHTML || '';
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == modal) closeModal();
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to all "View Details" buttons
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    viewDetailsButtons.forEach((button, index) => {
        const metricCard = button.closest('.metric-card');
        const metricTitle = metricCard.querySelector('.metric-title-group h4').textContent;
        button.addEventListener('click', () => showHistoryChart(metricTitle));
    });

    // Animate progress rings
    animateProgressRings();
});

function animateProgressRings() {
    document.querySelectorAll('.progress-bar').forEach(circle => {
        const percent = parseInt(circle.dataset.percent, 10);
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 100);
    });
}
