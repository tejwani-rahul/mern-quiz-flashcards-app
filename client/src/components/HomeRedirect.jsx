import { Navigate } from 'react-router-dom';

const HomeRedirect = () => {
  const token = localStorage.getItem('token');

  if (token) {
    // Logged in
    return <Navigate to="/topics" replace />;
  } else {
    // Not logged in
    return <Navigate to="/login" replace />;
  }
};

export default HomeRedirect;
