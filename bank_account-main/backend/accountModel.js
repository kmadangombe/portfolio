import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    accountHolder: { type: String, required: true },
    accountNumber: { type: String, unique: true, required: true, index: true },
    balance: { type: Number, required: true, default: 0 },
    accountType: { type: String, enum: ["Checking", "Savings"], required: true },
    transactions: [
      {
        type: { type: String, enum: ["Deposit", "Withdrawal"], required: true },
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);
export default Account;  // ✅ Make sure this export exists
