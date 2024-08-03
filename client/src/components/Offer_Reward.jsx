import React, { useState } from 'react';
import axios from 'axios';
import './components.css';

// const BASE_URL = 'http://127.0.0.1:5000';
const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const Offer_Reward = ({ itemId }) => {
  const [rewardAmount, setRewardAmount] = useState('');
  const [rewardDetails, setRewardDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/offer_reward`, {
        item_id: itemId,
        reward_amount: rewardAmount,
        reward_details: rewardDetails
      });
      setRewardAmount('');
      setRewardDetails('');
    } catch (error) {
      console.error('Error offering reward:', error);
    }
  };

  return (
    <main>
      <h1>Offer Reward</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reward_amount">Reward Amount</label>
          <input
            type="text"
            id="reward_amount"
            name="reward_amount"
            value={rewardAmount}
            onChange={(e) => setRewardAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reward_details">Reward Details</label>
          <textarea
            id="reward_details"
            name="reward_details"
            value={rewardDetails}
            onChange={(e) => setRewardDetails(e.target.value)}
          />
        </div>
        <button type="submit">Offer Reward</button>
      </form>
    </main>
  );
};

export default Offer_Reward;
