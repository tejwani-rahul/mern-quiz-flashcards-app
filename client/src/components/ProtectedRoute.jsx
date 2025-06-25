import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkToken, loading } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    checkToken(); // revalidate on navigation
  }, [location.pathname]);

  if (loading) return null; // could show spinner

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
