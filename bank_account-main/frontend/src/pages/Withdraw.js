import React, { useState } from "react";

function Withdraw() {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Withdraw Amount:", amount);
    setAmount(""); // Clear the input after submission
  };

  return (
    <div>
      <h2>Withdraw Page</h2>
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
        <button type="submit">Withdraw</button>
      </form>
    </div>
  );
}

export default Withdraw;
