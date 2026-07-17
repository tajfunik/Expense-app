import "./ExpensesCharts.css"

import { PieChart, Pie, Tooltip, Legend } from "recharts";
import {useState} from 'react'

const ExpensesCharts = ({expenses}) =>{

    //--------------------------------------------------Graf 1------------------------------------------------------------------------------
    const [selectedChartMonth, setSelectedChartMonth] = useState("All");

    const filterByMonth = expenses.filter( (expense) => {
        if(selectedChartMonth === "All"){
            return expenses
        } else {
        return new Date(expense.date).getMonth() === Number(selectedChartMonth)
        }
    })
    
    const categoryTotal = {}
    filterByMonth.forEach( (expense) =>{
        const category = expense.category;
        const hodnota = expense.amount;
        if(categoryTotal[category]){
            categoryTotal[category] += Number(hodnota)
        } else {
            categoryTotal[category] = Number(hodnota)
        }
    }, filterByMonth[0])

    //musime nase vysledne data, teda nas objekt preklopit naspet na pole, pretoze graf pracuje s polom
    const chartData = Object.entries(categoryTotal).map(([category, amount]) => {
    return {
        name: category,
        value: amount
        };
    });

    //--------------------------------------------------Graf 2------------------------------------------------------------------------------


    return (
        <div className="grafy">
            <h2 className="graphs-header">Grafy</h2>
            <div className="container-grafy">
                 <div className="graf">
                    <div>
                        <label htmlFor="mesiac">Expenses in one month by category</label>
                        <select 
                        name="mesiac"
                        value={selectedChartMonth}
                        onChange={(e) => setSelectedChartMonth(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="0">januar</option>
                            <option value="1">februar</option>
                            <option value="2">marec</option>
                            <option value="3">april</option>
                            <option value="4">maj</option>
                            <option value="5">jun</option>
                            <option value="6">jul</option>
                            <option value="7">august</option>
                            <option value="8">september</option>
                            <option value="9">october</option>
                            <option value="10">november</option>
                            <option value="11">december</option>
                        </select>
                    </div>
                    <div>
                        {chartData.length === 0 ? <p>No expenses for this month</p> :
                        <PieChart width={400} height={400}>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                            />
                            <Tooltip
                                formatter={(value) => `${value} €`}
                            />
                        </PieChart>
                        }
                    </div>      
                 </div>
                 <div className="graf">
                    <div>
                        <p>Graf ktory mi zobrazuje vydavky v danom mesiaci za cely rok</p>
                    </div>
                    <div>
                        {chartData.length === 0 ? <p>No expenses for this month</p> :
                        <PieChart width={400} height={400}>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                            />
                            <Tooltip
                                formatter={(value) => `${value} €`}
                            />
                        </PieChart>
                        }
                    </div>      
                 </div>
            </div>           
        </div>
    )
}

export default ExpensesCharts;