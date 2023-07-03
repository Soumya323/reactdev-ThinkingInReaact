import { useState } from 'react';
import './App.css';

function App() {
    var PRODUCTS = [
        { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
        { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
        { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
        { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
        { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
        { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
    ]


    return (
        <div className="App">
            <header className="App-header">
                <FilterableProductTable products={PRODUCTS} />
            </header>
        </div>
    );
}

function ProductCategoryRow({ category }) {
    return (<tr>
        <th colSpan={2}>
            {category}
        </th>
    </tr>);
}

function ProductRow({ product }) {
    var tableRow = product.stocked ? product.name :
        <span style={{ color: 'red' }}>{product.name}</span>

    return (<tr>
        <td>{tableRow}</td>
        <td>{product.price}</td>
    </tr>);
}

function ProductTable({ products, filterText, inStockOnly }) {

    var lastCategory = null;
    const rows = [];

    products.map((product) => {

        if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return;
        }

        if (lastCategory !== product.category) {
            rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
        }
        if ((inStockOnly && product.stocked) || (!inStockOnly)) {
            rows.push(<ProductRow product={product} key={product.name} />);
        }

        lastCategory = product.category;
    }
    );

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>

    );
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
    return (<form>
        <input type='text' value={filterText} placeholder='Search...'
            onChange={(e) => onFilterTextChange(e.target.value)} />
        <label>
            <input type='checkbox' checked={inStockOnly}
                onChange={(e) => onInStockOnlyChange(e.target.checked)} />
            {' '}   Only show products in stock.
        </label>
    </form>);
}


function FilterableProductTable({ products }) {

    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <div>
            <SearchBar filterText={filterText} inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText} onInStockOnlyChange={setInStockOnly} />
            <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
        </div>
    );
}




export default App;
