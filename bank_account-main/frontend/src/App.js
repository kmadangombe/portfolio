import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Statements from "./pages/Statements";  // Import the Statements component

function App() {
  return (
    <Router>
      <div>
        <h1>Bank Account App</h1>
        <nav>
          <a href="/account">Account</a> | 
          <a href="/deposit">Deposit</a> | 
          <a href="/withdraw">Withdraw</a> | 
          <a href="/statements">Statements</a>  {/* Add a link to the Statements page */}
        </nav>
        <Routes>
          <Route path="/" element={<h2>Welcome to the Bank Account App</h2>} />
          <Route path="/account" element={<Account />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/statements" element={<Statements />} /> {/* Route for Statements */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
