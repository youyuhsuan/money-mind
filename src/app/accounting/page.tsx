import Link from "next/link";
import { ExpensesProvider } from "@/app/utils/ExpenseContext";
import { ExpenseForm } from "@/app/components/ExpenseForm";
import { ExpenseList } from "@/app/components/List";

export default async function Page() {
  return (
    <main>
      <ExpensesProvider>
        <ExpenseForm />
        <ExpenseList />
      </ExpensesProvider>
      <Link href="/">返回首頁</Link>
    </main>
  );
}
