import "./ExpenseFilters.css"

const ExpenseFilters = ({selectedMonth, setSelectedMonth, selectedCategory,setSelectedCategory,selectedTitle,setSelectedTitle,sortOption,setSortOption}) =>{
    return <div className="filters-cards">
            <label htmlFor="mesiac">Select month</label>
            <select 
            name="mesiac"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            >
                <option value="All">All</option>
                <option value="0">januar</option>
                <option value="1">februar</option>
                <option value="2">marec</option>
                <option value="3">april</option>
                <option value="4">maj</option>
                <option value="5">jun</option>
                <option value="6">jul</option>
                <option value="7">august</option>
                <option value="8">september</option>
                <option value="9">october</option>
                <option value="10">november</option>
                <option value="11">december</option>
            </select>
            <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select-category"
            >
                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Auto">Auto</option>
                <option value="Zabava">Zabava</option>
                <option value="Potraviny">Potraviny</option>
                <option value="Oslava">Oslava</option>
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