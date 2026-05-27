import { useState } from "react";

function App() {
  // ========== STATE ==========
  const [expenses, setExpenses] = useState([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // ========== CREATE NEW RECORD IN DB (POST) ==========
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExpense = {
      title,
      amount,
      category,
    };

    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      });

      const data = await res.json();

      console.log("Saved:", data);

      // reset form
      setTitle("");
      setAmount("");
      setCategory("");
    } catch (err) {
      console.error(err);
    }
  };

  // ========== READ ALL RECORDS FROM DB AND SHOW ON THE PAGE (GET) ==========
  const loadExpenses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/expenses");
      const data = await res.json();

      console.log("Loaded:", data);
      setExpenses(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ========== DELETE RECORD FROM DB (DELETE) ==========
  const handleDelete = async (id) => {
  try {
    await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "DELETE",
    });

    // refresh UI
    setExpenses((prev) =>
      prev.filter((exp) => exp._id !== id)
    );

  } catch (err) {
    console.error(err);
  }
  };

  // ========== MAIN PAGE (UI) ==========
  return (
    <div style={{ display: "flex", padding: "20px", gap: "40px" }}>
      
      {/* LEFT SIDE - FORM */}
      <div style={{ flex: 1 }}>
        <h2>Add Expense</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button type="submit">Add Expense</button>
        </form>
      </div>

      {/* RIGHT SIDE - LIST */}
      <div style={{ flex: 1 }}>
        <h2>Expenses</h2>

        <button onClick={loadExpenses}>
          Load Expenses
        </button>

        <ul>
          {expenses.map((exp) => (
            <li key={exp._id}>
              {exp.title} - {exp.amount}€ - {exp.category}

              <button onClick={() => handleDelete(exp._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default App;