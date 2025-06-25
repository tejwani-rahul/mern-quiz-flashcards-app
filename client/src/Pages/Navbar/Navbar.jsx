import React from 'react';

import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {


// Inside your Navbar component:
const navigate = useNavigate()

const handleLogout = () => {
  localStorage.removeItem("token");     // ❌ Delete the JWT
  navigate("/login");                   // 🔁 Redirect to login page
};


  return (
    <nav className="navbar">
      <Link to="/user/topics">Home</Link>
      <Link to="/report">Report</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link onClick ={handleLogout} to="/login">Log Out</Link>
      {/* <button className="logout-button" onClick={handleLogout}>Logout</button> */}

    </nav>
  );
};

export default Navbar;
