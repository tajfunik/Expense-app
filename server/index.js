require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./server");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});