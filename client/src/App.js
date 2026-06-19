import { useState } from "react";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Login from "./components/Login";

import "./App.css";



function App() {
  // STATE
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken || storedToken === "undefined") return "";
    return storedToken;
  });
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") return null;
    return JSON.parse(storedUser);
  });

  //Login
  const handleLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user.name));

    setToken(data.token);
    setUser(data.user);
  };

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
            Authorization: `Bearer ${token}`,
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
      const res = await fetch("http://localhost:5000/api/expenses",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }   
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
      await fetch(`http://localhost:5000/api/expenses/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExpenses((prev) =>
        prev.filter((exp) => exp._id !== id)
      );

    } catch (err) {
      console.error(err);
    }
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  };

  return (
    <div className="app-container">
      <button onClick={handleLogout}>Logout</button>
      {user && (
        <h2>
          Welcome {user.name} 👋
        </h2>
      )}
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