const express = require("express");
const cors = require("cors");

const app = express();

const expenseRoutes = require("./routes/expenseRoutes");
const testRoutes = require("./routes/testRoutes");

app.use(cors());
app.use(express.json());


// Routes
app.use("/api/expenses", expenseRoutes);
app.use("/test", testRoutes);



//Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
});

module.exports = app;