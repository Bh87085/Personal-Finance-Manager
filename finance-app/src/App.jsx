import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";
import AutoImport from "./pages/AutoImport";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";


const isAuth = () => localStorage.getItem("token");

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-wrapper">
      {/* Header */}
      {isAuth() && (
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      )}

      <div className="content-wrapper">
        {/* Sidebar */}
        {isAuth() && <Sidebar open={sidebarOpen} />}

        {/* Main content */}
        <div className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/expenses"
              element={isAuth() ? <Expenses /> : <Navigate to="/login" />}
            />
            <Route
              path="/add"
              element={isAuth() ? <AddExpense /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard"
              element={isAuth() ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/goals"
              element={isAuth() ? <Goals /> : <Navigate to="/login" />}
            />
            <Route
              path="/budget"
              element={isAuth() ? <Budget /> : <Navigate to="/login" />}
            />
            <Route
              path="/reports"
              element={isAuth() ? <Reports /> : <Navigate to="/login" />}
            />
            <Route
              path="/import"
              element={isAuth() ? <AutoImport /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={isAuth() ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>

      {/* Footer */}
      {isAuth() && <Footer />}
    </div>
  );
}

export default App;
