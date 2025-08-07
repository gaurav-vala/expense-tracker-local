import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo, useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Wallet, Target, AlertCircle, ChevronUp, ChevronDown, Calendar, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AddIncome from "./AddIncome";
import AddExpense from "./AddExpense";

interface FinancialStats {
  totalIncomes: number;
  totalExpenses: number;
  remainingIncome: number;
  savingsRate: number;
  expenseRatio: number;
  isHealthy: boolean;
}

interface MonthlyData {
  month: string;
  year: number;
  income: number;
  expense: number;
  savings: number;
  monthKey: string;
}

interface MonthlyPeriod {
  key: string;
  display: string;
  year: number;
  month: number;
  isCurrentMonth: boolean;
}

// Utility function to get month key (YYYY-MM format)
const getMonthKey = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

// Utility function to get current month period
const getCurrentMonthPeriod = (): MonthlyPeriod => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  return {
    key: getMonthKey(now),
    display: now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
    year,
    month,
    isCurrentMonth: true
  };
};

// Utility function to get available months from data
const getAvailableMonths = (expenses: any[], incomes: any[]): MonthlyPeriod[] => {
  const monthsSet = new Set<string>();
  const currentMonth = getCurrentMonthPeriod();

  // Add current month always
  monthsSet.add(currentMonth.key);

  // Add months from existing data
  [...expenses, ...incomes].forEach(item => {
    const date = new Date(item.date);
    monthsSet.add(getMonthKey(date));
  });

  // Convert to sorted array
  return Array.from(monthsSet)
    .sort((a, b) => b.localeCompare(a)) // Sort descending (newest first)
    .map(key => {
      const [year, month] = key.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, 1);
      return {
        key,
        display: date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
        year: parseInt(year),
        month: parseInt(month) - 1,
        isCurrentMonth: key === currentMonth.key
      };
    });
};

// Function to get month boundaries
const getMonthBoundaries = (year: number, month: number) => {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
  return { start, end };
};

