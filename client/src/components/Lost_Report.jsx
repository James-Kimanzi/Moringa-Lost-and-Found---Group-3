import React, { useState } from 'react';
import axios from 'axios';
import './components.css';

// const BASE_URL = 'http://127.0.0.1:5000';
// const BASE_URL = 'http://127.0.0.1:5200';
const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const Lost_Report = () => {
  const [itemId, setItemId] = useState(''); // Add state for item_id
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [dateLost, setDateLost] = useState('');
  const [timeLost, setTimeLost] = useState('');
  const [placeLost, setPlaceLost] = useState('');
  const [contact, setContact] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');
  const [uploadImage, setUploadImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert timeLost to '%H:%M:%S' format
    const formattedTimeLost = `${timeLost}:00`;

    const formData = new FormData();
    formData.append('item_id', itemId); // Append item_id
    formData.append('item_name', itemName);
    formData.append('description', description);
    formData.append('date_lost', dateLost);
    formData.append('time_lost', formattedTimeLost);
    formData.append('place_lost', placeLost);
    formData.append('contact', contact);
    formData.append('primary_color', primaryColor);
    formData.append('secondary_color', secondaryColor);
    if (uploadImage) {
      formData.append('upload_image', uploadImage);
    }

    try {
      const response = await axios.post(`${BASE_URL}/report/lost`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Report submitted:', response.data);
      setItemId(''); // Reset item_id
      setItemName('');
      setDescription('');
      setDateLost('');
      setTimeLost('');
      setPlaceLost('');
      setContact('');
      setPrimaryColor('');
      setSecondaryColor('');
      setUploadImage(null);
    } catch (error) {
      console.error('Error reporting lost item:', error);
    }
  };

  return (
    <main className='lost-report-form'>
      <h1>Report Lost Item</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="item_id">Item ID</label>
          <input
            type="text"
            id="item_id"
            name="item_id"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="time_lost">Time Lost</label>
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
        <div className="form-group">
          <label htmlFor="primary_color">Primary Color</label>
          <input
            type="text"
            id="primary_color"
            name="primary_color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="secondary_color">Secondary Color</label>
          <input
            type="text"
            id="secondary_color"
            name="secondary_color"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="upload_image">Upload Image</label>
          <input
            type="file"
            id="upload_image"
            name="upload_image"
            onChange={(e) => setUploadImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Report Lost Item</button>
      </form>
    </main>
  );
};

export default Lost_Report;
