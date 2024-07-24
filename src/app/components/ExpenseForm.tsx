"use client";

import React, { FormEvent, useMemo, useCallback } from "react";
import { useExpenses, useExpensesDispatch } from "@/app/utils/ExpenseContext";

export interface ExpenseFormState {
  id: string;
  amount: string;
  description: string;
  type: "income" | "expense";
}

function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36);
}

export const ExpenseForm: React.FC = React.memo(function ExpenseForm() {
  const { currentForm } = useExpenses();
  const dispatch = useExpensesDispatch();

  const isFormValid = useMemo(() => {
    return currentForm.amount !== "" && currentForm.description !== "";
  }, [currentForm.amount, currentForm.description]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      switch (name) {
        case "amount":
          dispatch({ type: "SET_AMOUNT", payload: value });
          break;
        case "description":
          dispatch({ type: "SET_DESCRIPTION", payload: value });
          break;
        case "type":
          dispatch({
            type: "SET_TYPE",
            payload: value as "income" | "expense",
          });
          break;
      }
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isFormValid) {
        const newExpense = { ...currentForm, id: generateUniqueId() };
        dispatch({ type: "ADDED", expense: newExpense });
        dispatch({ type: "RESET_FORM" });
        console.log("New expense added:", newExpense);
      }
    },
    [currentForm, isFormValid, dispatch]
  );

  return (
    <form onSubmit={handleSubmit}>
      <select name="type" value={currentForm.type} onChange={handleInputChange}>
        <option value="income">收入</option>
        <option value="expense">支出</option>
      </select>
      <input
        type="number"
        name="amount"
        placeholder="請輸入金額"
        value={currentForm.amount}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="請輸入描述"
        value={currentForm.description}
        onChange={handleInputChange}
        required
      />
      <button type="submit" disabled={!isFormValid}>
        新增紀錄
      </button>
    </form>
  );
});
