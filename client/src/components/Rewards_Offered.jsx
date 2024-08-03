import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components.css';

// const BASE_URL = 'http://127.0.0.1:5000';
const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const Rewards_Offered = () => {
  const [rewardsOffered, setRewardsOffered] = useState([]);

  useEffect(() => {
    fetchRewardsOffered();
  }, []);

  const fetchRewardsOffered = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/rewards_offered`);
      setRewardsOffered(response.data.rewards_offered);
    } catch (error) {
      console.error('Error fetching rewards offered:', error);
    }
  };

  return (
    <main>
      <h1>Rewards Offered</h1>
      <table>
        <thead>
          <tr>
            <th>Reward ID</th>
            <th>Item ID</th>
            <th>Amount</th>
            <th>Details</th>
            <th>Date Offered</th>
          </tr>
        </thead>
        <tbody>
          {rewardsOffered.map(reward => (
            <tr key={reward.id}>
              <td>{reward.id}</td>
              <td>{reward.item_id}</td>
              <td>{reward.amount}</td>
              <td>{reward.details}</td>
              <td>{reward.date_offered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Rewards_Offered;
