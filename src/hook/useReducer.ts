import { initialState } from "@/config/ExpenseConfig";
import { ExpenseAction } from "@/types/ExpenseType";

export function expenseReducer(
  state: typeof initialState,
  action: ExpenseAction
) {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [action.expense],
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.id),
      };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((e) =>
          e.id === action.expense.id ? action.expense : e
        ),
      };
    case "RESET_FORM":
      return {
        ...state,
        initialState: initialState.initialState,
      };
    default:
      return state;
  }
}
