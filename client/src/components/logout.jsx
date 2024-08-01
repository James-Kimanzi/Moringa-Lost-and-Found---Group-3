import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { removeAuthToken } from '../authUtils'; // Import utility function

const Logout = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    removeAuthToken(); // Remove token from local storage
    alert('Successfully logged out, please login');
    navigate('/login'); // Navigate to login page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
