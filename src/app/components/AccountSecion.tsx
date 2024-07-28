"use client";

import { AccountForm } from "@/app/components/AccountForm";
import {
  TransactionsList,
  useTransactions,
} from "@/app/components/TransactionsList";

export default function AccountSection() {
  const {
    transactions,
    isLoading,
    error,
    refreshTransactions,
    deleteTransaction,
  } = useTransactions();

  return (
    <>
      <AccountForm refreshTransactions={refreshTransactions} />
      <TransactionsList
        transactions={transactions}
        isLoading={isLoading}
        error={error}
        onDelete={deleteTransaction}
      />
    </>
  );
}
