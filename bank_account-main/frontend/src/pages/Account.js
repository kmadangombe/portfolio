import React, { useState } from "react";
import { Link } from "react-router-dom";

function Account() {
  const [accountNumber, setAccountNumber] = useState(""); // Added state for account number

  const handleViewStatements = () => {
    // Fetch the PDF from the backend
    if (!accountNumber) {
      alert("Please enter an account number");
      return;
    }

    fetch(`http://localhost:5555/statements/${accountNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((response) => response.blob()) // Convert response to a blob
      .then((blob) => {
        // Create a URL for the blob and open it in a new tab
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      })
      .catch((error) => console.error("Error fetching statements:", error));
  };

  return (
    <div>
      <h2>Account Page</h2>
      <p>Account Balance: $1000</p> {/* Later, we can make this dynamic */}
      
      <nav>
        <Link to="/deposit">
          <button>Deposit</button>
        </Link>
        <Link to="/withdraw">
          <button>Withdraw</button>
        </Link>
      </nav>

      <br />
      
      {/* Account Number Input */}
      <input
        type="text"
        placeholder="Enter Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)} // Update account number state
      />
      <br />
      
      <button onClick={handleViewStatements}>View Statements</button>
    </div>
  );
}

export default Account;
