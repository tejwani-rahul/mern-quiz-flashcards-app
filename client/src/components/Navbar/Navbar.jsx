import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (err) {
        console.error('Invalid token:', err);
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/report">Report</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </div>

      {/* Mobile-only logo */}
       <div className="nav-logo-mobile">
        <Link to="/">Quiz App</Link>
      </div>
      
      {/* Simple Hamburger Button */}
      <button className="hamburger-btn" onClick={toggleMenu}>
        {isMenuOpen ? 'x' : '☰'}
      </button>

      <div className="nav-right">
        {role === 'admin' && (
          <div className="dropdown">
            <button className="dropbtn">Admin ▼</button>
            <div className="dropdown-content">
              <Link to="/admin/users">Manage Users</Link>
              <Link to="/admin/topics">Manage Topics</Link>
              <Link to="/admin/reports">All Reports</Link>
            </div>
          </div>
        )}
        <div>
          <button className="logout-link" onClick={handleLogout}>Log Out</button>
        </div>
      </div>

      {/* Simple Mobile Menu */}
      <div className={`mobile-nav ${isMenuOpen ? 'show' : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/report" onClick={() => setIsMenuOpen(false)}>Report</Link>
        <Link to="/leaderboard" onClick={() => setIsMenuOpen(false)}>Leaderboard</Link>
        
        {role === 'admin' && (
          <div className="mobile-admin-links">
             <div className="mobile-admin-header">Admin</div>
             <Link to="/admin/users" onClick={() => setIsMenuOpen(false)}>Manage Users</Link>
            <Link to="/admin/topics" onClick={() => setIsMenuOpen(false)}>Manage Topics</Link>
            <Link to="/admin/reports" onClick={() => setIsMenuOpen(false)}>All Reports</Link>

          </div>
        )}
        
        <button className="mobile-logout" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;