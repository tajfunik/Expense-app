import ExpenseItem from "../ExpenseItem/ExpenseItem";
import "./ExpenseList.css"

function ExpenseList({
  expenses,
  loadExpenses,
  handleDelete,
  handleEdit
}) {
  return (
    <div className="card expense-list-container">
      <h2>Expenses</h2>

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
  );
}

export default ExpenseList;