import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../lib/db";

export default function QueryExpense() {
  const expenses = useLiveQuery(() => db.expenses.toArray(), []);
  const incomes = useLiveQuery(() => db.incomes.toArray(), []);

  const totalExpenses =
    expenses?.reduce((total, expense) => total + expense.amount, 0) || 0;
  const totalIncomes =
    incomes?.reduce((total, income) => total + income.amount, 0) || 0;
  const remainingIncome = totalIncomes - totalExpenses;

  return (
    <>
      <ul>
        {expenses?.map((expense) => (
          <li key={expense.id}>
            {expense.name}, {expense.amount}
          </li>
        ))}
      </ul>
      <ul>
        {incomes?.map((income) => (
          <li key={income.id}>
            {income.name}, {income.amount}
          </li>
        ))}
      </ul>
      <p>Total Expenses: {totalExpenses}</p>
      <p>Total Incomes: {totalIncomes}</p>
      <p>Remaining Income: {remainingIncome}</p>
    </>
  );
}
