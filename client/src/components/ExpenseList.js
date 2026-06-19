import ExpenseItem from "./ExpenseItem";

function ExpenseList({
  expenses,
  loadExpenses,
  handleDelete,
  handleEdit
}) {
  return (
    <div className="card">
      <h2>Expenses</h2>

      <button onClick={loadExpenses}>
        Load all expenses
      </button>

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