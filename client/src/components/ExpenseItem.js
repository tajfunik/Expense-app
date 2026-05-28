function ExpenseItem({ exp, handleDelete }) {
  return (
    <li>
      {exp.title} - {exp.amount}€ - {exp.category}

      <button onClick={() => handleDelete(exp._id)}>
        Delete
      </button>
    </li>
  );
}

export default ExpenseItem;