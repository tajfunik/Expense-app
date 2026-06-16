const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  getExpenses,
  createExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.get("/", protect, getExpenses);
router.post("/", protect, createExpense);
router.delete("/:id", protect, deleteExpense);

module.exports = router;