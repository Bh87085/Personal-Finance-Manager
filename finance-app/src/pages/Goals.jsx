import { useEffect, useState } from "react";

function Goals() {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [type, setType] = useState("short");
  const [list, setList] = useState([]);
  const [amountMap, setAmountMap] = useState({});

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const load = () => {
    fetch(`http://localhost:5000/api/goal/list?userId=${userId}`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(r => r.json())
      .then(d => setList(d));
  };

  useEffect(load, []);

  const addGoal = async () => {
    await fetch("http://localhost:5000/api/goal/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        userId,
        title,
        targetAmount: target,
        type
      })
    });

    setTitle("");
    setTarget("");
    load();
  };

  const addToGoal = async (id) => {
    await fetch("http://localhost:5000/api/goal/add-amount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        goalId: id,
        amount: amountMap[id]
      })
    });

    setAmountMap({ ...amountMap, [id]: "" });
    load();
  };

  const deleteGoal = async (id) => {
    if (!window.confirm("Delete this goal?")) return;

    await fetch(`http://localhost:5000/api/goal/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    load();
  };

  return (
    <div className="goals-page">
      <h2 className="page-title">Goals</h2>

      <div className="input-row">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Target Amount" value={target} onChange={e => setTarget(e.target.value)} />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="short">Short Term</option>
          <option value="long">Long Term</option>
        </select>
        <button className="btn" onClick={addGoal}>Add Goal</button>
      </div>

      <h3>Your Goals</h3>

      {list.map(g => {
        const percent = Math.min((g.savedAmount / g.targetAmount) * 100, 100);

        return (
          <div key={g._id} className="goal-card">
            <div className="goal-head">
              <b>{g.title}</b> ({g.type})
            </div>

            <div className="goal-bar">
              <div style={{ width: `${percent}%` }} />
            </div>

            <small>₹{g.savedAmount} / ₹{g.targetAmount}</small>

            <div className="input-row">
              <input
                placeholder="Add amount"
                value={amountMap[g._id] || ""}
                onChange={e =>
                  setAmountMap({ ...amountMap, [g._id]: e.target.value })
                }
              />

              <button className="btn" onClick={() => addToGoal(g._id)}>Add</button>

              <button
                className="btn btn-danger"
                onClick={() => deleteGoal(g._id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Goals;
