import React, { useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { formatter } from "../utils";
import "../style/index.css";

const ProductTracker = ({ products, setProducts }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const [addDisable, setAddDisable] = useState(false);
  const [updateDisable, setUpdateDisable] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [cancelDisable, setCancelDisable] = useState(true);

  const expenseRef = useRef(null);
  const quantityRef = useRef(null);
  const amountRef = useRef(null);

  const handlePressEnterAtExpense = (e) => {
    if (e.key === "Enter") {
      amountRef.current.focus();
    } else if (e.key === "ArrowLeft") {
      quantityRef.current.focus();
    } else if (e.key === "ArrowRight") {
      amountRef.current.focus();
    }
  };
  const handlePressEnterAtAmount = (e) => {
    if (e.key === "Enter") {
      quantityRef.current.focus();
    } else if (e.key === "ArrowLeft") {
      expenseRef.current.focus();
    } else if (e.key === "ArrowRight") {
      quantityRef.current.focus();
    }
  };

  const handlePressEnterAtQuantity = (e) => {
    if (e.key === "Enter") {
      handleSetEntries();
      expenseRef.current.focus();
    } else if (e.key === "ArrowLeft") {
      amountRef.current.focus();
    } else if (e.key === "ArrowRight") {
      expenseRef.current.focus();
    }
  };

  const handleSetEntries = (e) => {
    setProducts([
      ...products,
      {
        id: products.length + 1,
        name: name,
        quantity: quantity,
        amount: amount,
      },
    ]);
    handleReset();
  };

  const handleUpdateEntries = () => {
    setProducts(
      products.map((item) =>
        item.id === selectedEntry.id
          ? { ...item, name: name, quantity: quantity, amount: amount }
          : item
      )
    );
    handleReset();
  };

  const handleRemoveEntry = (id) => {
    setProducts(products.filter((products) => products.id !== id));
  };
  const handleReset = () => {
    setName("");
    setQuantity("");
    setAmount("");
    setUpdateDisable(true);
    setAddDisable(false);
    setCancelDisable(true);
  };

  const handleEditEntry = (id) => {
    const entryToEdit = products.find((products) => products.id === id);
    setSelectedEntry(entryToEdit);
    setName(entryToEdit.name);
    setQuantity(entryToEdit.quantity);
    setAmount(entryToEdit.amount);
    setAddDisable(true);
    setUpdateDisable(false);
    setCancelDisable(false);
  };

  return (
    <div className="mb-20">
      <div>
        <h1>Product List</h1>
        {products.map((student) => (
          <div
            key={student.id}
            className={`entry ${
              selectedEntry?.id === student.id ? "selected-entry" : ""
            }`}
          >
            <div className="entry">
              <span>
                {student.id}
                {". "}
              </span>
              <span>{student.name} </span>
              <span> {student.quantity} </span>
              <span> available </span>
              <span> {formatter.format(student.amount)} </span>
              <span>
                <FiEdit
                  color="blue"
                  onClick={() => {
                    handleEditEntry(student.id);
                  }}
                />
              </span>
              <span>
                <AiFillDelete
                  color="red"
                  onClick={() => {
                    handleRemoveEntry(student.id);
                  }}
                />
              </span>
            </div>
          </div>
        ))}

        <span>Total - </span>
        <span>
          {formatter.format(products.reduce((a, v) => a + +v.amount, 0))}
        </span>
      </div>
      <section className="text-gray-600 body-font width-10 flex justify-center ml-50 mt-6">
        <div className="flex flex-col justify-center items-center  shadow-2xl">
          <div className=" bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Product List
            </h2>
            <div className="relative mb-4">
              <label
                for="full-name"
                className="leading-7 text-sm text-gray-600"
              >
                Product
              </label>
              <input
                autoFocus
                placeholder="Enter Product"
                onKeyUp={handlePressEnterAtExpense}
                value={name}
                ref={expenseRef}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label for="Billing" className="leading-7 text-sm text-gray-600">
                Amount
              </label>
              <input
                onKeyUp={handlePressEnterAtAmount}
                placeholder="Enter Amount"
                value={amount}
                ref={amountRef}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="number"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label for="Billing" className="leading-7 text-sm text-gray-600">
                Quantity
              </label>
              <input
                onKeyUp={handlePressEnterAtQuantity}
                value={quantity}
                ref={quantityRef}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                type="number"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            {cancelDisable ? null : (
              <button
                className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mb-6"
                onClick={handleReset}
              >
                x
              </button>
            )}

            {addDisable ? null : (
              <button
                className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                disabled={addDisable}
                onClick={handleSetEntries}
              >
                Add
              </button>
            )}
            {updateDisable ? null : (
              <button
                className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                disabled={updateDisable}
                onClick={handleUpdateEntries}
              >
                Update
              </button>
            )}
            <button
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-6"
              onClick={() => {
                setProducts([]);
              }}
            >
              Clear all
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductTracker;
