const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  getExpenses,
  createExpense,
} = require("../controllers/expenseController");

router.get("/", protect, getExpenses);
router.post("/", protect, createExpense);

module.exports = router;