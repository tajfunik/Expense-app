function ExpenseItem({ exp, handleDelete, handleEdit }) {
  return (
    <li className="expense-item">
      <div>
        <h3>{exp.title}</h3>
        <p>{exp.amount} €</p>
        <p>{exp.category}</p>
        <p>{new Date(exp.date).toLocaleDateString()}</p>
      </div>

      <button onClick={() => handleEdit(exp)}>
        Edit
      </button>

      <button onClick={() => handleDelete(exp._id)}>
        Delete
      </button>
    </li>
  );
}

export default ExpenseItem;