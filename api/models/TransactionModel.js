const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  datetime: { type: Date, required: true },
});

const transactionModel = mongoose.model("Transaction", TransactionSchema);

module.exports = transactionModel;
