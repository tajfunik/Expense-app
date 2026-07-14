import { useState } from "react";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";



const App = () => {
  
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken || storedToken === "undefined") return "";
    return storedToken;
  });
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") return null;
    return JSON.parse(storedUser);
  });
  const [isRegister, setIsRegister] = useState(false);


  //Login
  const handleLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  };

  if (!token) {
    return isRegister ? (
      <Register 
        onRegister={() => setIsRegister(false)}
      />
    ) : (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setIsRegister(true)}
      />
    );
  }


  return (
  <Dashboard
    token={token}
    user={user}
    onLogout={handleLogout}
  />
);
}

export default App;