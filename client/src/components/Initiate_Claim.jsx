import React, { useState } from 'react';
import axios from 'axios';
import './components.css';

// const BASE_URL = 'http://127.0.0.1:5000';
const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const Initiate_Claim = ({ itemId }) => {
  const [claimReason, setClaimReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/initiate_claim`, { item_id: itemId, claim_reason: claimReason });
      setClaimReason('');
    } catch (error) {
      console.error('Error initiating claim:', error);
    }
  };

  return (
    <main>
      <h1>Initiate Claim</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="claim_reason">Claim Reason</label>
          <textarea
            id="claim_reason"
            name="claim_reason"
            value={claimReason}
            onChange={(e) => setClaimReason(e.target.value)}
            required
          />
        </div>
        <button type="submit">Initiate Claim</button>
      </form>
    </main>
  );
};

export default Initiate_Claim;
