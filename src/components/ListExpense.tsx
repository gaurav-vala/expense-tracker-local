
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

  return (
    <>
      <div className="border border-neutral-200 rounded-lg p-4 mt-4 sticky top-4 bg-white dark:bg-neutral-900 dark:border-neutral-600">
        <p className="text-xl">Total Expenses: {totalExpenses}</p>
        <p className="text-xl">Total Incomes: {totalIncomes}</p>
        <p className="text-xl">Remaining Income: {remainingIncome}</p>
      </div>
    </>
  );
}
