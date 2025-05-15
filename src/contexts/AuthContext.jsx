// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Simple login function - replace with real auth logic
  const login = (email, password) => {
    // Example hardcoded users
    const users = [
      { email: "admin@entnt.in", password: "admin123", role: "Admin" },
      { email: "inspector@entnt.in", password: "inspect123", role: "Inspector" },
      { email: "engineer@entnt.in", password: "engineer123", role: "Engineer" }
    ];

    const matchedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      const userData = { email: matchedUser.email, role: matchedUser.role };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  // Logout clears user and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
