import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SubmitFoundReport.css';

const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const SubmitFoundReport = () => {
  const [formData, setFormData] = useState({
    item_name: '',
    item_id: '',
    date_found: '',
    time_found: '',
    place_found: '',
    contact: '',
    description: '',
    primary_color: '',
    secondary_color: '',
    upload_image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, upload_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/report/found`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/user/dashboard');
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      alert('Error submitting found report. Please try again.');
    }
  }

  return (
    <div className="found-reports-container">
      <h1>Submit Found Report</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="item_name">What was found?</label>
        <input type="text" name="item_name" required onChange={handleChange} />

        <label htmlFor="item_id">Item ID</label>
        <input type="text" name="item_id" required onChange={handleChange} />

        <label htmlFor="date_found">Date Found (YYYY-MM-DD)</label>
        <input type="text" name="date_found" required onChange={handleChange} />

        <label htmlFor="time_found">Time Found (HH:MM:SS)</label>
        <input type="text" name="time_found" required onChange={handleChange} />

        <label htmlFor="place_found">Place Found</label>
        <input type="text" name="place_found" required onChange={handleChange} />

        <label htmlFor="contact">Contact Information</label>
        <input type="text" name="contact" required onChange={handleChange} />

        <label htmlFor="description">Any thing else you'd like to share?</label>
        <textarea name="description" onChange={handleChange}></textarea>

        <label htmlFor="primary_color">Primary Color</label>
        <input type="text" name="primary_color" required onChange={handleChange} />

        <label htmlFor="secondary_color">Secondary Color</label>
        <input type="text" name="secondary_color" onChange={handleChange} />

        <label htmlFor="upload_image">Upload image of the item found</label>
        <input type="file" name="upload_image" onChange={handleFileChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitFoundReport;
