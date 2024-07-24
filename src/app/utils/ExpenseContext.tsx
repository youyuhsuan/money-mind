"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { ExpenseFormState } from "@/app/components/ExpenseForm";

interface Props {
  children?: ReactNode;
}

interface ExpensesState {
  expenses: ExpenseFormState[];
  currentForm: ExpenseFormState;
}

const initialState: ExpensesState = {
  currentForm: { id: "", amount: "", description: "", type: "income" },
  expenses: [],
};

export type ExpenseAction =
  | { type: "ADDED"; expense: ExpenseFormState }
  | { type: "DELETED"; id: string }
  | { type: "SET_AMOUNT"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_TYPE"; payload: "income" | "expense" }
  | { type: "RESET_FORM" };

const ExpensesContext = createContext<ExpensesState | null>(null);
const ExpensesDispatchContext =
  createContext<React.Dispatch<ExpenseAction> | null>(null);

function ExpensesProvider({ children }: { children: React.ReactNode }) {
  const [expenses, dispatch] = useReducer(expenseReducer, initialState);

  const memoizedState = useMemo(() => expenses, [expenses]);
  const memoizedDispatch = useCallback(dispatch, [dispatch]);

  return (
    <ExpensesContext.Provider value={memoizedState}>
      <ExpensesDispatchContext.Provider value={memoizedDispatch}>
        {children}
      </ExpensesDispatchContext.Provider>
    </ExpensesContext.Provider>
  );
}

function useExpenses() {
  const context = useContext(ExpensesContext);
  console.log(`useExpenses:${context}`);

  if (context === null) {
    throw new Error("useExpenses must be used within an ExpensesProvider");
  }
  return context;
}

function useExpensesDispatch() {
  const context = useContext(ExpensesDispatchContext);
  console.log(`useExpensesDispatch:${context}`);
  if (context === null) {
    throw new Error(
      "useExpensesDispatch must be used within an ExpensesProvider"
    );
  }
  return context;
}

function expenseReducer(
  state: { currentForm: ExpenseFormState; expenses: ExpenseFormState[] },
  action: ExpenseAction
): { currentForm: ExpenseFormState; expenses: ExpenseFormState[] } {
  switch (action.type) {
    case "ADDED": {
      return { ...state, expenses: [...state.expenses, action.expense] };
    }
    case "DELETED": {
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.id),
      };
    }
    case "SET_AMOUNT":
      return {
        ...state,
        currentForm: { ...state.currentForm, amount: action.payload },
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        currentForm: { ...state.currentForm, description: action.payload },
      };
    case "SET_TYPE":
      return {
        ...state,
        currentForm: { ...state.currentForm, type: action.payload },
      };
    case "RESET_FORM":
      return {
        ...state,
        currentForm: { id: "", amount: "", description: "", type: "income" },
      };
    default: {
      throw new Error("Unknown action: " + (action as any).type);
    }
  }
}

export { ExpensesProvider, useExpenses, useExpensesDispatch };
