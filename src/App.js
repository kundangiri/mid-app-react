import "./App.css";
import BillingList from "./components/BillingList";
import CashFlowTracker from "./components/CashFlowTracker";
import ExpenseTracker from "./components/ExpenseTracker";
import ProductTracker from "./components/ProductsList";
import Register from "./components/StudentsRegister";
import { useState } from "react";

import Temp from "./components/temp";

import New from "./constants/new";

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
      <New />
    </div>
  );
}

export default App;
