"use client";

import React from "react";
import { useExpenses, useExpensesDispatch } from "@/app/utils/ExpenseContext";
import { ExpenseFormState } from "@/app/components/ExpenseForm";

interface ExpenseItemProps {
  expense: ExpenseFormState;
  onDelete: (id: string) => void;
}

export const ExpenseList = React.memo(function ExpenseList() {
  const expenses = useExpenses();
  const dispatch = useExpensesDispatch();
  console.log("No render!!!");

  let subtotal = 0;
  expenses.forEach((expense) => {
    const amount = Number(expense.amount);
    expense.type === "income" ? (subtotal += amount) : (subtotal -= amount);
  });

  return (
    <section>
      <ul>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={() => dispatch({ type: "DELETED", id: expense.id })}
          />
        ))}
      </ul>
      <div>小計：{subtotal}</div>
    </section>
  );
});

function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  return (
    <li>
      <span>{expense.description}</span>
      <span style={{ color: expense.type === "income" ? "green" : "red" }}>
        {expense.type === "income" ? "+ " : "- "}${expense.amount}
      </span>
      <button onClick={() => onDelete(expense.id)}>Delete</button>
    </li>
  );
}
