import { useCallback, useEffect, useReducer, useState } from "react";
import { useExpense } from "@/store/provider/ExpenseProvider";
import { useSession } from "./useSession";

export function useTransactionManager() {
  const { dispatch } = useExpense();

  // Loading and error states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string | null>(null);
  const { sessionData } = useSession();

  const getTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/account/${sessionData?.userId}/get`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      await dispatch({
        type: "SET_EXPENSE",
        expense: data.transactions,
      });
    } catch (error) {
      setIsLoading(false);
      setErrors(error as string);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, sessionData?.userId]);

  // Function to refresh transactions
  const refreshTransactions = useCallback(() => {
    getTransactions();
  }, [getTransactions]);

  // Function to delete a transaction
  const deleteTransaction = useCallback(
    async (transactionId: string) => {
      try {
        const response = await fetch(
          `/api/account/${sessionData?.userId}/delete?transactionId=${transactionId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete transaction");
        }
        refreshTransactions();
        return { success: "Transaction deleted successfully" };
      } catch (error) {
        console.error("Error deleting transaction:", error);
        setErrors("Failed to delete transaction. Please try again.");
      }
    },
    [refreshTransactions, sessionData?.userId]
  );

  // Effect to fetch transactions on component mount
  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  // Return an object with all necessary data and functions
  return {
    isLoading,
    errors,
    refreshTransactions,
    deleteTransaction,
    dispatch,
  };
}
