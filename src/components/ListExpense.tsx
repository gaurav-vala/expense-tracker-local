import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import AddIncome from "./AddIncome";
import AddExpense from "./AddExpense";

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
    <div className="sticky top-4 ">
      <div className="mt-6 overflow-hidden rounded-b-none bg-neutral-100 rounded-xl dark:bg-neutral-900">
        <div className="p-4 px-9">
          <p className="text-2xl tracking-tight text-neutral-400 noto-serif-display">
            Remaining Income
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tighter text-wrap">
            ₹{formatCurrency(remainingIncome)}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 p-4 px-9 bg-neutral-200 dark:bg-neutral-800">
          <p className="text-wrap">
            <span className="block text-xl tracking-tight text-neutral-400 noto-serif-display">
              Total Income
            </span>
            <span className="block mt-1 text-xl font-semibold tracking-tighter">
              ₹{formatCurrency(totalIncomes)}
            </span>
          </p>
          <p className="w-fit text-wrap">
            <span className="block text-xl tracking-tight text-neutral-400 noto-serif-display">
              Total Expenses
            </span>
            <span className="block mt-1 text-xl font-semibold">
              ₹{formatCurrency(totalExpenses)}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center w-full gap-4 p-2 border-t border-neutral-300 dark:border-neutral-900 bg-neutral-200 dark:bg-neutral-800 rounded-b-xl">
        <AddIncome />
        <AddExpense />
      </div>
    </div>
  );
}
