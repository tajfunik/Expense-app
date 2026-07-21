
import { useState } from "react";
import { useEffect } from "react";

import "./Dashboard.css"

import { apiRequest } from "../../services/api";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import ExpenseList from "../ExpenseList/ExpenseList";
import ExpenseFilters from '../ExpenseFilters/ExpenseFilters';
import ExpenseSummary from '../ExpenseSummary/ExpenseSummary';
import ExpensesCharts from "../ExpensesCharts/ExpensesCharts";
  
//hooks
import useExpenseFilters from "../../hooks/useExpenseFilters";
import useExpenseSummary from "../../hooks/useExpenseSummary";
import useExpenses from "../../hooks/useExpenses";


const Dashboard = ({token, user, onLogout}) =>{

    // STATE
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("")

    const [editingId, setEditingId] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState("All")
    const [selectedCategory, setSelectedCategory ] = useState("All")
    const [selectedTitle, setSelectedTitle] = useState("")
    const [sortOption, setSortOption] = useState("Default");

  

    useEffect(() => {
        if (token) {
            loadExpenses();
        }
    }, [token]);

    //-------------------------------------------------API komunikacia (serverova logika)----------------------------------------
        // Create new record in DB
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newExpense = {
            title,
            amount,
            category,
            date,
          };
        
        try {
            if (editingId) {
            // UPDATE
            const res = await apiRequest(`http://localhost:5000/api/expenses/${editingId}`,
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
                  exp._id === editingId ? data : exp
                )
            );
        
              setEditingId(null);
            } else {
              await createExpense(newExpense);
            }
        
            setTitle("");
            setAmount("");
            setCategory("");
            setDate("");
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (expense) => {
      setEditingId(expense._id);
      setTitle(expense.title);
      setAmount(expense.amount);
      setCategory(expense.category);
      setDate(expense.date);
    };

    const handleCancelEdit = () => {
      setEditingId(null);
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    };
  


    //-----------------------------------------------------------Business logika-----------------------------------------------------
    //posielanie dat do mojho hook-u useExpenseFilters.js
    const sortedExpenses = useExpenseFilters(
      expenses,
      selectedMonth,
      selectedCategory,
      selectedTitle,
      sortOption
    );

    //vracia data z mojho hooks useExpenseSummary
    const {
      totalExpenses,
      expenseCount,
      maxExpenseAmount,
      averageExpense,
      highestCategory,
      highestCategoryAmount
    } = useExpenseSummary(sortedExpenses);

    const {
      expenses, 
      loadExpenses, 
      createExpense,
      updateExpense, 
      handleDelete 
    } = useExpenses()

    
    //Vykreslenie jednotlivych komponentov v JSX + pridane funkcie ktore sa pouzivaju pre vypocet a zobrazenie
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
              maxExpenseAmount={maxExpenseAmount}
              averageExpense={averageExpense}
              highestCategory={highestCategory}
              highestCategoryAmount={highestCategoryAmount}
            />

            {/* MAIN AREA */}
            <div className="dashboard-main">
                <div className="dashboard-form">
                  <ExpenseForm
                    title={title}
                    amount={amount}
                    category={category}
                    date={date}
                    setTitle={setTitle}
                    setAmount={setAmount}
                    setCategory={setCategory}
                    setDate={setDate}
                    handleSubmit={handleSubmit}
                    editingId={editingId}
                    handleCancelEdit={handleCancelEdit}
                  />
                </div>

                <div className="dashboard-expenses">
                  <ExpenseFilters
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedTitle={selectedTitle}
                    setSelectedTitle={setSelectedTitle}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                  />
                  <ExpenseList
                    expenses={sortedExpenses}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                </div>
            </div>
            <div className="dashboard-graphs">
              <ExpensesCharts 
                expenses={expenses}
              />
            </div>
        </div>
    );
}

export default Dashboard