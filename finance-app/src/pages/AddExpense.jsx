import { useState } from "react";

function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const add = async () => {
    const res = await fetch("http://localhost:5000/api/expense/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        title,
        amount,
        category,
        date: new Date(),
        userId: localStorage.getItem("userId")
      })
    });

    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      alert("Expense Added");
      setTitle("");
      setAmount("");
      setCategory("");
    }
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Add Expense</h2>

      <div className="input-row">
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />

        <button className="btn" onClick={add}>Add</button>
      </div>
    </div>
  );
}

export default AddExpense;
