import React, { useState } from 'react';
import './Homepage.css';

const Report = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const [dateReported, setDateReported] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      itemName,
      description,
      reward,
      dateReported,
    };

    // Client-side validation (optional)
    if (!itemName || !description || !reward || !dateReported) {
      setError('All fields are required');
      return;
    }
     // Validate that reward is a number
  if (isNaN(reward) || reward.trim() === '') {
    setError('Reward must be a number');
    return;
  }

    fetch('http://localhost:3000/api/lost-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.message) });
        }
        return response.json();
      })
      .then(data => {
        setSuccess('Item reported successfully!');
        setError('');
        // Optionally, reset the form
        setItemName('');
        setDescription('');
        setReward('');
        setDateReported('');
        console.log('Success:', data);
      })
      .catch((error) => {
        setError(`Error: ${error.message}`);
        setSuccess('');
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="report-lost-item-form">
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <div>
        <label>Item Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Reward:</label>
        <input
          type="text"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date Reported:</label>
        <input
          type="date"
          value={dateReported}
          onChange={(e) => setDateReported(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Report;
