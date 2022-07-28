import "./App.css";
import BillingList from "./components/BillingList";
import CashFlowTracker from "./components/CashFlowTracker";
import ExpenseTracker from "./components/ExpenseTracker";
import ProductTracker from "./components/ProductsList";
import Register from "./components/StudentsRegister";
import { useState } from "react";
import Temp from "./components/temp";

function App() {
  const [listedProducts, setListedProducts] = useState([]);
  return (
    <div className="App">
      {/* <Register /> */}
      {/* <ExpenseTracker /> */}
      {/* <CashFlowTracker /> */}
      <ProductTracker
        products={listedProducts}
        setProducts={setListedProducts}
      />
      <BillingList products={listedProducts} />
    </div>
  );
}

export default App;
