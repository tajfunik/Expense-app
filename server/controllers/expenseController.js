const Expense = require("../models/Expense");

const createExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    const expense = await Expense.create({
      title,
      amount,
      category,
      user: req.user.userId,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ 
        user: req.user.userId,
     });
     
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    // Nájdi expense podľa ID
    const expense = await Expense.findById(req.params.id);

    // Ak neexistuje
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // Skontroluj, či patrí užívateľovi
    if (expense.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not authorized to delete this expense",
      });
    }  
    
    // Zmaž expense
    await expense.deleteOne();

    res.json({
      message: "Expense deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getExpenses, createExpense, deleteExpense};