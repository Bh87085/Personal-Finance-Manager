import { useEffect, useState } from "react";

function Budget() {
  const [limit, setLimit] = useState("");
  const [info, setInfo] = useState({ limit: 0 });

  const month = new Date().toISOString().slice(0, 7);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const load = () => {
    fetch(`http://localhost:5000/api/budget/get?userId=${userId}&month=${month}`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(r => r.json())
      .then(d => setInfo(d || { limit: 0 }));
  };

  useEffect(load, []);

  const save = async () => {
    await fetch("http://localhost:5000/api/budget/set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        userId,
        month,
        limit
      })
    });
    setLimit("");
    load();
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Monthly Budget</h2>

      <div className="input-row">
        <input value={limit} placeholder="Set budget" onChange={e => setLimit(e.target.value)} />
        <button className="btn" onClick={save}>Save Budget</button>
      </div>

      <p><b>Current Limit:</b> ₹{info.limit}</p>
    </div>
  );
}

export default Budget;
