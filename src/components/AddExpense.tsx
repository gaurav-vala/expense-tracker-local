import { useState } from "react";
import {
  Drawer,
  DrawerClose,
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

export default function AddExpense() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(""); // Keep empty string initially for number input

  async function addExpense() {
    // Check if name and amount are valid
    if (!name || parseFloat(amount) <= 0) {
      return;
    }

    try {
      await db.expenses.add({
        amount: parseFloat(amount), // Convert string to number when adding expense
        name,
      });

      setAmount(""); // Reset the amount after adding the expense
      setName(""); // Reset the name field
    } catch (e) {
      console.error(e);
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow user to type a number (allow decimal values and empty input)
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="md:max-w-3xl w-full">
      <Drawer>
        <DrawerTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-3 w-full">
          Add Expense
        </DrawerTrigger>
        <DrawerContent>
          <div className="max-w-sm mx-auto w-full">
            <DrawerHeader>
              <DrawerTitle>Add Expense!</DrawerTitle>
              <DrawerDescription>
                Check the values you are adding
              </DrawerDescription>
            </DrawerHeader>

            <div className="p-4">
              <Input
                type="text"
                placeholder="Expense Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="number"
                value={amount}
                className="mt-2"
                onChange={handleAmountChange} // Updated handler for amount input
                placeholder="Expense Amount"
              />
            </div>
            <DrawerFooter>
              <DrawerClose asChild={true}>
                <Button onClick={addExpense}>Add Expense</Button>
              </DrawerClose>
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
