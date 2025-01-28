import { useCallback, useEffect, useState } from "react";
import { useExpense } from "@/store/provider/ExpenseProvider";

export function useTransactionManager() {
  const { dispatch } = useExpense();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string | null>(null);

  const getTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/account/get", {
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
      await dispatch({ type: "ADD_EXPENSE", expense: data });
    } catch (error) {
      setIsLoading(false);
      setErrors(error as string);
      error instanceof Error ? error.message : "An unknown error occurred";
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const refreshTransactions = useCallback(() => {
    getTransactions();
  }, [getTransactions]);

  const deleteTransaction = useCallback(
    async (transactionId: string) => {
      try {
        const response = await fetch(
          `/api/account/delete?transactionId=${transactionId}`,
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
    [refreshTransactions]
  );

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return {
    isLoading,
    errors,
    refreshTransactions,
    deleteTransaction,
  };
}
