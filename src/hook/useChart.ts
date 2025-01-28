import { useExpense } from "@/store/provider/ExpenseProvider";
import { TimeSeriesData } from "@/types/ExpenseType";
import { ChartOptions } from "chart.js";

export function useChart() {
  const { state } = useExpense();
  const { totals, timeSeriesData, categoryData } = state;

  // Doughnut Daily Data
  const dailyDoughnutData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: Object.values(timeSeriesData.daily).reduce(
          (acc, curr) => {
            return [acc[0] + curr.income, acc[1] + curr.expense];
          },
          [0, 0]
        ),
        backgroundColor: [
          "rgba(99, 179, 237, 0.8)",
          "rgba(247, 103, 103, 0.8)",
        ],
        borderColor: ["rgb(99, 179, 237)", "rgb(247, 103, 103)"],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const dailyDoughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1a202c",
        bodyColor: "#4a5568",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            const value = context.raw as number;
            return `${context.label}: $${value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          },
        },
      },
    },
  };

  // Category
  // Doughnut category data
  const categoryDoughnutData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Category Expenses",
        data: Object.values(categoryData).map(Math.abs),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const categoryDoughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1a202c",
        bodyColor: "#4a5568",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            const value = context.raw as number;
            return `${context.dataset.label}: $${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  // Line Chart Data
  const lineData = (timeframe: keyof TimeSeriesData) => {
    const data = timeSeriesData[timeframe];
    return {
      labels: Object.keys(data),
      datasets: [
        {
          label: "Income",
          data: Object.values(data).map((d) => d.income),
          borderColor: "rgb(99, 179, 237)",
          backgroundColor: "rgba(99, 179, 237, 0.1)",
          tension: 0.3,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Expense",
          data: Object.values(data).map((d) => d.expense),
          borderColor: "rgb(247, 103, 103)",
          backgroundColor: "rgba(247, 103, 103, 0.1)",
          tension: 0.3,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  };

  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1a202c",
        bodyColor: "#4a5568",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            const value = context.raw as number;
            return `${context.dataset.label}: $${value.toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(226, 232, 240, 0.6)",
        },
        ticks: {
          callback: function (value) {
            if (typeof value === "number") {
              return `$${value.toLocaleString()}`;
            }
            return value;
          },
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
    },
  };

  return {
    dailyDoughnutData,
    dailyDoughnutOptions,
    categoryDoughnutData,
    categoryDoughnutOptions,
    lineData,
    lineOptions,
  };
}
