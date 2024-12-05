// db.js
import Dexie, { type EntityTable } from 'dexie';

interface Expense {
    id: number;
    amount: number;
    name: string;
}

interface Income {
    id: number;
    amount: number;
    name: string;
}

const db = new Dexie('FinanceDatabase') as Dexie & {
    expenses: EntityTable<Expense, 'id'>;
    incomes: EntityTable<Income, 'id'>;
};

db.version(1).stores({
    expenses: '++id, amount, name', // primary key "id" (auto-incremented), amount, and name
    incomes: '++id, amount, name', // primary key "id" (auto-incremented), amount, and name
});

export type { Expense, Income };
export { db };
