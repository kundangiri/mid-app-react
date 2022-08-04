import "./App.css";
import BillingList from "./components/BillingList";
import BillingList2 from "./components/BillingList2";
import CashFlowTracker from "./components/CashFlowTracker";
import ExpenseTracker from "./components/ExpenseTracker";
import ProductTracker from "./components/ProductsList";
import Register from "./components/StudentsRegister";
import { useState } from "react";
import New from "./components/new";

import { AiOutlineHome } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";

import { Routes, Route, Link, NavLink } from "react-router-dom";
import { Context } from "./contexts/ProductsContext";
import { ProductsProvider } from "./contexts/ProductsContext2";
const routes = [
  {
    path: "/",
    content: (
      <>
        {" "}
        <AiOutlineHome size={24} /> <span>Home</span>
      </>
    ),
  },
  {
    path: "/cashflow",
    content: "CashFlowTacker",
  },
  {
    path: "/expenses",
    content: "Expenses Tr",
  },
  {
    path: "/products",
    content: "Products",
  },
  {
    path: "/billing",
    content: "Billing",
  },
  {
    path: "/billingXYZ",
    content: "BillinXYZg",
  },
];

function App() {
  const [listedProducts, setListedProducts] = useState([]);
  return (
    <div className="App">
      <div>
        {/* <h1
          style={{
            fontSize: "40px",
            padding: "20px",
            background: "green",
            color: "white",
          }}
        >
          Lets test REact Router
        </h1> */}
        <nav
          style={{
            backgroundColor: "pink",
            height: "50px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            position: "fixed",
            top: 0,
            width: "100%",
          }}
        >
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/cashflow"}>CashFlowTacker</NavLink>
          <NavLink to={"/expenses"}>Expenses</NavLink>
          <NavLink to={"/products"}>Products</NavLink>
          <NavLink to={"/billing"}>Billing</NavLink>
          <NavLink to={"/billing2"}>Billing 2</NavLink>
        </nav>
      </div>
      <div className="main-container">
        {/* <div className="sidebar">
          <nav
            style={{
              // backgroundColor: "pink",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-around",
              alignItems: "center",
              position: "fixed",
              left: 0,
              top: 50,
              width: "15%",
              height: "100vh",
              backgroundColor: "crimson",
            }}
          >
            {routes.map((route) => (
              <NavLink key={route.path} to={route.path}>
                {route.content}
              </NavLink>
            ))}
          </nav>
        </div> */}
        <div className="main-page">
          <ProductsProvider>
            <Context.Provider value={listedProducts}>
              <Routes>
                <Route path="/" element={<New />} />
                <Route path="/cashflow" element={<CashFlowTracker />} />
                <Route path="/expenses" element={<ExpenseTracker />} />
                <Route
                  path="/products"
                  element={
                    <ProductTracker
                      products={listedProducts}
                      setProducts={setListedProducts}
                    />
                  }
                />
                <Route
                  path="/billing"
                  element={<BillingList products={listedProducts} />}
                />
                <Route
                  path="/billing2"
                  element={<BillingList2 products={listedProducts} />}
                />
                <Route
                  path="*"
                  element={
                    <div
                      style={{
                        minHeight: "80vh",
                        backgroundColor: "#ef0909",
                        width: "100vh",
                      }}
                    >
                      <h1>404- Page not Found</h1>
                    </div>
                  }
                />
              </Routes>
            </Context.Provider>
          </ProductsProvider>
        </div>
      </div>
      <h1
        style={{
          fontSize: "40px",
          padding: "20px",
          background: "orange",
          color: "white",
        }}
      >
        {" "}
        This the footer part
      </h1>

      {/* <NavLink to={"/"}>
              {" "}
              <AiOutlineHome size={24} /> <span>Home</span>
            </NavLink>
            <NavLink to={"/cashflow"}>CashFlowTacker</NavLink>
            <NavLink to={"/expenses"}>Expenses</NavLink>
            <NavLink to={"/products"}>Products</NavLink>
            <NavLink to={"/billing"}>Billing</NavLink> */}

      {/* <ExpenseTracker />
      <CashFlowTracker />
      <ProductTracker
        products={listedProducts}
        setProducts={setListedProducts}
      />
      <BillingList products={listedProducts} />
      <New /> */}
    </div>
  );
}

export default App;
