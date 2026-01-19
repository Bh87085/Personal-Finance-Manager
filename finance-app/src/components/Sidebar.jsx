import { Link } from "react-router-dom";

function Sidebar({ open }) {
  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      <Link to="/expenses">Expenses</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/add">Add Expense</Link>
      <Link to="/goals">Goals</Link>
      <Link to="/budget">Budget</Link>
      <Link to="/reports">Reports</Link>
      <Link to="/import">Auto Import</Link>
    </div>
  );
}

export default Sidebar;
