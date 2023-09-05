const express = require("express");
const router = express.Router();
const {
  getAllTransactions,
  createTransaction,
  deleteAllTransactions,
  deleteTransaction,
} = require("../controller/transactionController");

router
  .route("/transactions")
  .get(getAllTransactions)
  .delete(deleteAllTransactions);

router.post("/transaction", createTransaction);
router.delete("/transaction/:id", deleteTransaction);

module.exports = router;
