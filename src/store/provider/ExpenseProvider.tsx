"use client";

import { createContext, useCallback, useContext, useReducer } from "react";
import { initialState } from "@/config/ExpenseConfig";
import { expenseReducer } from "@/hook/useReducer";
import type {
  ExpenseAction,
  ExpenseContextType,
  TimeSeriesValues,
} from "@/types/ExpenseType";

const ExpenseContext = createContext<{
  state: ExpenseContextType;
  dispatch: React.Dispatch<ExpenseAction>;
} | null>(null);

function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const { expenses } = state;

  const calculateTotals = useCallback(() => {
    return expenses.reduce(
      (totals, expense) => {
        const transactions = expense.transactions || [];
        transactions.forEach(
          (transaction: { amount: string; type: string }) => {
            const amount = parseFloat(transaction.amount) || 0;
            totals.totals += amount;
            if (transaction.type === "expense") {
              totals.expenseTotal += amount;
            } else {
              totals.incomeTotal += amount;
            }
          }
        );
        return totals;
      },
      { totals: 0, incomeTotal: 0, expenseTotal: 0 }
    );
  }, [expenses]);

  const calculateGrowth = useCallback(() => {
    const grouped = expenses
      .flatMap((expense) => expense.transactions || [])
      .reduce((groups, transaction) => {
        const date = new Date(transaction.date);
        const monthKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;

        if (!groups[monthKey]) {
          groups[monthKey] = { income: 0, expense: 0 };
        }

        const amount = Number.parseFloat(transaction.amount);
        if (transaction.type) {
          groups[monthKey][transaction.type] += amount;
        }

        return groups;
      }, {} as Record<string, { income: number; expense: number }>);

    const currentDate = new Date();
    const currentKey = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;
    const lastMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    const lastMonthKey = `${lastMonthDate.getFullYear()}-${String(
      lastMonthDate.getMonth() + 1
    ).padStart(2, "0")}`;

    const currentMonth = grouped[currentKey] || { income: 0, expense: 0 };
    const lastMonth = grouped[lastMonthKey] || { income: 0, expense: 0 };

    const incomeMoM =
      lastMonth.income === 0
        ? 0
        : ((currentMonth.income - lastMonth.income) / lastMonth.income) * 100;
    const expenseMoM =
      lastMonth.expense === 0
        ? 0
        : ((currentMonth.expense - lastMonth.expense) / lastMonth.expense) *
          100;

    return {
      incomeMoM: Number.isFinite(incomeMoM) ? incomeMoM : 0,
      expenseMoM: Number.isFinite(expenseMoM) ? expenseMoM : 0,
    };
  }, [expenses]);

  const calculateTimeSeries = useCallback(() => {
    const dates = {
      daily: Array.from({ length: 1 }, () => {
        const today = new Date();
        return `${today.getDate()}`;
      }),
      weekly: Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }),
      monthly: Array.from({ length: 4 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (21 - i * 7));
        const weekEnd = new Date(date);
        const weekStart = new Date(date);
        weekStart.setDate(weekEnd.getDate() - 6);
        return `${weekStart.getMonth() + 1}/${weekStart.getDate()} - ${
          weekEnd.getMonth() + 1
        }/${weekEnd.getDate()}`;
      }),
      yearly: Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (5 - i));
        return `${String(date.getMonth() + 1).padStart(2, "0")}`;
      }),
    };

    const timeSeriesData = {
      daily: dates.daily.reduce((acc, date) => {
        acc[date] = { income: 0, expense: 0 };
        return acc;
      }, {} as Record<string, TimeSeriesValues>),
      weekly: dates.weekly.reduce((acc, date) => {
        acc[date] = { income: 0, expense: 0 };
        return acc;
      }, {} as Record<string, TimeSeriesValues>),
      monthly: dates.monthly.reduce((acc, week) => {
        acc[week] = { income: 0, expense: 0 };
        return acc;
      }, {} as Record<string, TimeSeriesValues>),
      yearly: dates.yearly.reduce((acc, month) => {
        acc[month] = { income: 0, expense: 0 };
        return acc;
      }, {} as Record<string, TimeSeriesValues>),
    };

    expenses.forEach((expense) => {
      expense.transactions.forEach((transaction: any) => {
        const transactionDate = new Date(transaction.date);
        const month = transactionDate.getMonth() + 1;
        const day = transactionDate.getDate();

        const dateStr = `${day}`;
        const weekStr = `${month}/${day}`;

        // Find matching monthly range
        const monthStr =
          dates.monthly.find((range) => {
            const [start, end] = range.split(" - ");
            const [startMonth, startDay] = start.split("/").map(Number);
            const [endMonth, endDay] = end.split("/").map(Number);

            return month === startMonth && day >= startDay && day <= endDay;
          }) || "";

        const yearStr = `${String(month).padStart(2, "0")}`;

        const amount = parseFloat(transaction.amount) || 0;
        const type = transaction.type === "income" ? "income" : "expense";

        if (timeSeriesData.daily[dateStr])
          timeSeriesData.daily[dateStr][type] += amount;
        if (timeSeriesData.weekly[weekStr])
          timeSeriesData.weekly[weekStr][type] += amount;
        if (timeSeriesData.monthly[monthStr])
          timeSeriesData.monthly[monthStr][type] += amount;
        if (timeSeriesData.yearly[yearStr])
          timeSeriesData.yearly[yearStr][type] += amount;
      });
    });

    return timeSeriesData;
  }, [expenses]);

  const calculateCategory = useCallback(() => {
    const categoryTotals: Record<string, number> = {};

    expenses.forEach((expense) => {
      expense.transactions.forEach(
        (transaction: { type: string; amount: string; category: string[] }) => {
          const amount = parseFloat(transaction.amount) || 0;

          transaction.category.forEach((cat: string) => {
            if (transaction.type === "income") {
              categoryTotals[cat] = (categoryTotals[cat] || 0) + amount;
            } else {
              categoryTotals[cat] = (categoryTotals[cat] || 0) - amount;
            }
          });
        }
      );
    });
    return categoryTotals;
  }, [expenses]);

  const contextValue = {
    state: {
      expenses: state.expenses,
      initialState: state.initialState,
      totals: calculateTotals(),
      growth: calculateGrowth(),
      timeSeriesData: calculateTimeSeries(),
      categoryData: calculateCategory(),
    },
    dispatch,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
}

function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
}

export { ExpenseProvider, useExpense, ExpenseContext };