export default function ExpenseData() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>('current');
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  const expenses = useLiveQuery(() => db.expenses.toArray(), []);
  const incomes = useLiveQuery(() => db.incomes.toArray(), []);

  // Get available months
  const availableMonths = useMemo(() => {
    if (!expenses || !incomes) return [];
    return getAvailableMonths(expenses, incomes);
  }, [expenses, incomes]);

  // Get current selected period
  const selectedPeriod = useMemo(() => {
    if (selectedMonth === 'current') {
      return getCurrentMonthPeriod();
    }
    return availableMonths.find(month => month.key === selectedMonth) || getCurrentMonthPeriod();
  }, [selectedMonth, availableMonths]);

  // Filter data for selected month
  const filteredData = useMemo(() => {
    if (!expenses || !incomes) return { expenses: [], incomes: [] };

    const { start, end } = getMonthBoundaries(selectedPeriod.year, selectedPeriod.month);

    return {
      expenses: expenses.filter(expense => {
        const date = new Date(expense.date);
        return date >= start && date <= end;
      }),
      incomes: incomes.filter(income => {
        const date = new Date(income.date);
        return date >= start && date <= end;
      })
    };
  }, [expenses, incomes, selectedPeriod]);

  // Calculate financial statistics for selected month
  const stats: FinancialStats = useMemo(() => {
    const totalExpenses = filteredData.expenses.reduce((total, expense) => total + expense.amount, 0);
    const totalIncomes = filteredData.incomes.reduce((total, income) => total + income.amount, 0);
    const remainingIncome = totalIncomes - totalExpenses;
    const savingsRate = totalIncomes > 0 ? ((remainingIncome / totalIncomes) * 100) : 0;
    const expenseRatio = totalIncomes > 0 ? ((totalExpenses / totalIncomes) * 100) : 0;
    const isHealthy = savingsRate >= 20 && expenseRatio <= 80;

    return {
      totalIncomes,
      totalExpenses,
      remainingIncome,
      savingsRate,
      expenseRatio,
      isHealthy
    };
  }, [filteredData]);

  // Get monthly breakdown for the last 6 months
  const monthlyBreakdown = useMemo((): MonthlyData[] => {
    if (!expenses || !incomes) return [];

    const months: MonthlyData[] = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const { start, end } = getMonthBoundaries(targetDate.getFullYear(), targetDate.getMonth());

      const monthExpenses = expenses
        .filter(expense => {
          const date = new Date(expense.date);
          return date >= start && date <= end;
        })
        .reduce((sum, expense) => sum + expense.amount, 0);

      const monthIncomes = incomes
        .filter(income => {
          const date = new Date(income.date);
          return date >= start && date <= end;
        })
        .reduce((sum, income) => sum + income.amount, 0);

      months.push({
        month: targetDate.toLocaleDateString('en-IN', { month: 'short' }),
        year: targetDate.getFullYear(),
        income: monthIncomes,
        expense: monthExpenses,
        savings: monthIncomes - monthExpenses,
        monthKey: getMonthKey(targetDate)
      });
    }

    return months;
  }, [expenses, incomes]);

  // Format currency with proper Indian formatting
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get status color based on remaining income
  const getStatusColor = (amount: number) => {
    if (amount > 0) return "text-green-600 dark:text-green-400";
    if (amount === 0) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  // Get trend indicator
  const getTrendInfo = () => {
    if (monthlyBreakdown.length < 2) return null;

    const current = monthlyBreakdown[monthlyBreakdown.length - 1];
    const previous = monthlyBreakdown[monthlyBreakdown.length - 2];

    const trend = current.savings - previous.savings;
    const isPositive = trend > 0;

    return {
      amount: Math.abs(trend),
      isPositive,
      percentage: previous.savings !== 0 ? Math.abs((trend / previous.savings) * 100) : 0
    };
  };

  // Auto-switch to current month on month change
  useEffect(() => {
    const checkMonthChange = () => {
      const currentMonthKey = getMonthKey(new Date());
      if (selectedMonth === 'current') {
        // Force re-render if we're viewing current month and month has changed
        const interval = setInterval(() => {
          const newCurrentMonthKey = getMonthKey(new Date());
          if (newCurrentMonthKey !== currentMonthKey) {
            // Month has changed, component will re-render with new data
            window.location.reload(); // Simple approach, can be optimized
          }
        }, 60000); // Check every minute

        return () => clearInterval(interval);
      }
    };

    checkMonthChange();
  }, [selectedMonth]);

  const trendInfo = getTrendInfo();

  if (!expenses || !incomes) {
    return (
      <div className="sticky top-4">
        <div className="animate-pulse">
          <div className="h-32 bg-neutral-200 dark:bg-neutral-800 rounded-t-xl"></div>
          <div className="h-20 bg-neutral-300 dark:bg-neutral-700 rounded-b-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="sticky z-50 mt-8 top-4">
        <motion.div
          className="overflow-hidden border shadow-lg bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Month Selector Header */}
          {/* <div className="flex items-center justify-between p-3 border-b bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-500" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Viewing: {selectedPeriod.display}
              </span>
              {selectedPeriod.isCurrentMonth && (
                <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                  Current
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {selectedMonth !== 'current' && (
                <button
                  onClick={() => setSelectedMonth('current')}
                  className="p-1.5 text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                  title="Go to current month"
                >
                  <RotateCcw size={14} />
                </button>
              )}

              <div className="relative">
                <button
                  onClick={() => setShowMonthSelector(!showMonthSelector)}
                  className="px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  {showMonthSelector ? 'Close' : 'Change Month'}
                </button>

                {showMonthSelector && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 z-50 mt-1 bg-white border rounded-lg shadow-lg top-full dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 min-w-48"
                  >
                    <div className="p-2 overflow-y-auto max-h-60">
                      <button
                        onClick={() => {
                          setSelectedMonth('current');
                          setShowMonthSelector(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${selectedMonth === 'current'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                          }`}
                      >
                        Current Month
                      </button>
                      {availableMonths
                        .filter(month => !month.isCurrentMonth)
                        .map((month) => (
                          <button
                            key={month.key}
                            onClick={() => {
                              setSelectedMonth(month.key);
                              setShowMonthSelector(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${selectedMonth === month.key
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                              }`}
                          >
                            {month.display}
                          </button>
                        ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div> */}

          {/* Main Stats */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wallet className="w-6 h-6 text-neutral-500" />
                <p className="text-xl font-medium text-neutral-600 dark:text-neutral-300 noto-serif-display">
                  {stats.remainingIncome >= 0 ? 'Available Balance' : 'Budget Deficit'}
                </p>
              </div>

              {trendInfo && selectedPeriod.isCurrentMonth && (
                <div className={`flex items-center gap-1 text-sm ${trendInfo.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                  {trendInfo.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>{trendInfo.percentage.toFixed(1)}%</span>
                </div>
              )}
            </div>

            <motion.p
              className={`text-4xl font-bold tracking-tight mb-1 ${getStatusColor(stats.remainingIncome)}`}
              key={`${selectedPeriod.key}-${stats.remainingIncome}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {formatCurrency(Math.abs(stats.remainingIncome))}
            </motion.p>

            {stats.savingsRate > 0 && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {stats.savingsRate.toFixed(1)}% savings rate this month
              </p>
            )}

            {filteredData.expenses.length === 0 && filteredData.incomes.length === 0 && selectedPeriod.isCurrentMonth && (
              <p className="mt-2 text-sm italic text-neutral-500 dark:text-neutral-400">
                Fresh start for this month! Add your first transaction below.
              </p>
            )}
          </div>

          {/* Income/Expense Breakdown */}
          <div className="grid grid-cols-2 gap-px bg-neutral-200 dark:bg-neutral-700">
            <div className="p-2.5 bg-white dark:bg-neutral-800">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300 noto-serif-display">
                  Total Income
                </span>
              </div>
              <p className="text-xl font-bold tracking-tight text-green-600 dark:text-green-400">
                {formatCurrency(stats.totalIncomes)}
              </p>
            </div>

            <div className="p-2.5 bg-white dark:bg-neutral-800">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown size={16} className="text-red-600 dark:text-red-400" />
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300 noto-serif-display">
                  Total Expenses
                </span>
              </div>
              <p className="text-xl font-bold tracking-tight text-red-600 dark:text-red-400">
                {formatCurrency(stats.totalExpenses)}
              </p>
            </div>
          </div>

          {/* Expense Ratio Bar */}
          {stats.totalIncomes > 0 && (
            <div className="p-4 bg-white/50 dark:bg-neutral-800/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Expense Ratio</span>
                <span className="text-xs text-neutral-500">{stats.expenseRatio.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-700">
                <motion.div
                  className={`h-2 rounded-full transition-colors duration-300 ${stats.expenseRatio > 80
                    ? 'bg-red-500'
                    : stats.expenseRatio > 60
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                    }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(stats.expenseRatio, 100)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  key={selectedPeriod.key}
                />
              </div>
            </div>
          )}

          {/* Historical Breakdown Toggle (only show for current month) */}
          {selectedPeriod.isCurrentMonth && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center justify-center w-full gap-2 p-3 text-sm font-medium transition-colors duration-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400"
            >
              <span>6-Month History</span>
              {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}

          {/* Monthly Breakdown */}
          <AnimatePresence>
            {showDetails && selectedPeriod.isCurrentMonth && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-white border-t dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
              >
                <div className="p-4 space-y-3">
                  {monthlyBreakdown.map((month, index) => (
                    <div key={`${month.monthKey}-${index}`} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {month.month} {month.year}
                      </span>
                      <div className="flex gap-4 text-xs">
                        <span className="text-green-600 dark:text-green-400">
                          +{formatCurrency(month.income)}
                        </span>
                        <span className="text-red-600 dark:text-red-400">
                          -{formatCurrency(month.expense)}
                        </span>
                        <span className={`font-semibold ${getStatusColor(month.savings)}`}>
                          {formatCurrency(Math.abs(month.savings))}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Action Buttons - Only show for current month */}
          {selectedPeriod.isCurrentMonth && (
            <div className="flex items-center w-full gap-3 p-4">
              <AddIncome />
              <AddExpense />
            </div>
          )}
        </motion.div>
      </div>


      {/* Historical month indicator */}
      {!selectedPeriod.isCurrentMonth && (
        <div className="flex items-center justify-center w-full p-3 mt-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Viewing historical data for {selectedPeriod.display}
          </p>
        </div>
      )}
    </>
  );
}