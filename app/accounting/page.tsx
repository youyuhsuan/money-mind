// components
import Nav from "@/components/Nav";
import TransactionDashboard from "@/components/accounting/TransactionDashboard";
import { ExpenseProvider } from "@/store/provider/ExpenseProvider";

export default function Page() {
  return (
    <>
      <Nav />
      <ExpenseProvider>
        <TransactionDashboard />
      </ExpenseProvider>
    </>
  );
}
