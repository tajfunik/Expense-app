const express = require("express");
const cors = require("cors");

const app = express();

const expenseRoutes = require("./routes/expenseRouco je lepsie ates");
const authRoutes = require("./routes/authRoutes");


app.use(cors());
app.use(express.json());


// Routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);


//Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
});

module.exports = app;