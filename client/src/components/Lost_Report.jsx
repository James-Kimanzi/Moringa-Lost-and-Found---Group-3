import React, { useState } from 'react';
import axios from 'axios';
import './components.css';

// const BASE_URL = 'http://127.0.0.1:5000';
// const BASE_URL = 'http://127.0.0.1:5200';
const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const Lost_Report = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [dateLost, setDateLost] = useState('');
  const [timeLost, setTimeLost] = useState(''); // Add state for timeLost
  const [placeLost, setPlaceLost] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/report/lost`, {
        item_name: itemName,
        description,
        date_lost: dateLost,
        time_lost: timeLost, // Include timeLost in the payload
        place_lost: placeLost,
        contact
      });
      console.log('Report submitted:', response.data);
      setItemName('');
      setDescription('');
      setDateLost('');
      setTimeLost(''); // Reset timeLost
      setPlaceLost('');
      setContact('');
    } catch (error) {
      console.error('Error reporting lost item:', error);
    }
  };

  return (
    <main className='lost-report-form'>
      <h1>Report Lost Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="item_name">Item Name</label>
          <input
            type="text"
            id="item_name"
            name="item_name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date_lost">Date Lost</label>
          <input
            type="date"
            id="date_lost"
            name="date_lost"
            value={dateLost}
            onChange={(e) => setDateLost(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time_lost">Time Lost</label> {/* Add time lost field */}
          <input
            type="time"
            id="time_lost"
            name="time_lost"
            value={timeLost}
            onChange={(e) => setTimeLost(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="place_lost">Place Lost</label>
          <input
            type="text"
            id="place_lost"
            name="place_lost"
            value={placeLost}
            onChange={(e) => setPlaceLost(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <button type="submit">Report Lost Item</button>
      </form>
    </main>
  );
};

export default Lost_Report;
