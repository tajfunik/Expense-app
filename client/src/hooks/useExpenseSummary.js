const useExpenseSummary = (sortedExpenses) => {

    //Vypocty jednotlivych card v ExpenseSummary
    const totalExpenses = sortedExpenses.reduce((sum, expense) => {
      return sum + Number(expense.amount);
    }, 0);
    const expenseCount = sortedExpenses.length;
    const maxExpenseAmount = sortedExpenses.reduce((max, expense) => {
        if (max > Number(expense.amount)) {
            return max;
        } else {
            return Number(expense.amount);
        }
    }, 0);


    //vypocet na ktoru kategoriu sme minuli najviac penazi
    let categoryTotals = {}
    sortedExpenses.forEach( (expense) =>{
      const kategoria = expense.category;
      if (categoryTotals[kategoria]) {
        categoryTotals[kategoria] += Number(expense.amount);
      } else {
        categoryTotals[kategoria] = Number(expense.amount);
      }
    })

    let highestCategory = null;
    let highestCategoryAmount = 0;
    for (const key in categoryTotals) {
      if (categoryTotals[key] > highestCategoryAmount) {
        highestCategoryAmount = categoryTotals[key];
        highestCategory = key;
      }
    }

    const averageExpense = expenseCount > 0 ? totalExpenses / expenseCount : 0;


    return {
        totalExpenses,
        expenseCount,
        maxExpenseAmount,
        highestCategory,
        highestCategoryAmount,
        averageExpense
    }

}

export default useExpenseSummary;