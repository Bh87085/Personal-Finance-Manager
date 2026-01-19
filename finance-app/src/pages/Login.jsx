import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);
        window.location.href = "/expenses";
      } else {
        setMsg(data.error || "Login failed");
      }
    } catch {
      setMsg("Server not reachable");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-title">Welcome Back</div>

        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>

        <div
          className="auth-link"
          onClick={() => window.location.href = "/signup"}
        >
          Create Account
        </div>

        <div className="auth-link">Forgot Password?</div>

        {msg && <div className="msg">{msg}</div>}
      </div>
    </div>
  );
}

export default Login;
