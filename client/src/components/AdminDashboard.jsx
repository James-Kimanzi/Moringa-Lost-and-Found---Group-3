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
              <Link to="/admin/view-lost-reports">Lost Reports</Link>
            </li>
            <li>
              <Link to="/admin/view-found-reports">Found Reports</Link>
            </li>
            <li>
              <Link to="/admin/view-claims">Claims</Link>
            </li>
            <li>
              <Link to="/admin/view-rewards">Rewards</Link>
            </li>
            <li>
              <Link to="/admin/add-item">Add Item</Link>
            </li>
            <li>
              <Link to="/admin/list-items">Items</Link>
            </li>
            <li>
              <Link to="/admin/list-recovered-items">Recovered Items</Link>
            </li>
            <li>
              <Link to="/admin/list-returned-items">Returned Items</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboard;
