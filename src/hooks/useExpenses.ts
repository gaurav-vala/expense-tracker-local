// src/hooks/useExpenses.ts
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

type Expense = {
  id?: number;
  name: string;
  amount: number;
  type: string;
};

export const useExpenses = (): Expense[] | undefined => {
  return useLiveQuery(() => db.expenses.toArray(), []);
};
