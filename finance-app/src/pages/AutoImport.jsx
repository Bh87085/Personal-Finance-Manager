import { useState } from "react";
import Papa from "papaparse";

function AutoImport() {
  const [rows, setRows] = useState([]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        setRows(res.data);
      }
    });
  };

  const uploadAll = async () => {
    for (let r of rows) {
      const title = r.Description || r.Narration || "Imported";
      const amount = r.Amount || r.Debit || 0;
      const date = r.Date || new Date();

      await fetch("http://localhost:5000/api/expense/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          title,
          amount,
          category: "Imported",
          date,
          userId: localStorage.getItem("userId")
        })
      });
    }
    alert("All imported!");
    setRows([]);
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Auto Import from CSV</h2>

      <div className="input-row">
        <input type="file" accept=".csv" onChange={handleFile} />
        {rows.length > 0 && (
          <button className="btn" onClick={uploadAll}>Import All</button>
        )}
      </div>

      <p>Rows loaded: {rows.length}</p>

      {rows.slice(0,5).map((r,i)=>(
        <div key={i}>
          {r.Date || r.date} - {r.Amount || r.amount} - {r.Description || r.title}
        </div>
      ))}
    </div>
  );
}

export default AutoImport;
