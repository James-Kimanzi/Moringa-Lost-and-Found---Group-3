import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import NavBar from './NavBar';
import './UserDashboard.css';

const UserDashboard = () => {
  // Access userInfo from UserContext
  const { userInfo } = useContext(UserContext);

  return (
    <div className="user-dashboard-body">
      <div className="user-dashboard-sidebar">
        <header className="user-dashboard-header">
          <h4>User Dashboard</h4>

          {userInfo && userInfo.username && (
            <div>
              <p>Welcome, {userInfo.username}</p>
              <p>{userInfo.role.toUpperCase()}</p>
            </div>
          )}
        </header>
        <nav className="user-dashboard-nav">
          <ul>
            <li>
              <Link to="/lost-report">Submit Lost Report</Link>
            </li>
            <li>
              <Link to="/report/found">Submit Found Report</Link>
            </li>
            <li>
              <Link to="/report/list-found-reports">Found Reports</Link>
            </li>
            <li>
              <Link to="/report/list-lost-reports">Lost Reports</Link>
            </li>
            <li>
              <Link to="/report/view-my-rewards">View My Rewards</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UserDashboard;
