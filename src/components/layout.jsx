import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const Layout = () => {
    const navigate = useNavigate();
  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log("Logged out successfully");
    Swal.fire({
      title: 'Logout',
      text: 'Logged out successfully',
      icon: 'success',
    }).then(() => {
        navigate('/login');
    });
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn()} handleLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
