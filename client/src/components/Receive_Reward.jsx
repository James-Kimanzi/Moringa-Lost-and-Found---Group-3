import React, { useState } from 'react';
import axios from 'axios';
import './components.css';

const BASE_URL = 'http://127.0.0.1:5000';
// const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const Receive_Reward = ({ rewardId }) => {
  const [claimDetails, setClaimDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/receive_reward`, {
        reward_id: rewardId,
        claim_details: claimDetails
      });
      setClaimDetails('');
    } catch (error) {
      console.error('Error receiving reward:', error);
    }
  };

  return (
    <main>
      <h1>Receive Reward</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="claim_details">Claim Details</label>
          <textarea
            id="claim_details"
            name="claim_details"
            value={claimDetails}
            onChange={(e) => setClaimDetails(e.target.value)}
            required
          />
        </div>
        <button type="submit">Receive Reward</button>
      </form>
    </main>
  );
};

export default Receive_Reward;
