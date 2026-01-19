import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Expenses() {
  const [list, setList] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  const load = () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/expense/list?userId=${userId}`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(e =>
          e.date && e.date.startsWith(month)
        );
        setList(filtered);
      });
  };

  useEffect(load, [month]);

  /* ---------- Summary ---------- */
  const total = list.reduce((a, b) => a + Number(b.amount), 0);

  const byCategory = {};
  list.forEach(e => {
    byCategory[e.category] = (byCategory[e.category] || 0) + Number(e.amount);
  });

  const pieData = {
    labels: Object.keys(byCategory),
    datasets: [
      {
        data: Object.values(byCategory),
        backgroundColor: [
          "#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#6b7280"
        ]
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { boxWidth: 12, font: { size: 12 } }
      }
    }
  };

  /* ---------- Daily Trend ---------- */
  const byDay = {};
  list.forEach(e => {
    const d = e.date.slice(8, 10);
    byDay[d] = (byDay[d] || 0) + Number(e.amount);
  });

  const barData = {
    labels: Object.keys(byDay),
    datasets: [
      {
        label: "Daily Spending",
        data: Object.values(byDay),
        backgroundColor: "#60a5fa"
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div>
      <div className="expense-header">
        <h2>Your Expenses</h2>
        <input
          className="month-picker"
          type="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
        />
      </div>

      {/* Summary */}
      <div className="summary-cards full-row">
        <div className="summary-card">
          <h4>Total Spent</h4>
          <p>₹{total}</p>
        </div>
        <div className="summary-card">
          <h4>Top Category</h4>
          <p>{Object.keys(byCategory)[0] || "-"}</p>
        </div>
        <div className="summary-card">
          <h4>Total Transactions</h4>
          <p>{list.length}</p>
        </div>
      </div>

      {/* Graphs */}
      <div className="graph-section full-row">
        <div className="graph-card">
          <h4>Spending by Category</h4>
          <div className="chart-box">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        <div className="graph-card">
          <h4>Daily Spending Trend</h4>
          <div className="chart-box">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="expense-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {list.map(e => (
              <tr key={e._id}>
                <td>{e.date?.slice(0, 10)}</td>
                <td>{e.title}</td>
                <td>{e.category}</td>
                <td>₹{e.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Expenses;
