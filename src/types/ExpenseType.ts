import { TransactionFields } from "./FormType";

export type ExpenseAction =
  | { type: "SET_EXPENSE"; expense: TransactionFields }
  | { type: "ADD_EXPENSE"; expense: TransactionFields }
  | { type: "DELETE_EXPENSE"; id: string }
  | { type: "UPDATE_EXPENSE"; expense: TransactionFields }
  | { type: "RESET_FORM" };

export interface TimeSeriesValues {
  income: number;
  expense: number;
}

export interface CategoryData {
  [category: string]: TimeSeriesValues;
  total: TimeSeriesValues;
}

export interface TimeSeriesData {
  daily: Record<string, CategoryData>;
  weekly: Record<string, CategoryData>;
  monthly: Record<string, CategoryData>;
  yearly: Record<string, CategoryData>;
  all: Record<string, CategoryData>;
}

export interface ExpenseContextType {
  expenses: any[];
  transactions: any;
  calculateTotals: (timeframe: keyof TimeSeriesData) => any;
  calculateCategorys: (timeframe: keyof TimeSeriesData) => {
    categories: {
      category: string;
      income: any;
      expense: any;
      saving: any;
      incomePercentage: number;
      expensePercentage: number;
    }[];
    summary: any;
  };
  calculateFinancialMetrics: (timeframe: keyof TimeSeriesData) => any;
  calculateAverage: (timeframe: keyof TimeSeriesData) => any;
  calculateGrowth: (timeframe: keyof TimeSeriesData) => any;
  getFilteredData: (
    timeframe: keyof TimeSeriesData,
    date: Date
  ) => Record<string, any>;
  getPreviousPeriodData: (
    timeframe: keyof TimeSeriesData,
    currentDate: Date
  ) => Record<string, any>;
}
export interface ExpenseContextValue {
  state: ExpenseContextType;
  dispatch: React.Dispatch<ExpenseAction>;
}

export type TransactionType = "income" | "expense";
