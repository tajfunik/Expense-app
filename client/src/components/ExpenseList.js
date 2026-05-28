import ExpenseItem from "./ExpenseItem";

function ExpenseList({
  expenses,
  loadExpenses,
  handleDelete,
}) {
  return (
    <div className="card">
      <h2>Expenses</h2>

      <button onClick={loadExpenses}>
        Load Expenses
      </button>

      <ul>
        {expenses.map((exp) => (
          <ExpenseItem
            key={exp._id}
            exp={exp}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;