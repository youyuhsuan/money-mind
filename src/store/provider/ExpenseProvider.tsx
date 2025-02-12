"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

//  Type
import type {
  CategoryData,
  ExpenseAction,
  ExpenseContextType,
  ExpenseContextValue,
  TimeSeriesData,
} from "@/types/ExpenseType";

import { initialState } from "@/config/ExpenseConfig";

// Hook
import { useTimeSeriesData } from "@/hook/useTimeSeriesData";
import { useDataFiltering } from "@/hook/useDataFiltering";
import { useFinancialCalculations } from "@/hook/useFinancialCalculations";
import { expenseReducer } from "@/hook/useReducer";

const ExpenseContext = createContext<{
  state: ExpenseContextType;
  dispatch: React.Dispatch<ExpenseAction>;
} | null>(null);

function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer<React.Reducer<any, ExpenseAction>>(
    expenseReducer,
    initialState
  );

  // Potential dependency issue: This hook depends on state.expenses
  const { timeSeriesData } = useTimeSeriesData(state.expenses);

  // Potential dependency issue: This hook depends on timeSeriesData
  const { getFilteredData, getPreviousPeriodData } =
    useDataFiltering(timeSeriesData);

  // Potential dependency issue: This hook depends on multiple derived states
  const {
    calculateTotals,
    calculateCategorys,
    calculateFinancialMetrics,
    calculateAverage,
    calculateGrowth,
  } = useFinancialCalculations(
    timeSeriesData,
    getFilteredData,
    getPreviousPeriodData
  );

  const contextValue: ExpenseContextValue = useMemo(
    () => ({
      state: {
        expenses: state.expenses,
        transactions: timeSeriesData,
        calculateTotals,
        calculateCategorys,
        calculateFinancialMetrics,
        calculateAverage,
        calculateGrowth,
        getFilteredData,
        getPreviousPeriodData,
      },
      dispatch,
    }),
    [
      state.expenses,
      timeSeriesData,
      calculateTotals,
      calculateCategorys,
      calculateFinancialMetrics,
      calculateAverage,
      calculateGrowth,
      getFilteredData,
      getPreviousPeriodData,
      dispatch,
    ]
  );

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
