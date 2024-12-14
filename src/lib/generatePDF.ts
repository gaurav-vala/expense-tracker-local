import jsPDF from "jspdf";

const generatePDF = (expenses) => {
    const doc = new jsPDF();

    let y = 10;
    doc.setFontSize(12);
    doc.text("Income and Expense Report", 10, y);
    y += 10;

    expenses.forEach((expense) => {
        doc.text(`Name: ${expense.name}, Amount: ${expense.amount}, Type: ${expense.type}`, 10, y);
        y += 10;

        // Add a new page if the current one is full
        if (y > 280) {
            doc.addPage();
            y = 10;
        }
    });

    doc.save("income-expense-report.pdf");
};

export default generatePDF;