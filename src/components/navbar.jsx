import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className='navbar'>
      <div className='logo'>
        <Link to="/home">Fixed News </Link>
      </div>
      <ul className='navLinks'>
        {!isLoggedIn ? (
          <>
        <li>
          <Link to="/home">Home</Link>
        </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
          <li>
          <Link to="/articles">Articles</Link>
          </li>
            <li>
              <Link to="/history">History</Link>
            </li>
            <li>
              <Link to="/sources">Sources</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logoutButton">Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
