import { useState } from "react";
import { apiRequest } from "../services/api";


const useExpenses = (token, newExpense) =>{

    const [expenses, setExpenses] = useState([]);

    const loadExpenses = async () => {
        try {
        const res = await apiRequest("http://localhost:5000/api/expenses");
          
        const data = await res.json();
            setExpenses(data);
        } catch (err) {
                console.error(err);
        }
    }

    const createExpense = async (newExpense) => {
        try {
            const res = await apiRequest(
                "http://localhost:5000/api/expenses",
                {
                    method: "POST",
                    body: JSON.stringify(newExpense),
                }
            );

            const data = await res.json();

            setExpenses((prev) => [...prev, data]);

        } catch (err) {
            console.error(err);
        }
    };

    const updateExpense = async (id, newExpense) =>{

    }

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

    return {
        expenses, 
        loadExpenses, 
        createExpense,
        updateExpense, 
        handleDelete
    }
}
export default useExpenses