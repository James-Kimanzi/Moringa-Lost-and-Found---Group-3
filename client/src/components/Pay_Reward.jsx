import React, { useState } from 'react';
import axios from 'axios';
import './components.css';

// const BASE_URL = 'http://127.0.0.1:5000';
const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const Pay_Reward = ({ rewardId }) => {
  const [paymentDetails, setPaymentDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/pay_reward`, {
        reward_id: rewardId,
        payment_details: paymentDetails
      });
      setPaymentDetails('');
    } catch (error) {
      console.error('Error paying reward:', error);
    }
  };

  return (
    <main>
      <h1>Pay Reward</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="payment_details">Payment Details</label>
          <textarea
            id="payment_details"
            name="payment_details"
            value={paymentDetails}
            onChange={(e) => setPaymentDetails(e.target.value)}
            required
          />
        </div>
        <button type="submit">Pay Reward</button>
      </form>
    </main>
  );
};

export default Pay_Reward;
