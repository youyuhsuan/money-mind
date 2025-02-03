import { TransactionFields } from "./FormType";

export type ExpenseAction =
  | { type: "ADD_EXPENSE"; expense: TransactionFields }
  | { type: "DELETE_EXPENSE"; id: string }
  | { type: "UPDATE_EXPENSE"; expense: TransactionFields }
  | { type: "RESET_FORM" };

export interface ExpenseTotals {
  totals: number;
  incomeTotal: number;
  expenseTotal: number;
}

export interface ExpenseGrowth {
  incomeMoM: number;
  expenseMoM: number;
}

export interface TimeSeriesValues {
  income: number;
  expense: number;
}

export interface TimeSeriesData {
  daily: Record<string, TimeSeriesValues>;
  weekly: Record<string, TimeSeriesValues>;
  monthly: Record<string, TimeSeriesValues>;
  yearly: Record<string, TimeSeriesValues>;
}

export interface ExpenseContextType {
  expenses: any[];
  initialState: TransactionFields;
  totals: ExpenseTotals;
  growth: ExpenseGrowth;
  timeSeriesData: TimeSeriesData;
  categoryData: Record<string, any>;
}
