import React, { useState, useRef } from "react";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { formatter } from "../utils";

const CashFlowTracker = ({ batch, faculty, college, expenses }) => {
  const [entries, setEntries] = useState(expenses || []);

  const [transaction, setTransaction] = useState("");
  const [date, setDate] = useState();
  const [amount, setAmount] = useState();
  const [addDisable, setAddDisable] = useState(false);
  const [updateDisable, setUpdateDisable] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [cancelDisable, setCancelDisable] = useState(true);
  const [type, setType] = useState("expense");

  const expenseRef = useRef(null);
  const dateRef = useRef(null);
  const amountRef = useRef(null);

  const handlePressEnterAtExpense = (e) => {
    if (e.key === "Enter") {
      dateRef.current.focus();
    } else if (e.key === "ArrowLeft") {
      amountRef.current.focus();
    } else if (e.key === "ArrowRight") {
      dateRef.current.focus();
    }
  };

  const handlePressEnterAtDate = (e) => {
    if (e.key === "Enter") {
      amountRef.current.focus();
    } else if (e.key === "ArrowLeft") {
      expenseRef.current.focus();
    } else if (e.key === "ArrowRight") {
      amountRef.current.focus();
    }
  };

  const handlePressEnterAtAmount = (e) => {
    if (e.key === "Enter") {
      handleSetEntries();
      expenseRef.current.focus();
    } else if (e.key === "ArrowLeft") {
      dateRef.current.focus();
    } else if (e.key === "ArrowRight") {
      expenseRef.current.focus();
    }
  };

  const handleSetEntries = (e) => {
    setEntries([
      ...entries,
      {
        id: entries.length + 1,
        transaction: transaction,
        date: date,
        amount: amount,
        type,
      },
    ]);
    handleReset();
  };

  const handleUpdateEntries = () => {
    setEntries(
      entries.map((item) =>
        item.id === selectedEntry.id
          ? { ...item, transaction: transaction, date: date, amount: amount }
          : item
      )
    );
    handleReset();
  };

  const handleRemoveEntry = (id) => {
    setEntries(entries.filter((entries) => entries.id !== id));
  };
  const handleReset = () => {
    setTransaction("");
    setDate("");
    setAmount("");
    setUpdateDisable(true);
    setAddDisable(false);
    setCancelDisable(true);
  };

  const handleEditEntry = (id) => {
    const entryToEdit = entries.find((entries) => entries.id === id);
    setSelectedEntry(entryToEdit);
    setTransaction(entryToEdit.transaction);
    setDate(entryToEdit.date);
    setAmount(entryToEdit.amount);
    setAddDisable(true);
    setUpdateDisable(false);
    setCancelDisable(false);
  };

  return (
    <div>
      <h1>CashFlow Tracker</h1>
      <div className="entries-container">
        <div className={`header`}>
          <div className="sn">
            <span>SN</span>
          </div>
          <div className="transaction">
            <span>Transaction</span>
          </div>
          <div className="date">
            <span>Date</span>
          </div>
          <div className="amount">
            <span>Amount</span>
          </div>
          <div className="actions">
          </div>
        </div>
        {entries.map((s) => (
          <div
            key={s.id}
            className={`${selectedEntry?.id === s.id ? "selected-entry" : ""
              } entry`}
          >
            <div className="sn">
              <span>{s.id} </span>
            </div>
            <div className="transaction">
              <span>{s.transaction}</span>
            </div>
            <div className="date">
              <span>{s.date}</span>
            </div>
            <div className="amount">
              <span>{formatter.format(s.amount)}</span>
            </div>
            <div className="actions">
              <AiTwotoneEdit
                color="blue"
                size={15}
                onClick={() => handleEditEntry(s)}
              />
              <FaTrash
                color="red"
                size={15}
                onClick={() => handleRemoveEntry(s.id)}
              />
            </div>
          </div>
        ))}
        <li>
          <span>Total Expenses - </span>
          <span>
            {formatter.format(
              entries
                .filter((a) => a.type === "expense")
                .reduce((a, v) => a + +v.amount, 0)
            )}
          </span>
        </li>
        <li>
          <span>Total Income - </span>
          <span>
            {formatter.format(
              entries
                .filter((a) => a.type === "income")
                .reduce((a, v) => a + +v.amount, 0)
            )}
          </span>
        </li>
        <li>
          <span>Net Balance - </span>
          <span>
            {formatter.format(
              entries.reduce(
                (a, v) => (v.type === "income" ? a + +v.amount : a - +v.amount),
                0
              )
            )}
          </span>
        </li>
      </div>


      <form action="">
        <label htmlFor="type">
          <input
            type="checkbox"
            id="type"
            onChange={(e) => setType(type === "expense" ? "income" : "expense")}
          />
          <span>{type.toUpperCase()}</span>
        </label>
        <input
          autoFocus
          placeholder="Enter transaction"
          onKeyUp={handlePressEnterAtExpense}
          value={transaction}
          ref={expenseRef}
          onChange={(e) => {
            setTransaction(e.target.value);
          }}
          type="text"
        />
        <input
          onKeyUp={handlePressEnterAtDate}
          value={date}
          ref={dateRef}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          type="date"
        />
        <input
          onKeyUp={handlePressEnterAtAmount}
          placeholder="Enter Amount"
          value={amount}
          ref={amountRef}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          type="text"
        />
        {cancelDisable ? null : <button onClick={handleReset}>x</button>}
      </form>
      {addDisable ? null : (
        <button disabled={addDisable} onClick={handleSetEntries}>
          Add
        </button>
      )}
      {updateDisable ? null : (
        <button disabled={updateDisable} onClick={handleUpdateEntries}>
          Update
        </button>
      )}
      <button
        onClick={() => {
          setEntries([]);
        }}
      >
        Clear all
      </button>
    </div>
  );
};

export default CashFlowTracker;
