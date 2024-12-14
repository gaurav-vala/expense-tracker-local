import { Moon, Sun, Settings, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { db } from "@/lib/db";
import jsPDF from "jspdf";

export function ModeToggle() {
  const { setTheme } = useTheme();

  const generatePDF = async () => {
    // Fetch expenses and incomes
    const expenses = await db.expenses.toArray();
    const incomes = await db.incomes.toArray();

    // Initialize jsPDF
    const doc = new jsPDF();

    // Add the Inter font (example, use your actual base64-encoded string)

    // Set the font to Inter
    doc.setFont("Helvetica"); // Use the Inter font for the document
    doc.setFontSize(18);

    let y = 20;

    // Title of the PDF
    doc.text("Income and Expense Report", 10, y);
    y += 20;

    // Expenses Section
    doc.setFontSize(14);
    doc.text("Expenses", 10, y);
    y += 10;

    // Table Headers for Expenses
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // White text for header
    doc.setFillColor(19, 16, 16); // Dark Blue for header background
    doc.rect(10, y, 190, 10, "F"); // Header background
    doc.text("Name", 15, y + 7); // Column Header - Name
    doc.text("Amount", 120, y + 7); // Column Header - Amount

    y += 15;

    // Expenses data
    expenses.forEach((expense) => {
      doc.setTextColor(0, 0, 0); // Black text for body
      doc.text(expense.name, 15, y); // Expense name
      doc.text(`${expense.amount}`, 120, y); // Expense amount
      y += 10;
    });

    // Incomes Section (similar to expenses)
    doc.setFontSize(14);
    doc.text("Incomes", 10, y);
    y += 10;

    doc.setTextColor(255, 255, 255); // White text for header
    doc.setFillColor(19, 16, 16); // Dark Blue for header background
    doc.rect(10, y, 190, 10, "F"); // Header background
    doc.text("Name", 15, y + 7); // Column Header - Name
    doc.text("Amount", 120, y + 7); // Column Header - Amount

    y += 15;

    // Incomes data
    incomes.forEach((income) => {
      doc.setTextColor(0, 0, 0); // Black text for body
      doc.text(income.name, 15, y); // Income name
      doc.text(`${income.amount}`, 120, y); // Income amount
      y += 10;
    });

    // Save the generated PDF
    doc.save("report.pdf");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-12 h-12">
          <Settings className="absolute w-6 h-6 transition-all rotate-90 dark:rotate-0 hover:rotate-0 " />
          {/* <Settings className="w-6 h-6 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" /> */}
          {/* <Moon className="absolute w-6 h-6 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" /> */}
          {/* <span className="sr-only">Toggle theme</span> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun /> Light Mode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon />
          Dark Mode
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem> */}
        <DropdownMenuItem onClick={() => generatePDF()}>
          <Download /> Download PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
