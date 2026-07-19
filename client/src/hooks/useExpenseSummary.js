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
    let maxSpentMoneyOnCategory = {}
    sortedExpenses.forEach( (expense) =>{
      const kategoria = expense.category;
      if (maxSpentMoneyOnCategory[kategoria]) {
        maxSpentMoneyOnCategory[kategoria] += Number(expense.amount);
      } else {
        maxSpentMoneyOnCategory[kategoria] = Number(expense.amount);
      }
    })

    let highestCategory = null;
    let highestCategoryAmount = 0;
    for (const key in maxSpentMoneyOnCategory) {
      if (maxSpentMoneyOnCategory[key] > highestCategoryAmount) {
        highestCategoryAmount = maxSpentMoneyOnCategory[key];
        highestCategory = key;
      }
    }


    return {
        totalExpenses,
        expenseCount,
        maxExpenseAmount,
        highestCategory,
        highestCategoryAmount
    }

}

export default useExpenseSummary;