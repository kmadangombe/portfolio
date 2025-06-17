import React, { useState } from "react";

function Statements() {
  const [accountNumber, setAccountNumber] = useState("");

  const handleStatementClick = () => {
    console.log("Button clicked! Account number:", accountNumber); // Debugging log

    if (!accountNumber) {
      alert("Please enter an account number.");
      return;
    }

    // Fetch the statement from the backend
    fetch(`http://localhost:5555/statements/${accountNumber}`, { mode: "cors" })
      .then((response) => {
        console.log("Response status:", response.status); // Debugging log

        if (!response.ok) {
          throw new Error("Failed to fetch statement");
        }
        return response.blob(); // Expecting a PDF file to return
      })
      .then((blob) => {
        console.log("Statement received, preparing download..."); // Debugging log

        // Create a temporary link to trigger download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `statement_${accountNumber}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error("Error fetching the statement:", error);
        alert("Failed to fetch statement. Please try again.");
      });
  };

  return (
    <div>
      <h2>Bank Statements</h2>
      <input
        type="text"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        placeholder="Enter Account Number"
        onKeyDown={(e) => e.key === "Enter" && handleStatementClick()} // Allow Enter key
      />
      <button onClick={handleStatementClick}>Get Statement</button>
    </div>
  );
}

export default Statements;
