import React from 'react'

import { useState } from "react";
import { useEffect } from "react";


import { apiRequest } from "../../services/api";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import ExpenseList from "../ExpenseList/ExpenseList";

import "./Dashboard.css"

const Dashboard = ({token, user, onLogout}) =>{

    // STATE
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [editId, setEditId] = useState(null);
    const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    const expenseCount = expenses.length;

    useEffect(() => {
        if (token) {
            loadExpenses();
        }
    }, [token]);

      // Load ALL RECORDS FROM DB
    const loadExpenses = async () => {
        try {
        const res = await apiRequest("http://localhost:5000/api/expenses");
      
        const data = await res.json();
        setExpenses(data);
        } catch (err) {
            console.error(err);
        }
    }; 

    // Create new record in DB
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
          const res = await apiRequest(
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
          const res = await apiRequest("http://localhost:5000/api/expenses", 
            {
              method: "POST",
              body: JSON.stringify(newExpense),
            }
          );
    
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

    // DELETE RECORD FROM DB 
    const handleDelete = async (id) => {
        try {
          await apiRequest(`http://localhost:5000/api/expenses/${id}`,
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

    const handleEdit = (expense) => {
        setTitle(expense.title);
        setAmount(expense.amount);
        setCategory(expense.category);
        setEditId(expense._id);
    };


    return (
        <div className="dashboard-container">

            {/* HEADER */}
            <div className="dashboard-header">
                <h2>
                    Welcome {user.name} 👋
                </h2>

                <button onClick={onLogout}>
                    Logout
                </button>
            </div>


            {/* SUMMARY */}
            <div className="dashboard-summary">
                <div className="summary-card">
                    <h4>Total spent</h4>
                    <h2>{totalExpenses} €</h2>
                </div>

                <div className="summary-card">
                    <h4>Records</h4>
                    <h2>{expenseCount}</h2>
                </div>

                <div className="summary-card">
                    <h4>This month</h4>
                    <h2>0 €</h2>
                </div>
            </div>

            {/* MAIN AREA */}
            <div className="dashboard-main">
                <div className="dashboard-form">
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

                <div className="dashboard-expenses">
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

export default Dashboard