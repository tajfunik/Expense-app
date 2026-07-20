import { useState } from "react";


const useExpenses = () =>{

    const [expenses, setExpenses] = useState([]);

    
    return expenses
}
export default useExpenses