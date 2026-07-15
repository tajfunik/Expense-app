
import { useState } from "react";
import { useEffect } from "react";


import { apiRequest } from "../../services/api";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import ExpenseList from "../ExpenseList/ExpenseList";
import ExpenseFilters from '../ExpenseFilters/ExpenseFilters';
import ExpenseSummary from '../ExpenseSummary/ExpenseSummary';

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
    const highestExpense = expenses.reduce((max, expense) => {
      if (Number(expense.amount) > Number(max.amount)) {
        return expense;
      } else {
        return max;
      }
    }, expenses[0]);

    const totalSum = expenses.reduce((sum, expense) => {
      return sum + Number(expense.amount);
    }, 0);
    const average = expenseCount > 0 ? totalSum / expenseCount : 0;

    const [selectedCategory, setSelectedCategory ] = useState("All")
    const [selectedTitle, setSelectedTitle] = useState("")
    const [sortOption, setSortOption] = useState("Default");

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

    let filteredByCategory
    if (selectedCategory === "All") {
      filteredByCategory = expenses;
    } else {
      filteredByCategory = expenses.filter((oneExpense) => {
        return oneExpense.category === selectedCategory;
      });
    }

    let filteredByTitle;
    filteredByTitle = filteredByCategory.filter( (oneExpense) =>{
      return oneExpense.title.toLowerCase().includes(selectedTitle.toLowerCase())
    })


    let sortedExpenses;
    if (sortOption === "Default") {
      sortedExpenses = filteredByTitle;
    } else if (sortOption === "Highest amount") {
      sortedExpenses = [...filteredByTitle].sort((oneExpense, secondExpense) => {
        return secondExpense.amount - oneExpense.amount;
      });
    } else if (sortOption === "Lowest amount") {
      sortedExpenses = [...filteredByTitle].sort((oneExpense, secondExpense) => {
        return oneExpense.amount - secondExpense.amount;
      });
    } else {
      sortedExpenses = filteredByTitle;
    }



    const allCategories = {};
    expenses.forEach((expense) => {
      const kategoria = expense.category;
      if (allCategories[kategoria]) {
        allCategories[kategoria] = allCategories[kategoria] + 1;
      } else {
        allCategories[kategoria] = 1;
      }
    });

    const highestCategory = allCategories.reduce( (max, oneCategory) =>{
      if(max > oneCategory){
        return max
      } else {
        return oneCategory
      }
    }, allCategories[0])
    

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
            <ExpenseSummary
              totalExpenses={totalExpenses}
              expenseCount={expenseCount}
              highestExpense={highestExpense}
              averageExpense={average}
            />

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
                  <ExpenseFilters
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedTitle={selectedTitle}
                    setSelectedTitle={setSelectedTitle}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                  />
                  <ExpenseList
                    expenses={sortedExpenses}
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