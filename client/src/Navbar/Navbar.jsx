import React , {createContext, useState}from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {
 const[menuOpen, setMenuOpen] = useState(false);

 const handleLinkClick = () => {
    setMenuOpen(false);
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
        
    </div>
  );
}

export default Navbar;
