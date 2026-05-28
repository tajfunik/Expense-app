import { useState } from "react";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

import "./App.css";

function App() {
  // STATE
  const [expenses, setExpenses] = useState([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // CREATE NEW RECORD IN DB
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExpense = {
      title,
      amount,
      category,
    };

    try {
      const res = await fetch("http://localhost:5000/api/expenses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newExpense),
        }
      );

      const data = await res.json();

      console.log("Saved:", data);

      setTitle("");
      setAmount("");
      setCategory("");

    } catch (err) {
      console.error(err);
    }
  };

  // Load ALL RECORDS FROM DB
  const loadExpenses = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/expenses"
      );

      const data = await res.json();

      setExpenses(data);

    } catch (err) {
      console.error(err);
    }
  };

  // DELETE RECORD FROM DBideme css
  const handleDelete = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/expenses/${id}`,
        {
          method: "DELETE",
        }
      );

      setExpenses((prev) =>
        prev.filter((exp) => exp._id !== id)
      );

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <ExpenseForm
        title={title}
        amount={amount}
        category={category}
        setTitle={setTitle}
        setAmount={setAmount}
        setCategory={setCategory}
        handleSubmit={handleSubmit}
      />

      <ExpenseList
        expenses={expenses}
        loadExpenses={loadExpenses}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;