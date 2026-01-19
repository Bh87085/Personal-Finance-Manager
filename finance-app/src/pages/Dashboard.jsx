import { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
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

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [goals, setGoals] = useState([]);

 useEffect(() => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Load expenses
  fetch(`http://localhost:5000/api/expense/list?userId=${userId}`, {
    headers: { Authorization: "Bearer " + token }
  })
    .then(r => r.json())
    .then(setExpenses);

  // Load budget
  fetch(`http://localhost:5000/api/budget/get?userId=${userId}`, {
    headers: { Authorization: "Bearer " + token }
  })
    .then(r => r.json())
    .then(data => {
      if (data?.limit) setBudget(data.limit);
      else setBudget(0);
    });

}, []);


  const totalSpent = expenses.reduce((a, b) => a + Number(b.amount), 0);
  const totalTransactions = expenses.length;
  const remaining = budget - totalSpent;

  /* Category Summary */
  const byCategory = {};
  expenses.forEach(e => {
    byCategory[e.category] = (byCategory[e.category] || 0) + Number(e.amount);
  });

  const colors = ["#3b82f6","#ef4444","#10b981","#f59e0b","#8b5cf6","#6b7280"];

  const donutData = {
    labels: Object.keys(byCategory),
    datasets: [
      {
        data: Object.values(byCategory),
        backgroundColor: colors
      }
    ]
  };

  /* Daily stacked bars */
  const days = {};
  expenses.forEach(e => {
    const d = e.date.slice(8,10);
    if (!days[d]) days[d] = {};
    days[d][e.category] = (days[d][e.category] || 0) + Number(e.amount);
  });

  const categories = Object.keys(byCategory);

  const barData = {
    labels: Object.keys(days),
    datasets: categories.map((c,i)=>({
      label: c,
      data: Object.keys(days).map(d => days[d][c] || 0),
      backgroundColor: colors[i % colors.length]
    }))
  };

  /* Goals */
  const shortGoal = goals.find(g => g.type === "short");
  const longGoal = goals.find(g => g.type === "long");

  const shortPercent = shortGoal
    ? (shortGoal.savedAmount / shortGoal.targetAmount) * 100
    : 0;

  const longPercent = longGoal
    ? (longGoal.savedAmount / longGoal.targetAmount) * 100
    : 0;

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Top Cards */}
      <div className="summary-cards">
        <div className="summary-card"><h4>Total Spent</h4><p>₹{totalSpent}</p></div>
        <div className="summary-card"><h4>Total Transactions</h4><p>{totalTransactions}</p></div>
        <div className="summary-card"><h4>Total Budget</h4><p>₹{budget}</p></div>
        <div className="summary-card"><h4>Budget Remaining</h4><p>₹{remaining}</p></div>
      </div>

      {/* Charts */}
      <div className="graph-section">
        <div className="graph-card">
          <h4>Spending by Category</h4>
          <div className="chart-box">
            <Doughnut
  data={donutData}
  options={{
    plugins: {
      legend: {
        position: "right",   // legend on right  side
        labels: {
          boxWidth: 14,
          padding: 12,
          font: { size: 12 }
        }
      }
    }
  }}
/>

          </div>
        </div>

        <div className="graph-card">
          <h4>Daily Spending Trend</h4>
          <div className="chart-box">
            <Bar
              data={barData}
              options={{
                responsive: true,
                scales: {
                  x: { stacked: true },
                  y: { stacked: true }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="goal-section">
        {shortGoal && (
          <div className="goal-card">
            <h4>Short-term Goal: {shortGoal.title}</h4>
            <div className="goal-bar">
              <div style={{ width: `${shortPercent}%` }} />
            </div>
            <small>₹{shortGoal.savedAmount} / ₹{shortGoal.targetAmount}</small>
          </div>
        )}

        {longGoal && (
          <div className="goal-card">
            <h4>Long-term Goal: {longGoal.title}</h4>
            <div className="goal-bar">
              <div style={{ width: `${longPercent}%` }} />
            </div>
            <small>₹{longGoal.savedAmount} / ₹{longGoal.targetAmount}</small>
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="expense-table">
        <h4>Recent Transactions</h4>
        <table>
          <thead>
            <tr><th>Date</th><th>Category</th><th>Title</th><th>Amount</th></tr>
          </thead>
          <tbody>
            {expenses.slice(0,5).map(e=>(
              <tr key={e._id}>
                <td>{e.date.slice(0,10)}</td>
                <td>{e.category}</td>
                <td>{e.title}</td>
                <td>₹{e.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
