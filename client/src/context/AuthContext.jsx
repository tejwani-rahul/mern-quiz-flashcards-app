import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); 
  const [loading, setLoading] = useState(true);

  const checkToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setRole(null);
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setRole(null);
      } else {
        setIsAuthenticated(true);
        setRole(decoded.role); 
      }
    } catch (err) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setRole(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    checkToken();
    const interval = setInterval(checkToken, 10000);
    window.addEventListener("storage", checkToken);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, checkToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
