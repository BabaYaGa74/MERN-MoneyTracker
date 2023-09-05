const Transaction = require("../models/TransactionModel");

//@desc  Create new transaction
//@route   POST /api/transaction
//@access   Public
const createTransaction = async (req, res) => {
  try {
    const { name, description, datetime, price } = req.body;
    const transaction = await Transaction.create({
      name,
      price,
      description,
      datetime,
    });
    res.json(transaction);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//@desc  Get all transactions
//@route   GET /api/transactions
//@access   Public
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.json(transactions);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//@desc  Deletes all transactions
//@route   DELETE /api/transactions
//@access   Public
const deleteAllTransactions = async (req, res) => {
  try {
    const del = await Transaction.deleteMany({});
    if (del) res.status(200).json("Database deleted Successfully!");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//@desc  Deletes all transactions
//@route   DELETE /api/transactions
//@access   Public
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transDel = await Transaction.findByIdAndDelete(id);
    if (transDel) res.status(200).json("Transaction deleted Successfully!");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllTransactions,
  createTransaction,
  deleteAllTransactions,
  deleteTransaction,
};
