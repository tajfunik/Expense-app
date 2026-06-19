import { useState } from "react";
import "./Login.css";

function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        onLogin({
            token: data.token,
            user: data.user,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
  <form onSubmit={handleSubmit} className="login-form">

    <h2>Login</h2>

    <input
      className="login-input"
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      className="login-input"
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button className="login-button" type="submit">
      Login
    </button>

    <button
      type="button"
      onClick={onSwitchToRegister}
      style={{ marginTop: "10px" }}
    >
      Create account
    </button>
  </form>
);
}

export default Login;