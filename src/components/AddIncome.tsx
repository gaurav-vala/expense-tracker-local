import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { db } from "@/lib/db";

export default function AddIncome() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(""); // Start with an empty string for amount
  const [error, setError] = useState(""); // To track error messages

  // Function to handle the amount input change with validation
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only valid number input (with optional decimal)
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setError(""); // Clear error message when the user starts typing again
    }
  };

  // Function to add the income to the database
  async function addIncome() {
    // Check if the name or amount is invalid
    if (!name || amount === "" || parseFloat(amount) <= 0) {
      setError("Please provide a valid name and amount greater than 0.");
      return;
    }

    try {
      // Add income to the database
      await db.incomes.add({
        amount: parseFloat(amount), // Convert string to number before saving
        name,
      });

      setAmount(""); // Reset amount after successful addition
      setName(""); // Reset name
      setError(""); // Clear any error message
    } catch (e) {
      console.error(e);
      setError("Failed to add income. Please try again.");
    }
  }

  return (
    <div className="w-full md:max-w-3xl">
      <Drawer>
        <DrawerTrigger className="w-full px-3 py-2 text-lg font-bold tracking-tighter text-black rounded-full bg-neutral-200">
          Add Income
        </DrawerTrigger>
        <DrawerContent>
          <div className="w-full max-w-sm mx-auto">
            <DrawerHeader>
              <DrawerTitle>Add Income!</DrawerTitle>
              <DrawerDescription>
                Check the values you are adding
              </DrawerDescription>
            </DrawerHeader>

            <div className="p-4">
              <Input
                type="text"
                placeholder="Income Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="number"
                value={amount}
                className="mt-2"
                onChange={handleAmountChange} // Handle amount change
                placeholder="Income Amount"
              />
              {/* Show error message if any */}
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <DrawerFooter>
              <Button onClick={addIncome}>Add Income</Button>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
