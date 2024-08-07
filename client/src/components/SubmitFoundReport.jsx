import React, { useState } from 'react';
import axios from 'axios';
import './form.css';


// const BASE_URL = 'http://127.0.0.1:5555';

// const BASE_URL = 'http://127.0.0.1:5200';
// const BASE_URL = 'http://127.0.0.1:5000';

const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const SubmitFoundReport = () => {
  const [item_id, setItemId] = useState('');
  const [item_name, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [date_found, setDateFound] = useState('');
  const [time_found, setTimeFound] = useState('');
  const [place_found, setPlaceFound] = useState('');
  const [contact, setContact] = useState('');
  const [primary_color, setPrimaryColor] = useState('');
  const [secondary_color, setSecondaryColor] = useState('');
  const [upload_image, setUploadImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('item_id', parseInt(item_id));
    formData.append('item_name', item_name);
    formData.append('description', description);
    formData.append('date_found', date_found);
    
    // Add seconds to time_found if not provided
    const timeFoundWithSeconds = time_found.length === 5 ? `${time_found}:00` : time_found;
    formData.append('time_found', timeFoundWithSeconds);
    
    formData.append('place_found', place_found);
    formData.append('contact', contact);
    formData.append('primary_color', primary_color);
    formData.append('secondary_color', secondary_color);
    formData.append('upload_image', upload_image);

    // Log form data for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await axios.post(`${BASE_URL}/report/found`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Report submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting found report:', error);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
    }
  };

  return (
    <div className="submit-found-report-container">
      <h1>Submit Found Report</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="item_id">Item ID</label>
          <input
            type="number"
            id="item_id"
            name="item_id"
            value={item_id}
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
            value={item_name}
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
          <label htmlFor="date_found">Date Found</label>
          <input
            type="date"
            id="date_found"
            name="date_found"
            value={date_found}
            onChange={(e) => setDateFound(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time_found">Time Found</label>
          <input
            type="time"
            id="time_found"
            name="time_found"
            value={time_found}
            onChange={(e) => setTimeFound(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="place_found">Place Found</label>
          <input
            type="text"
            id="place_found"
            name="place_found"
            value={place_found}
            onChange={(e) => setPlaceFound(e.target.value)}
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="primary_color">Primary Color</label>
          <input
            type="text"
            id="primary_color"
            name="primary_color"
            value={primary_color}
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="secondary_color">Secondary Color</label>
          <input
            type="text"
            id="secondary_color"
            name="secondary_color"
            value={secondary_color}
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
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default SubmitFoundReport;
