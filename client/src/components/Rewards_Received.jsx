import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components.css';

// const BASE_URL = 'http://127.0.0.1:5000';
const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const Rewards_Received = () => {
  const [rewardsReceived, setRewardsReceived] = useState([]);

  useEffect(() => {
    fetchRewardsReceived();
  }, []);

  const fetchRewardsReceived = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/rewards_received`);
      setRewardsReceived(response.data.rewards_received);
    } catch (error) {
      console.error('Error fetching rewards received:', error);
    }
  };

  return (
    <main>
      <h1>Rewards Received</h1>
      <table>
        <thead>
          <tr>
            <th>Reward ID</th>
            <th>Item ID</th>
            <th>Amount</th>
            <th>Details</th>
            <th>Date Received</th>
          </tr>
        </thead>
        <tbody>
          {rewardsReceived.map(reward => (
            <tr key={reward.id}>
              <td>{reward.id}</td>
              <td>{reward.item_id}</td>
              <td>{reward.amount}</td>
              <td>{reward.details}</td>
              <td>{reward.date_received}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Rewards_Received;
