import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import NavBar from './NavBar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <div className="admin-dashboard-body">
      <div className="admin-dashboard-sidebar">
        <header className="admin-dashboard-header">
          <h4>Admin Dashboard</h4>

          {userInfo.username && (
            <div>
              <p>Welcome, {userInfo.username}</p>
              <p>{userInfo.role.toUpperCase()}</p>
            </div>
          )}
        </header>

        <nav className="admin-dashboard-nav">
          <ul>
            <li>
              <Link to="/view-lost-reports">Lost Reports</Link>
            </li>
            <li>
              <Link to="/view-found-reports">Found Reports</Link>
            </li>
            <li>
              <Link to="/view-claims">Claims</Link>
            </li>
            <li>
              <Link to="/view-rewards">Rewards</Link>
            </li>
            <li>
              <Link to="/add-item">Add Item</Link>
            </li>
            <li>
              <Link to="/list-item">Items</Link>
            </li>
            <li>
              <Link to="/list-recovered-items">Recovered Items</Link>
            </li>
            <li>
              <Link to="/list-returned-items">Returned Items</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboard;
