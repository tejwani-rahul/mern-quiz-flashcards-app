import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust path as needed

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* This is where child routes like ReviewQuiz will render */}
      </main>
    </>
  );
}

export default Layout;
