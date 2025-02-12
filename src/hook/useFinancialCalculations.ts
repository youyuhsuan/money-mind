import { TimeSeriesData } from "@/types/ExpenseType";
import { useCallback } from "react";

export const useFinancialCalculations = (
  timeSeriesData: Record<string, any>,
  getFilteredData: (
    timeframe: keyof TimeSeriesData,
    currentDate: Date
  ) => Record<string, any>,
  getPreviousPeriodData: (
    timeframe: keyof TimeSeriesData,
    currentDate: Date
  ) => Record<string, any>
) => {
  const calculateTotals = useCallback(
    (timeframe: keyof TimeSeriesData) => {
      const currentDate = new Date();
      const filteredData = getFilteredData(timeframe, currentDate);
      const result = Object.values(filteredData).reduce(
        (totals, periodData: any) => {
          if (periodData?.total) {
            const income = Number(periodData.total.income) || 0;
            const expense = Number(periodData.total.expense) || 0;

            totals.income += income;
            totals.expense += expense;
            totals.totals =
              timeSeriesData.all.all.total.income -
              timeSeriesData.all.all.total.expense;
          }
          return totals;
        },
        {
          totals: 0,
          income: 0,
          expense: 0,
        }
      );

      return result;
    },
    [getFilteredData, timeSeriesData]
  );

  const calculateCategorys = useCallback(
    (timeframe: keyof TimeSeriesData) => {
      const currentDate = new Date();
      const filteredData = getFilteredData(timeframe, currentDate);

      const categoryTotals = Object.values(filteredData).reduce(
        (totals, periodData: any) => {
          Object.entries(periodData).forEach(
            ([category, data]: [string, any]) => {
              if (category !== "total") {
                if (!totals[category]) {
                  totals[category] = {
                    income: 0,
                    expense: 0,
                    saving: 0,
                  };
                }

                totals[category].income += Number(data.income) || 0;
                totals[category].expense += Number(data.expense) || 0;
                totals[category].saving =
                  totals[category].income - totals[category].expense;
              }
            }
          );
          return totals;
        },
        {} as Record<string, any>
      );

      // 計算百分比和排序
      const totalIncome: number = Object.values(categoryTotals).reduce(
        (sum, cat: any) => sum + cat.income,
        0
      ) as number;

      const totalExpense: number = Object.values(categoryTotals).reduce(
        (sum, cat: any) => sum + cat.expense,
        0
      ) as number;

      const categoriesWithPercentage = Object.entries(categoryTotals).map(
        ([category, data]: [string, any]) => ({
          category,
          income: data.income,
          expense: data.expense,
          saving: data.saving,
          incomePercentage: totalIncome ? (data.income / totalIncome) * 100 : 0,
          expensePercentage: totalExpense
            ? (data.expense / totalExpense) * 100
            : 0,
        })
      );

      const sortedCategories = categoriesWithPercentage.sort((a, b) => {
        if (b.expense !== a.expense) {
          return b.expense - a.expense;
        }
        return b.income - a.income;
      });

      return {
        categories: sortedCategories,
        summary: {
          totalIncome,
          totalExpense,
          netTotal: totalExpense - totalIncome,
        },
      };
    },
    [getFilteredData]
  );

  const calculateFinancialMetrics = useCallback(
    (timeframe: keyof TimeSeriesData) => {
      const totals = calculateTotals(timeframe);
      const netIncome = totals.income - totals.expense;
      const profitMargin =
        totals.income !== 0 ? (netIncome / totals.income) * 100 : 0;

      return {
        netIncome,
        profitMargin,
        isProfit: netIncome >= 0,
      };
    },
    [calculateTotals]
  );

  const calculateAverage = useCallback(
    (timeframe: keyof TimeSeriesData) => {
      const currentDate = new Date();
      const filteredData = getFilteredData(timeframe, currentDate);
      const totals = calculateTotals(timeframe);
      const periodCount = Object.keys(filteredData).length;

      if (periodCount === 0) {
        return {
          income: 0,
          expense: 0,
          balance: 0,
        };
      }

      return {
        income: totals.income / periodCount,
        expense: totals.expense / periodCount,
        balance: (totals.income - totals.expense) / periodCount,
      };
    },
    [calculateTotals, getFilteredData]
  );

  const calculateGrowth = useCallback(
    (timeframe: keyof TimeSeriesData) => {
      const currentDate = new Date();

      // 獲取當前和前一期的資料
      const currentPeriodData = getFilteredData(timeframe, currentDate);
      const previousPeriodData = getPreviousPeriodData(timeframe, currentDate);

      // 取得當前期間的收入和支出
      const currentTotals = Object.values(currentPeriodData).reduce(
        (acc, data: any) => {
          if (data?.total) {
            acc.income += Number(data.total.income) || 0;
            acc.expense += Number(data.total.expense) || 0;
          }
          return acc;
        },
        { income: 0, expense: 0 }
      );

      // 取得前一期間的收入和支出
      const previousTotals = Object.values(previousPeriodData).reduce(
        (acc, data: any) => {
          if (data?.total) {
            acc.income += Number(data.total.income) || 0;
            acc.expense += Number(data.total.expense) || 0;
          }
          return acc;
        },
        { income: 0, expense: 0 }
      );

      // 計算成長率
      const incomeGrowth =
        previousTotals.income === 0
          ? 0
          : ((currentTotals.income - previousTotals.income) /
              previousTotals.income) *
            100;

      const expenseGrowth =
        previousTotals.expense === 0
          ? 0
          : ((currentTotals.expense - previousTotals.expense) /
              previousTotals.expense) *
            100;

      const result = {
        income: Number.isFinite(incomeGrowth) ? Number(incomeGrowth) : 0,
        expense: Number.isFinite(expenseGrowth) ? Number(expenseGrowth) : 0,
      };

      return result;
    },
    [getFilteredData, getPreviousPeriodData]
  );

  return {
    calculateTotals,
    calculateCategorys,
    calculateFinancialMetrics,
    calculateAverage,
    calculateGrowth,
  };
};
