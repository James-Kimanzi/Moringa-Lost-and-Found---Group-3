import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Navbar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    if (email) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
      setUserRole('');
    }
  }, [location]);

  const handleLogin = (email, role) => {
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
    setIsLoggedIn(true);
    setUserRole(role);
    navigate(getHomeLink(role));
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/login');
  };

  const getHomeLink = (role) => {
    if (!isLoggedIn) {
      return '/';
    }
    switch (role) {
      case 'Admin':
        return '/foundreports';
      case 'user':
        return '/foundreports';
      default:
        return '/';
    }
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {isLoggedIn ? (
          <>
            <li><Link to="/foundreports">Found Reports</Link></li>
            {userRole === 'Admin' && (
              <>
                <li><Link to="/lostitems">Lost Items</Link></li>
              </>
            )}
            {userRole === 'user' && (
              <>
                <li><Link to="/report">Report</Link></li>
              </>
            )}
            <li><Link to="/lostitems">Lost Items</Link></li>
            <li><Link to="/found-items">Found Items</Link></li>
            <li><Link to="/claims">Claims</Link></li>
            <li><Link to="/rewards-history">Rewards History</Link></li>
            <li><Link to="/return-history">Return History</Link></li>
            <li><button onClick={handleLogout}>Log Out</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/foundreports">Found Reports</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
