import { useState } from "react";
import { db } from "../lib/db";

export default function AddIncome() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");

  async function addIncome() {
    if (!name || amount <= 0) {
      setStatus("Please provide a valid name and amount greater than 0.");
      return;
    }

    try {
      const id = await db.incomes.add({
        amount,
        name,
      });

      setStatus(`Income ${name} successfully added. Got id ${id}`);
      setAmount(0);
      setName("");
    } catch (e) {
      console.error(e);
      setStatus("Failed to add income. Please try again.");
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Income Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        placeholder="Income Amount"
      />
      <button onClick={addIncome}>Add Income</button>
      {status && <p>{status}</p>}
    </>
  );
}
