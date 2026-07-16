import ExpenseItem from "../ExpenseItem/ExpenseItem";
import "./ExpenseList.css"

function ExpenseList({
  expenses,
  loadExpenses,
  handleDelete,
  handleEdit
}) {
  return (
    <div className="card">
      <h2 className="nadpis">Expenses</h2>

      <div className="expense-list-container">
        <ul>
        {expenses.map((exp) => (
          <ExpenseItem
            key={exp._id}
            exp={exp}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
      </div>
    </div>
  );
}

export default ExpenseList;