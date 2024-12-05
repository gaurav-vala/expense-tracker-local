import { useState } from "react";
import { db } from "../lib/db";

<<<<<<< HEAD
<<<<<<< HEAD
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

=======
>>>>>>> c6173b1 (Resolve merge conflicts)
=======
>>>>>>> c6173b12bdcfb5d199f99596b0e189c5d8fbd6ee
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
<<<<<<< HEAD
<<<<<<< HEAD
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
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                placeholder="Expense Amount"
              />
            </div>
            <DrawerFooter>
              <DrawerClose asChild={true}>
                <Button onClick={addExpense}>Add Expense</Button>
              </DrawerClose>
              <DrawerClose>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      {/* {status && <p>{status}</p>} */}
    </div>
=======
=======
>>>>>>> c6173b12bdcfb5d199f99596b0e189c5d8fbd6ee
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
<<<<<<< HEAD
>>>>>>> c6173b1 (Resolve merge conflicts)
=======
>>>>>>> c6173b12bdcfb5d199f99596b0e189c5d8fbd6ee
  );
}
