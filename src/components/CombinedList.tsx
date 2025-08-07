import React, { useEffect, useState, useCallback } from 'react';
import { db, Expense, Income } from '../lib/db';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from './ui/button';
import { Trash, AlertCircle, Calendar } from 'lucide-react';

interface CombinedItem {
    id: number;
    amount: number;
    name: string;
    date: string;
    type: 'expense' | 'income';
}

interface DataListingProps {
    onDataChange?: () => void;
}

const DataListing: React.FC<DataListingProps> = ({ onDataChange }) => {
    const [combinedData, setCombinedData] = useState<CombinedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingItems, setDeletingItems] = useState<Set<string>>(new Set());

    const fetchData = useCallback(async () => {
        try {
            setError(null);
            const [expenses, incomes] = await Promise.all([
                db.expenses.toArray(),
                db.incomes.toArray()
            ]);

            const combined: CombinedItem[] = [
                ...expenses.map((expense) => ({ ...expense, type: 'expense' as const })),
                ...incomes.map((income) => ({ ...income, type: 'income' as const })),
            ];

            // Sort by date (newest first)
            combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            setCombinedData(combined);
        } catch (err) {
            setError('Failed to load data. Please try again.');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = async (item: CombinedItem) => {
        const itemKey = `${item.type}-${item.id}`;

        if (deletingItems.has(itemKey)) return; // Prevent double deletion

        setDeletingItems(prev => new Set(prev).add(itemKey));

        try {
            if (item.type === 'income') {
                await db.incomes.delete(item.id);
            } else {
                await db.expenses.delete(item.id);
            }

            // Update local state immediately for better UX
            setCombinedData(prev => prev.filter(i =>
                !(i.type === item.type && i.id === item.id)
            ));

            // Notify parent component if callback provided
            onDataChange?.();

        } catch (err) {
            setError(`Failed to delete ${item.type}. Please try again.`);
            console.error(`Error deleting ${item.type}:`, err);
        } finally {
            setDeletingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(itemKey);
                return newSet;
            });
        }
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;

        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short'
        });
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[490px]">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Loading transactions...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-[490px]">
                <div className="flex flex-col items-center gap-3 text-center">
                    <AlertCircle className="w-12 h-12 text-red-500" />
                    <div>
                        <p className="font-medium text-red-600 dark:text-red-400">{error}</p>
                        <Button
                            onClick={() => {
                                setLoading(true);
                                fetchData();
                            }}
                            className="mt-2"
                            variant="outline"
                        >
                            Retry
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (combinedData.length === 0) {
        return (
            <div className="flex items-center justify-center h-[490px]">
                <div className="flex flex-col items-center gap-2 text-center">
                    <Calendar className="w-12 h-12 text-neutral-400" />
                    <div>
                        <p className="font-medium text-neutral-600 dark:text-neutral-400">No transactions yet</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-500">Add your first income or expense to get started</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="relative pb-4 list-none scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 -z-0">
                <AnimatePresence mode="popLayout">
                    {combinedData.map((item) => {
                        const itemKey = `${item.type}-${item.id}`;
                        const isDeleting = deletingItems.has(itemKey);

                        return (
                            <motion.li
                                layout
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                    layout: { duration: 0.2 }
                                }}
                                key={itemKey}
                                className="relative group"
                            >
                                <div className={`flex items-center justify-between p-4 mt-3 rounded-2xl 
                                    dark:bg-neutral-900 bg-neutral-100 border border-transparent
                                    hover:border-neutral-200 dark:hover:border-neutral-700
                                    transition-all duration-200
                                    ${isDeleting ? 'opacity-50 pointer-events-none' : ''}
                                `}>
                                    <div className="flex items-center flex-1 min-w-0 gap-3">
                                        <div
                                            className={`flex-shrink-0 p-2 border rounded-xl transition-colors duration-200 ${item.type === "income"
                                                ? "text-green-500 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                                                : "text-red-500 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
                                                }`}
                                        >
                                            {item.type === "income" ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="transition-transform duration-200 group-hover:scale-110"
                                                >
                                                    <path d="M3 17l6 -6l4 4l8 -8" />
                                                    <path d="M14 7l7 0l0 7" />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="transition-transform duration-200 group-hover:scale-110"
                                                >
                                                    <path d="M3 7l6 6l4 -4l8 8" />
                                                    <path d="M14 17l7 0l0 -7" />
                                                </svg>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-semibold tracking-tight truncate text-neutral-900 dark:text-neutral-100">
                                                    {item.name}
                                                </h3>
                                                {/* <span className="flex-shrink-0 ml-2 text-xs text-neutral-500 dark:text-neutral-400">
                                                    {formatDate(item.date)}
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2.5'>
                                        <p
                                            className={`text-lg font-semibold ${item.type === "income"
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-red-600 dark:text-red-400"
                                                }`}
                                        >
                                            {item.type === "expense" ? "-" : "+"}{formatCurrency(item.amount)}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={`ml-3 p-2 h-10 w-10 rounded-xl border transition-all duration-200 bg-transparent border-neutral-200 dark:border-neutral-700 
                                            hover:bg-red-50 dark:hover:bg-red-950
                                            hover:border-red-300 dark:hover:border-red-800
                                            text-neutral-500 hover:text-red-500
                                            ${isDeleting ? 'cursor-not-allowed' : 'cursor-pointer'}
                                        `}
                                            onClick={() => handleDelete(item)}
                                            disabled={isDeleting}
                                            title={`Delete ${item.name}`}
                                        >
                                            {isDeleting ? (
                                                <div className="w-4 h-4 border-b-2 border-red-500 rounded-full animate-spin"></div>
                                            ) : (
                                                <Trash size={16} />
                                            )}
                                        </Button>
                                    </div>

                                </div>
                            </motion.li>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Scroll gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none bg-gradient-to-t from-white dark:from-neutral-950 to-transparent" />
        </div>
    );
};

export default DataListing;