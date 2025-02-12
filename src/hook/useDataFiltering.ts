import { TimeSeriesData } from "@/types/ExpenseType";
import { getISOWeek } from "@/utility/getISOWeek";
import { useCallback } from "react";

export const useDataFiltering = (timeSeriesData: Record<string, any>) => {
  const getRelativeDate = (
    currentDate: Date,
    offset: number,
    unit: "day" | "week" | "month" | "year"
  ) => {
    const date = new Date(currentDate);

    switch (unit) {
      case "day":
        date.setDate(date.getDate() + offset);
        break;
      case "week":
        date.setDate(date.getDate() + offset * 7);
        break;
      case "month":
        date.setMonth(date.getMonth() + offset);
        break;
      case "year":
        date.setFullYear(date.getFullYear() + offset);
        break;
    }

    return date;
  };

  const getFilteredData = useCallback(
    (timeframe: keyof TimeSeriesData, date: Date) => {
      const getComparisonKey = (targetDate: Date) => {
        switch (timeframe) {
          case "daily":
            return `${targetDate.getMonth() + 1}/${targetDate.getDate()}`;
          case "weekly": {
            const weekNumber = getISOWeek(targetDate);
            return `${targetDate.getFullYear()}/W${weekNumber
              .toString()
              .padStart(2, "0")}`;
          }
          case "monthly":
            return `${targetDate.getFullYear()}/${targetDate.getMonth() + 1}`;
          case "yearly":
            return `${targetDate.getFullYear()}`;
          case "all":
            return "all";
          default:
            return "";
        }
      };

      const comparisonKey = getComparisonKey(date);
      const timeframeData = timeSeriesData[timeframe];

      const filteredData = Object.entries(timeframeData)
        .filter(([key]) => {
          if (timeframe === "all") return true;
          return key === comparisonKey;
        })
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {} as Record<string, any>);

      return filteredData;
    },
    [timeSeriesData]
  );

  // 取得前一期間的資料
  const getPreviousPeriodData = useCallback(
    (timeframe: keyof TimeSeriesData, currentDate: Date) => {
      let previousDate;

      switch (timeframe) {
        case "daily":
          previousDate = getRelativeDate(currentDate, -1, "day");
          break;
        case "weekly":
          previousDate = getRelativeDate(currentDate, -1, "week");
          break;
        case "monthly":
          previousDate = getRelativeDate(currentDate, -1, "month");
          break;
        case "yearly":
          previousDate = getRelativeDate(currentDate, -1, "year");
          break;
        default:
          previousDate = currentDate;
      }

      return getFilteredData(timeframe, previousDate);
    },
    [getFilteredData]
  );

  return { getFilteredData, getPreviousPeriodData };
};
