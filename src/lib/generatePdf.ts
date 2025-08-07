// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable"; // For better tables
// import { db } from "./db"; // Your Dexie setup

// export const generateFinancePDF = async () => {
//     const doc = new jsPDF();

//     // Fetch data from IndexedDB
//     const expenses = await db.expenses.toArray();
//     const incomes = await db.incomes.toArray();

//     // Title
//     doc.setFontSize(18);
//     doc.text("Finance Report", 14, 20);

//     // EXPENSES TABLE
//     doc.setFontSize(14);
//     doc.text("Expenses", 14, 30);

//     if (expenses.length > 0) {
//         autoTable(doc, {
//             startY: 35,
//             head: [["Date", "Name", "Amount"]],
//             body: expenses.map((item) => [
//                 new Date(item.date).toLocaleDateString(),
//                 item.name,
//                 `₹ ${item.amount.toFixed(2)}`,
//             ]),
//         });
//     } else {
//         doc.text("No expenses found.", 14, 40);
//     }

//     // INCOMES TABLE
//     const yOffset = doc.lastAutoTable?.finalY || 50;
//     doc.text("Incomes", 14, yOffset + 10);

//     if (incomes.length > 0) {
//         autoTable(doc, {
//             startY: yOffset + 15,
//             head: [["Date", "Name", "Amount"]],
//             body: incomes.map((item) => [
//                 new Date(item.date).toLocaleDateString(),
//                 item.name,
//                 `₹ ${item.amount.toFixed(2)}`,
//             ]),
//         });
//     } else {
//         doc.text("No incomes found.", 14, yOffset + 20);
//     }

//     // Save/download the PDF
//     doc.save("finance_report.pdf");
// };
