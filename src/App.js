import "./App.css";
import BillingList from "./constants/BillingList";
import CashFlowTracker from "./constants/CashFlowTracker";
import ExpenseTracker from "./constants/ExpenseTracker";
import ProductTracker from "./constants/ProductsList";
import Register from "./constants/StudentsRegister";
import { useState } from "react";

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
