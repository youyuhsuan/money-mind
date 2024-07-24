"use client";

import React from "react";
import { useExpenses, useExpensesDispatch } from "@/app/utils/ExpenseContext";
import { ExpenseFormState } from "@/app/components/ExpenseForm";

export function ExpenseList() {
  const { expenses } = useExpenses();
  const dispatch = useExpensesDispatch();

  const handleDelete = (id: string) => {
    dispatch({ type: "DELETED", id });
  };

  return (
    <ul>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

interface ExpenseItemProps {
  expense: ExpenseFormState;
  onDelete: (id: string) => void;
}

function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  const amountColor = expense.type === "income" ? "green" : "red";
  return (
    <li>
      <span>{expense.description}</span>
      <span style={{ color: amountColor }}>
        {expense.type === "income" ? "+" : "-"}${expense.amount}
      </span>
      <button onClick={() => onDelete(expense.id)}>Delete</button>
    </li>
  );
}
