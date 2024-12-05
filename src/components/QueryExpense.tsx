import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../lib/db";
import { Button } from "./ui/button";

import { motion, AnimatePresence } from "framer-motion";

export default function QueryExpense() {
  const expenses = useLiveQuery(() => db.expenses.toArray(), []);
  const incomes = useLiveQuery(() => db.incomes.toArray(), []);

  async function deleteIncomeRecord(id: number) {
    // console.log(id);
    await db.incomes.delete(id);
  }

  async function deleteExpenseRecord(id: number) {
    // console.log(id);
    await db.expenses.delete(id);
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(); // Adds commas for thousands
  };
  return (
    <>
      <ul>
        <AnimatePresence>
          {expenses?.map((expense) => (
            // <li
            //   key={expense.id}
            //   className="border border-red-400 bg-red-100 p-4 rounded-md mt-3"
            // >
            //   {expense.name}, {expense.amount}
            // </li>
            <motion.li
              key={expense.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "circIn" }}
              className="flex items-center justify-between p-4 rounded-md mt-3 border border-neutral-200 dark:border-neutral-500"
            >
              <div className="flex items-center gap-3">
                <p className="border border-red-400 bg-red-50 text-red-400 p-2 rounded-lg inline-block">
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
                    className="icon icon-tabler icons-tabler-outline icon-tabler-trending-down"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 7l6 6l4 -4l8 8" />
                    <path d="M21 10l0 7l-7 0" />
                  </svg>
                </p>
                <p>
                  <span className="block font-semibold text-xl tracking-tighter">
                    {expense.name}
                  </span>
                  <span className="block font-medium">
                    {" "}
                    {formatCurrency(expense.amount)}
                  </span>
                </p>
              </div>

              {/* DELETE BTN */}
              <Button
                variant={"secondary"}
                className="px-4 py-4 bg-red-50 text-red-500"
                onClick={() => deleteExpenseRecord(expense.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon icon-tabler icons-tabler-filled icon-tabler-trash-x"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
                  <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" />
                </svg>
              </Button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <ul className="pb-36">
        <AnimatePresence>
          {incomes?.map((income) => (
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "circInOut" }}
              key={income.id}
              className="flex items-center justify-between p-4 rounded-md mt-3 border border-neutral-200 dark:border-neutral-500"
            >
              <div className="flex items-center gap-3">
                <p className="border border-green-400 bg-green-100 text-green-400 p-2 rounded-lg inline-block">
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
                    className="icon icon-tabler icons-tabler-outline icon-tabler-trending-up"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 17l6 -6l4 4l8 -8" />
                    <path d="M14 7l7 0l0 7" />
                  </svg>
                </p>
                <p>
                  <span className="block font-semibold text-xl tracking-tighter">
                    {income.name}
                  </span>
                  <span className="block font-medium">
                    ₹ {formatCurrency(income.amount)}
                  </span>
                </p>
              </div>

              {/* DELETE BTN */}
              <Button
                variant={"secondary"}
                className="px-4 py-4 bg-red-100 text-red-500"
                onClick={() => deleteIncomeRecord(income.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon icon-tabler icons-tabler-filled icon-tabler-trash-x"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
                  <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" />
                </svg>
              </Button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
}
