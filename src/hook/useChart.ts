import { getCategoryColor } from "@/utility/getCategoryColor";
import { ChartOptions } from "chart.js";
import { useExpense } from "@/store/provider/ExpenseProvider";
import { TimeSeriesData, TimeSeriesValues } from "@/types/ExpenseType";

export function useChart() {
  const { state } = useExpense();
  const { calculateCategorys, transactions } = state;

  // Doughnut category Data
  const categoryDistributionConfig = (
    timeframe: keyof TimeSeriesData,
    type: keyof TimeSeriesValues
  ) => {
    const categoryData = calculateCategorys(timeframe).categories;
    const filteredData = categoryData.filter(
      (item: { [key: string]: any }) => item[type] > 0
    );
    const labels = filteredData.map((item: { category: any }) => item.category);
    const values = filteredData.map((item: { [x: string]: any }) => item[type]);
    const colors = labels.map((category: string) => getCategoryColor(category));

    return {
      labels: labels,
      datasets: [
        {
          label: "Category Distribution",
          data: values,
          borderColor: colors,
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    };
  };

  const categoryDistributionOptions: ChartOptions<"doughnut"> = {
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
        // titleColor: "#1a202c",
        // bodyColor: "#4a5568",
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
  const trendChartConfig = (timeframe: keyof TimeSeriesData) => {
    console.log("transactions", transactions);
    return {
      labels: Object.keys(transactions[timeframe]),
      datasets: [
        {
          label: "Income",
          data: Object.values(transactions[timeframe])
            .map((periodData: any) => periodData.total.income)
            .filter((income) => income > 0),
          borderColor: "#9ee0e1",
          backgroundColor: "#9ee0e1",
          tension: 0.3,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Expense",
          data: Object.values(transactions[timeframe])
            .map((periodData: any) => periodData.total.expense)
            .filter((expense) => expense > 0),
          borderColor: "#748bd4",
          backgroundColor: "#748bd4",
          tension: 0.3,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  };

  const trendChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          boxWidth: 8,
          boxHeight: 8,
          font: {
            size: 12,
            family: "'quicksand', sans-serif",
          },
        },
      },
      tooltip: {
        titleColor: "#171407",
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
            family: "'quicksand', sans-serif",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e5e5",
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
            family: "'quicksand', sans-serif",
          },
        },
      },
    },
  };

  return {
    categoryDistributionConfig,
    categoryDistributionOptions,
    trendChartConfig,
    trendChartOptions,
  };
}
