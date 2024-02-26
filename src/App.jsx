import { useState } from "react";
import "./App.css";
import Specs from "./Specs";
import Products from "./Products";

function App() {
    const [products, setProducts] = useState(false);

    return (
        <div className="container">
            <nav>
                <button onClick={() => setProducts(true)}>Products</button>
                <button onClick={() => setProducts(false)}>Specs</button>
            </nav>
            <div className="App">{products ? <Products /> : <Specs />}</div>
            <p>&copy; 2024 Kwanele</p>
        </div>
    );
}

export default App;
