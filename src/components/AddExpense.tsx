import { useState } from "react";
import { db } from "../lib/db";

export default function AddExpense() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");

  async function addExpense() {
    if (!name || amount <= 0) {
      setStatus("Please provide a valid name and amount greater than 0.");
      return;
    }

    try {
      const id = await db.expenses.add({
        amount,
        name,
      });

      setStatus(`Expense ${name} successfully added. Got id ${id}`);
      setAmount(0);
      setName("");
    } catch (e) {
      console.error(e);
      setStatus("Failed to add expense. Please try again.");
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        placeholder="Expense Amount"
      />
      <button onClick={addExpense}>Add Expense</button>
      {status && <p>{status}</p>}
    </>
  );
}
