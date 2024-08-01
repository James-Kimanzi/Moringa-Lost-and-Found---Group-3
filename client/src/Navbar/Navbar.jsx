import {createContext}from 'react';
import './Navbar.css';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const Navbar = () => {

    
 const[menuOpen, setMenuOpen] = useState(false);

 const handleLinkClick = () => {
    setMenuOpen(false);
  };

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
    }
  }, [location]); // Refresh on location change

  const handleLogin = (email, role) => {
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
    setIsLoggedIn(true);
    setUserRole(role);
    navigate(getHomeLink());
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/login');
  };

  const getHomeLink = () => {
    if (!isLoggedIn) {
      return '/';
    }
    switch (userRole) {
      case 'Admin':
        return '/Admin/lost-reports';
      case 'user':
        return '/lost-items';
      default:
        return '/';
    }
  };


  return (

    <div className='navbar'>

        <Link to='/' className='title'>Lost & Found</Link>

    
      
        <div className='menu' onClick={()=>{
            setMenuOpen(!menuOpen)
        }}>
            
            <span></span>
            <span></span>
            <span></span>
        </div>
        {isLoggedIn && userRole === 'Admin' && (
          <>
            <li><Link to="/Admin/lost-reports">Lost Reports</Link></li>
          </>
        )}
        {isLoggedIn && userRole === 'user' && (
          <>
            <li><Link to="/lost-items">Lost Items</Link></li>
          </>
        )}
        {isLoggedIn ? (
        <ul className= {menuOpen ? "open": ""}>
            <li> 
                <NavLink to='/' onClick={handleLinkClick}>Lost Items</NavLink>
            </li>
            <li>
                <NavLink to='/blog' onClick={handleLinkClick}>Found items</NavLink>
            </li>
            <li>
                <NavLink to='/contact' onClick={handleLinkClick}>Claims</NavLink>
            </li>
            <li> 
                <NavLink to='/faq' onClick={handleLinkClick}>Rewords history</NavLink>
            </li>
            <li>
                <NavLink to='/returned' onClick={handleLinkClick}>Returned History</NavLink>
            </li>
            <li className='buy'>
                <NavLink to='/buy' onClick={handleLinkClick}>Log-Out</NavLink>
            </li>
            
        </ul>
         ) : (
            <ul>
              <li><NavLink to="/login"  onClick={handleLinkClick}>Login</NavLink></li>
              <li><NavLink to="/signup" onClick={handleLinkClick}>Sign Up</NavLink></li>
            </ul>
          )}
        
    </div>
  );
}

export default Navbar;
