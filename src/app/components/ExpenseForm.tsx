"use client";

import React, { FormEvent } from "react";

import {
  useCurrentForm,
  useExpensesDispatch,
} from "@/app/utils/ExpenseContext";
import generateUniqueId from "@/app/utils/generateUniqueId";
import { Form, Input, Button } from "@/app/components/style/Form.styled";

export interface ExpenseFormState {
  id: string;
  amount: string;
  description: string;
  type: "income" | "expense";
}

export const ExpenseForm: React.FC = function ExpenseForm() {
  const currentForm = useCurrentForm();
  const dispatch = useExpensesDispatch();

  const isFormValid =
    currentForm.amount !== "" && currentForm.description !== "";

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
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
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isFormValid) {
      const newExpense = { ...currentForm, id: generateUniqueId() };
      dispatch({ type: "ADDED", expense: newExpense });
      dispatch({ type: "RESET_FORM" });
      console.log("New expense added:", newExpense);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <select name="type" value={currentForm.type} onChange={handleInputChange}>
        <option value="income">收入</option>
        <option value="expense">支出</option>
      </select>
      <Input
        type="number"
        name="amount"
        placeholder="請輸入金額"
        value={currentForm.amount}
        onChange={handleInputChange}
        required
      />
      <Input
        type="text"
        name="description"
        placeholder="請輸入描述"
        value={currentForm.description}
        onChange={handleInputChange}
        required
      />
      <Button type="submit" disabled={!isFormValid}>
        新增紀錄
      </Button>
    </Form>
  );
};
