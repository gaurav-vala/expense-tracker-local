import React, { useEffect, useState } from 'react';
import { db, Expense, Income } from '../lib/db';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from './ui/button';
import { Trash } from 'lucide-react';

interface CombinedItem {
    id: number;
    amount: number;
    name: string;
    date: string;
    type: 'expense' | 'income';
}

const CombinedList: React.FC = () => {
    const [combinedData, setCombinedData] = useState<CombinedItem[]>([]);

    async function deleteExpenseRecord(id: number) {
        await db.expenses.delete(id);
    }

    async function deleteIncomeRecord(id: number) {
        await db.incomes.delete(id);
    }

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString();
    };

    useEffect(() => {
        const fetchData = async () => {
            const expenses: Expense[] = await db.expenses.toArray();
            const incomes: Income[] = await db.incomes.toArray();

            const combined: CombinedItem[] = [
                ...expenses.map((expense) => ({ ...expense, type: 'expense' as 'expense' })),
                ...incomes.map((income) => ({ ...income, type: 'income' as 'income' })),
            ];

            combined.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            setCombinedData(combined);
        };

        fetchData();
    }, []);

    return (
        <div>
            <ul className='overflow-y-auto h-[490px] pb-4'>
                <AnimatePresence>
                    {combinedData.map((item) => (
                        <motion.li
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2, ease: "circInOut" }}
                            key={`${item.type}-${item.id}`}  // safer unique key
                            className="flex items-center justify-between p-4 mt-3 rounded-2xl dark:bg-neutral-900 bg-neutral-100"
                        >
                            <div className="flex items-center gap-3">
                                <p
                                    className={`inline-block p-2 border rounded-lg ${item.type === "income"
                                        ? "text-green-400 bg-green-100 border-green-400"
                                        : "text-red-400 bg-red-100 border-red-400"
                                        }`}
                                >
                                    {item.type === "income" ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="icon"
                                        >
                                            <path d="M3 17l6 -6l4 4l8 -8" />
                                            <path d="M14 7l7 0l0 7" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="icon"
                                        >
                                            <path d="M3 7l6 6l4 -4l8 8" />
                                            <path d="M14 17l7 0l0 -7" />
                                        </svg>
                                    )}
                                </p>
                                <p className="text-wrap">
                                    <span className="flex items-center w-full gap-1 text-2xl font-semibold tracking-tighter">
                                        {item.name}
                                    </span>
                                    <span
                                        className={`block text-lg font-medium ${item.type === "income" ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        ₹{formatCurrency(item.amount)}
                                    </span>
                                </p>
                            </div>

                            <Button
                                variant="secondary"
                                className={`px-4 py-4 shadow-none bg-transparent border border-neutral-200 dark:border-neutral-700 h-11 ${item.type === "income"
                                    ? "text-green-500 "
                                    : "text-red-500"
                                    }`}
                                onClick={() =>
                                    item.type === "income"
                                        ? deleteIncomeRecord(item.id)
                                        : deleteExpenseRecord(item.id)
                                }
                            >
                                <Trash />
                            </Button>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    );
};

export default CombinedList;
