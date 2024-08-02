import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import './NavBar.css';

const NavBar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', { method: 'POST' });
      if (response.ok) {
        setUserInfo(null); // Clear user info from context
        navigate('/login'); // Redirect to login page
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {userInfo ? (
          <>
            {/* <div className="user-info">
              <p>{userInfo.username || 'Username'}</p>
              <p>{userInfo.role ? userInfo.role.toUpperCase() : 'Role'}</p>
            </div> */}
            
            {userInfo.role === 'admin' ? (
              <ul className="navbar-links">
                <li><Link to="/admin/view-lost-reports">Lost Reports</Link></li>
                <li><Link to="/admin/view-found-reports">Found Reports</Link></li>
                <li><Link to="/admin/view-claims">Claims</Link></li>
                <li><Link to="/admin/view-rewards">Rewards</Link></li>
                <li><Link to="/admin/add-item">Add Item</Link></li>
                <li><Link to="/admin/list-items">Items</Link></li>
                <li><Link to="/admin/list-recovered-items">Recovered Items</Link></li>
                <li><Link to="/admin/list-returned-items">Returned Items</Link></li>
                <li><Link to="/login">Logout</Link></li>
              </ul>
            ) : (
              <ul className="navbar-links">
                <li><Link to="/report/lost">Submit Lost Report</Link></li>
                <li><Link to="/report/found">Submit Found Report</Link></li>
                <li><Link to="/report/list-found-reports">Found Reports</Link></li>
                <li><Link to="/report/list-lost-reports">Lost Reports</Link></li>
                <li><Link to="/report/view-my-rewards">View My Rewards</Link></li>
                <li><Link to="/login">Logout</Link></li>
              </ul>
            )}
            {/* <li><Link to="/login">Logout</Link></li> */}
          </>
        ) : (
          <ul className="navbar-links">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;





// import React, { useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import '../Navbar.css';

// const NavBar = () => {
//   const navigate = useNavigate();
//   const location = useLocation(); 
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState('');

//   useEffect(() => {
//     const email = localStorage.getItem('email');
//     const role = localStorage.getItem('role');
//     if (email) {
//       setIsLoggedIn(true);
//       setUserRole(role);
//     } else {
//       setIsLoggedIn(false);
//       setUserRole('');
//     }
//   }, [location]);

//   const handleLogin = (email, role) => {
//     localStorage.setItem('email', email);
//     localStorage.setItem('role', role);
//     setIsLoggedIn(true);
//     setUserRole(role);
//     navigate(getHomeLink(role));
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('email');
//     localStorage.removeItem('role');
//     setIsLoggedIn(false);
//     setUserRole('');
//     navigate('/login');
//   };

//   const getHomeLink = (role) => {
//     if (!isLoggedIn) {
//       return '/';
//     }
//     switch (role) {
//       case 'Admin':
//         return '/foundreports';
//       case 'user':
//         return '/foundreports';
//       default:
//         return '/';
//     }
//   };

//   return (
//     <nav className="navbar">
//       <ul className="nav-links">
//         {isLoggedIn ? (
//           <>
//             <li><Link to="/foundreports">Found Reports</Link></li>
//             {userRole === 'Admin' && (
//               <>
//                 <li><Link to="/lostitems">Lost Items</Link></li>
//               </>
//             )}
//             {userRole === 'user' && (
//               <>
//                 <li><Link to="/report">Report</Link></li>
//               </>
//             )}
//             <li><Link to="/lostitems">Lost Items</Link></li>
//             <li><Link to="/found-items">Found Items</Link></li>
//             <li><Link to="/claims">Claims</Link></li>
//             <li><Link to="/rewards-history">Rewards History</Link></li>
//             <li><Link to="/return-history">Return History</Link></li>
//             <li><button onClick={handleLogout}>Log Out</button></li>
//           </>
//         ) : (
//           <>
//             <li><Link to="/login">Login</Link></li>
//             <li><Link to="/signup">Sign Up</Link></li>
//             <li><Link to="/foundreports">Found Reports</Link></li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default NavBar;
