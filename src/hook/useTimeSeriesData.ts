import { CategoryData, TimeSeriesData } from "@/types/ExpenseType";
import { getISOWeek } from "@/utility/getISOWeek";
import { useMemo } from "react";

const createEmptyTimeSeriesData = (): TimeSeriesData => ({
  daily: {},
  weekly: {},
  monthly: {},
  yearly: {},
  all: {
    all: {
      total: { income: 0, expense: 0 },
    },
  },
});

export const useTimeSeriesData = (transactions: any[]) => {
  if (!transactions.length) {
    return { timeSeriesData: createEmptyTimeSeriesData() };
  }

  const timeSeriesData = createEmptyTimeSeriesData();

  const processedIds = new Set<string>();
  const uniqueTransactions = transactions.filter((transaction) => {
    if (processedIds.has(transaction.id)) {
      return false;
    }
    processedIds.add(transaction.id);
    return true;
  });
  const calculateDayTotals = () => {
    const transactionTotals = uniqueTransactions.reduce(
      (acc, transaction) => {
        const date = new Date(transaction.date);
        const dateKey = `${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()}`;
        const amount = parseFloat(transaction.amount) || 0;
        const type = transaction.type;

        if (!acc[dateKey]) {
          acc[dateKey] = {
            categories: {},
            total: { income: 0, expense: 0 },
          };
        }

        transaction.category.forEach((category: string) => {
          if (!acc[dateKey].categories[category]) {
            acc[dateKey].categories[category] = {
              income: 0,
              expense: 0,
            };
          }

          if (type === "income") {
            acc[dateKey].categories[category].income += amount;
            acc[dateKey].total.income += amount;
          } else {
            acc[dateKey].categories[category].expense += amount;
            acc[dateKey].total.expense += amount;
          }
        });
        return acc;
      },
      {} as Record<
        string,
        {
          categories: Record<string, any>;
          total: any;
        }
      >
    );

    if (uniqueTransactions.length === 0) return {};

    const dates = uniqueTransactions.map(
      (transaction) => new Date(transaction.date)
    );

    const startDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const endDate = new Date(Math.max(...dates.map((d) => d.getTime())));

    return getDatesInRange(startDate, endDate).reduce(
      (acc, date) => {
        const dateKey = `${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()}`;
        acc[dateKey] = transactionTotals[dateKey] || {
          categories: {},
          total: { income: 0, expense: 0 },
        };
        return acc;
      },
      {} as Record<
        string,
        {
          categories: Record<string, any>;
          total: any;
        }
      >
    );
  };

  // 處理每日資料
  const dailyDataArray = Object.entries(calculateDayTotals())
    .map(([date, data]) => ({
      date,
      ...data,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // 彙整各時間維度的資料
  dailyDataArray.forEach((dayData) => {
    const transactionDate = new Date(dayData.date);
    const year = transactionDate.getFullYear();
    const month = transactionDate.getMonth() + 1;
    const day = transactionDate.getDate();
    const weekNumber = getISOWeek(transactionDate);

    const dateStr = `${month}/${day}`;
    const monthStr = `${year}/${month}`;
    const weekStr = `${year}/W${weekNumber.toString().padStart(2, "0")}`;
    const yearStr = `${year}`;

    const timeframes = [
      { timeframe: "daily" as const, key: dateStr },
      { timeframe: "weekly" as const, key: weekStr },
      { timeframe: "monthly" as const, key: monthStr },
      { timeframe: "yearly" as const, key: yearStr },
    ];

    timeframes.forEach(({ timeframe, key }) => {
      if (!timeSeriesData[timeframe][key]) {
        timeSeriesData[timeframe][key] = {
          total: { income: 0, expense: 0 },
        } as CategoryData;
      }

      Object.entries(dayData.categories).forEach(([category, amounts]) => {
        if (!timeSeriesData[timeframe][key][category]) {
          timeSeriesData[timeframe][key][category] = {
            income: 0,
            expense: 0,
          };
        }

        timeSeriesData[timeframe][key][category].income += amounts.income;
        timeSeriesData[timeframe][key][category].expense += amounts.expense;
        timeSeriesData[timeframe][key].total.income += amounts.income;
        timeSeriesData[timeframe][key].total.expense += amounts.expense;
      });
    });

    // 更新總計資料
    Object.entries(dayData.categories).forEach(([category, amounts]) => {
      if (!timeSeriesData.all.all[category]) {
        timeSeriesData.all.all[category] = { income: 0, expense: 0 };
      }
      timeSeriesData.all.all[category].income += amounts.income;
      timeSeriesData.all.all[category].expense += amounts.expense;
      timeSeriesData.all.all.total.income += amounts.income;
      timeSeriesData.all.all.total.expense += amounts.expense;
    });
  });

  return { timeSeriesData };
};

// 輔助函數：取得日期範圍
const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};
