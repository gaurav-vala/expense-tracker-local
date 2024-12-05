import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";

export default function ListExpense() {
  const expenses = useLiveQuery(() => db.expenses.toArray(), []);
  const incomes = useLiveQuery(() => db.incomes.toArray(), []);

  const totalExpenses =
    expenses?.reduce((total, expense) => total + expense.amount, 0) || 0;
  const totalIncomes =
    incomes?.reduce((total, income) => total + income.amount, 0) || 0;
  const remainingIncome = totalIncomes - totalExpenses;

  // Format the amount as currency (with commas)
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(); // Adds commas for thousands
  };

  return (
    <>
      <div className="border border-neutral-200 rounded-lg p-4 mt-4 sticky top-4 bg-white dark:bg-neutral-900 dark:border-neutral-600">
        <p className="text-xl ">
          <span className="font-bold tracking-tight">Total Expenses: </span>
          <span className=""> ₹{formatCurrency(totalExpenses)}</span>
        </p>
        <p className="text-xl ">
          <span className="font-bold tracking-tight">Total Incomes:</span>{" "}
          <span className=""> ₹{formatCurrency(totalIncomes)}</span>
        </p>
        <p className="text-xl">
          <span className="font-bold tracking-tight">Remaining Income:</span> ₹
          {formatCurrency(remainingIncome)}
        </p>
      </div>
    </>
  );
}
