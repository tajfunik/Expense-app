const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// GET všetky expenses
router.get("/", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// POST nový expense
router.post("/", async (req, res) => {
  try {

    console.log("BODY:", req.body);
    
    const { title, amount, category } = req.body;

    const newExpense = new Expense({
      title,
      amount,
      category,
    });

    const savedExpense = await newExpense.save();

    console.log("Saved to DB:", savedExpense);

    res.status(201).json({
      message: "Expense created successfully",
      data: savedExpense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;