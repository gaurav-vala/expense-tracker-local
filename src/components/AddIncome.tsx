import { useState } from "react";
// import { db } from "../lib/db";

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
  const [amount, setAmount] = useState(0);
  // const [status, setStatus] = useState("");

  async function addIncome() {
    if (!name || amount <= 0) {
      // setStatus("Please provide a valid name and amount greater than 0.");
      return;
    }

    try {
      await db.incomes.add({
        amount,
        name,
      });

      // setStatus(`Income ${name} successfully added. Got id ${id}`);
      setAmount(0);
      setName("");
    } catch (e) {
      console.error(e);
      // setStatus("Failed to add income. Please try again.");
    }
  }

  return (
    <div className="md:max-w-3xl w-full">
      <Drawer>
        <DrawerTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-3 w-full">
          Add Income
        </DrawerTrigger>
        <DrawerContent>
          <div className="max-w-sm mx-auto w-full">
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
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                placeholder="Income Amount"
              />
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

      {/* {status && <p>{status}</p>} */}
    </div>
  );
}
