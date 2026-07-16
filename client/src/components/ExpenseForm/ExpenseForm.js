import "./ExpenseForm.css"

function ExpenseForm({title,amount,category,date,setTitle,setAmount,setCategory,setDate,handleSubmit, editingId, handleCancelEdit}) {
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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Auto">Auto</option>
            <option value="Zabava">Zabava</option>
            <option value="Potraviny">Potraviny</option>
            <option value="Oslava">Oslava</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="button-formular">
          {editingId ? "Save" : "Add Expense"}
        </button>
        {editingId && (<button type="button"onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default ExpenseForm;