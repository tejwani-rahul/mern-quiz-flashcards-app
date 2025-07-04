import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, role, checkToken, loading } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    checkToken();
  }, [location.pathname]);

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return role === "admin" ? children : <Navigate to="/user/topics" replace />;
};

export default ProtectedAdminRoute;
