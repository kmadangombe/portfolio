import express from 'express';  // Import express
import PDFDocument from 'pdfkit'; // Import PDFKit for PDF generation
import path from 'path';  // Import path module to work with paths

const app = express();  // Initialize express app
const PORT = process.env.PORT || 5555; // Set port for the server

app.use(express.json()); // Middleware to parse JSON data

// Dummy data array to store accounts (or you could use a database)
let accounts = [
  {
    accountHolder: 'John Doe',
    accountNumber: '12345',
    accountType: 'Checking',
    balance: 5000,
  }
];

// Route to create a new bank account
app.post('/accounts', (req, res) => {
  try {
    const { accountHolder, accountNumber, accountType } = req.body;

    if (!accountHolder || !accountNumber || !accountType) {
      return res.status(400).send({ message: 'Please provide accountHolder, accountNumber, and accountType' });
    }

    const newAccount = {
      accountHolder,
      accountNumber,
      accountType,
      balance: 0,  // Initialize balance with 0
    };

    accounts.push(newAccount);
    return res.status(201).send(newAccount);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get the PDF bank statement
app.get('/statements/:accountNumber', (req, res) => {
  const { accountNumber } = req.params;  // Retrieve account number from URL params

  // Find the account by account number
  const account = accounts.find(acc => acc.accountNumber === accountNumber);

  if (!account) {
    return res.status(404).send({ message: 'Account not found' });
  }

  // Create a PDF document
  const doc = new PDFDocument();

  // Pipe the PDF to the client (send it directly to the response)
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=statement.pdf');
  doc.pipe(res);  // Send PDF directly to the response

  // Add content to the PDF (account info, balance, etc.)
  doc.fontSize(25).text(`Bank Statement for ${account.accountHolder}`, 100, 100);
  doc.fontSize(20).text(`Account Number: ${account.accountNumber}`, 100, 150);
  doc.fontSize(20).text(`Account Type: ${account.accountType}`, 100, 200);
  doc.fontSize(20).text(`Balance: $${account.balance}`, 100, 250);

  // Finalize the PDF
  doc.end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
