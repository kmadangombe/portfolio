import React, { useState } from "react";

function Deposit() {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Deposit Amount:", amount);
    setAmount(""); // Clear the input after submission
  };

  return (
    <div>
      <h2>Deposit Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <button type="submit">Deposit</button>
      </form>
    </div>
  );
}

export default Deposit;
