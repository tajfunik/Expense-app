import { useState } from "react";
import { useEffect } from "react";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Login from "./components/Login";
import Register from "./components/Register";

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
  const [isRegister, setIsRegister] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
  if (token) {
    loadExpenses();
  }
}, [token]);

  //Login
  const handleLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

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
    if (editId) {
      // UPDATE
      const res = await fetch(
        `http://localhost:5000/api/expenses/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newExpense),
        }
      );

      const data = await res.json();

      setExpenses((prev) =>
        prev.map((exp) =>
          exp._id === editId ? data : exp
        )
      );

      setEditId(null);
    } else {
      // CREATE
      const res = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newExpense),
      });

      const data = await res.json();

      setExpenses((prev) => [...prev, data]);
    }

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

  // DELETE RECORD FROM DB 
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
  return isRegister ? (
    <Register onRegister={() => setIsRegister(false)} />
    ) : (
    <Login
      onLogin={handleLogin}
      onSwitchToRegister={() => setIsRegister(true)}
    />
    );
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  };

  const handleEdit = (expense) => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
    setEditId(expense._id);
  };

  return (
    <div className="app-container">

      <div className="header">
        {user && <h2>Welcome {user.name} 👋</h2>}
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="main-layout">

        {/* LEFT SIDE */}
        <div className="left-panel">
          <ExpenseForm
            title={title}
            amount={amount}
            category={category}
            setTitle={setTitle}
            setAmount={setAmount}
            setCategory={setCategory}
            handleSubmit={handleSubmit}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="right-panel">
          <h3>Your Expenses</h3>
          <ExpenseList
            expenses={expenses}
            loadExpenses={loadExpenses}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>

      </div>

    </div>
  );
}

export default App;