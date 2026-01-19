import { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async () => {
    if (!name || !age || !email || !password || !rePassword) {
      setMsg("All fields are required");
      return;
    }

    if (password !== rePassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          age,
          email,
          password
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("Signup successful! Go to Login.");
      } else {
        setMsg(data.error || "Signup failed");
      }
    } catch {
      setMsg("Server not reachable");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-title">Create an Account</div>

        <input
          className="auth-input"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="auth-input"
          type="number"
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
        />

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

        <input
          className="auth-input"
          type="password"
          placeholder="Re-enter Password"
          value={rePassword}
          onChange={e => setRePassword(e.target.value)}
        />

        <button className="auth-button" onClick={handleSignup}>
          Sign Up
        </button>

        <div
          className="auth-link"
          onClick={() => window.location.href = "/login"}
        >
          Back to Login
        </div>

        {msg && <div className="msg">{msg}</div>}
      </div>
    </div>
  );
}

export default Signup;
