import "./ExpenseForm.css"

function ExpenseForm({
  title,
  amount,
  category,
  setTitle,
  setAmount,
  setCategory,
  handleSubmit,
}) {
  return (
    <div>
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit} className="expense-formular">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <button type="submit" className="button-formular">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;