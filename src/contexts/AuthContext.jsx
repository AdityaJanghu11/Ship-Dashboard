import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const hardcodedUsers = [
  { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
  { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123" },
  { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load session from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save user session on change
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = (email, password) => {
    const foundUser = hardcodedUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
