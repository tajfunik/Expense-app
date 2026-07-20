

const useExpenseFilters = (expenses, selectedMonth, selectedCategory, selectedTitle, sortOption) => {


    //---------------------------------------------------------Funkcie a vypocty pre ExpensesSummary-----------------------------------------------
    let filteredByMonth
    if (selectedMonth === "All") {
      filteredByMonth = expenses;
    } else {
      filteredByMonth = expenses.filter((oneExpense) => {
        return new Date(oneExpense.date).getMonth() === Number(selectedMonth);
      });
    }

    let filteredByCategory
    if (selectedCategory === "All") {
      filteredByCategory = filteredByMonth;
    } else {
      filteredByCategory = filteredByMonth.filter((oneExpense) => {
        return oneExpense.category === selectedCategory;
      });
    }

    let filteredByTitle;
    filteredByTitle = filteredByCategory.filter( (oneExpense) =>{
      return oneExpense.title.toLowerCase().includes(selectedTitle.toLowerCase())
    })

    let sortedExpenses;
    //Vypocty jednotlivych card v ExpenseSummary
      if (sortOption === "Default") {
        sortedExpenses = filteredByTitle;
      } else if (sortOption === "Highest amount") {
        sortedExpenses = [...filteredByTitle].sort((oneExpense, secondExpense) => {
          return secondExpense.amount - oneExpense.amount;
        });
      } else if (sortOption === "Lowest amount") {
        sortedExpenses = [...filteredByTitle].sort((oneExpense, secondExpense) => {
          return oneExpense.amount - secondExpense.amount;
        });
      } else {
        sortedExpenses = filteredByTitle;
      }

    return sortedExpenses
}

export default useExpenseFilters