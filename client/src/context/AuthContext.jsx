// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkToken = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    setIsAuthenticated(false);
    setLoading(false);
    return;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  } catch (err) {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  setLoading(false);
};

  useEffect(() => {
    checkToken();

    const interval = setInterval(checkToken, 10000); // Optional: keep checking
    const handleStorageChange = () => checkToken(); // Listen for token changes in other tabs/windows

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
