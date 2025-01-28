import { ExpenseProvider } from "@/store/provider/ExpenseProvider";

// components
import Nav from "@/components/Nav";
import TransactionDashboard from "@/components/accounting/TransactionDashboard";

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
