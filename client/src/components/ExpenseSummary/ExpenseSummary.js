import './ExpenseSummary.css'

const ExpenseSummary = ({totalExpenses,expenseCount, highestExpense, averageExpense}) =>{
    return (
    <div className="dashboard-summary">
        <div className="summary-card">
            <h4>Total spent</h4>
            <h2>{totalExpenses} €</h2>
        </div>
        <div className="summary-card">
            <h4>Number of records</h4>
            <h2>{expenseCount}</h2>
        </div>
        <div className="summary-card">
            <h4>Highest expense</h4>
            <h2>{highestExpense ? highestExpense.amount : 0} €</h2>
        </div>
        <div className="summary-card">
            <h4>Average expense</h4>
            <h2>{averageExpense.toFixed(2)} €</h2>
        </div>
        <div className="summary-card">
            <h4>Total spent this month</h4>
            <h2>0 €</h2>
        </div>
    </div>
    )
}

export default ExpenseSummary