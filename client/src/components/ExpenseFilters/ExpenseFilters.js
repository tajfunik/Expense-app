

const ExpenseFilters = ({
    selectedCategory,
    setSelectedCategory,
    selectedTitle,
    setSelectedTitle,
    sortOption,
    setSortOption
    }) =>{
    return <div>
            <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Auto">Auto</option>
                <option value="Zabava">Zabava</option>
                <option value="Potraviny">Potraviny</option>
            </select>
            <label htmlFor="hladaj" className="label-find">Hladaj</label>
            <input 
                type="text"
                className="input-find" 
                name="hladaj"
                value={selectedTitle}
                onChange={(event) => setSelectedTitle(event.target.value)}
            />
            <label htmlFor="sortuj" className="sort-label">Sort by</label>
            <select 
                name="sortuj"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="Default">Default</option>
                <option value="Highest amount">Highest amount</option>
                <option value="Lowest amount">Lowest amount</option>
                <option>Newest</option>
                <option>Oldest</option>
            </select>
    </div>
}

export default ExpenseFilters