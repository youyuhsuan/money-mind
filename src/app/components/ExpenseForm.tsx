"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useExpenses, useExpensesDispatch } from "@/app/utils/ExpenseContext";

export interface ExpenseFormState {
  id: string;
  amount: string;
  description: string;
  type: "income" | "expense";
}

function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function ExpenseForm() {
  const { currentForm } = useExpenses();
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useExpensesDispatch();

  useEffect(() => {
    const isFormComplete =
      currentForm.amount !== "" && currentForm.description !== "";
    setIsFormValid(isFormComplete);
  }, [currentForm]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid) {
      const newExpense = { ...currentForm, id: generateUniqueId() };
      dispatch({ type: "ADDED", expense: newExpense });
      dispatch({ type: "RESET_FORM" });
      console.log("New expense added:", newExpense);
    }
  };

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
}
