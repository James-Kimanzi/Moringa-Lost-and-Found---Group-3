import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components.css';

const BASE_URL = 'http://127.0.0.1:5000';
// const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const Update_Item = ({ itemId }) => {
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    image: null
  });

  useEffect(() => {
    fetchItemData();
  }, []);

  const fetchItemData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/items/${itemId}`);
      setItemData(response.data);
    } catch (error) {
      console.error('Error fetching item data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', itemData.name);
    formData.append('description', itemData.description);
    if (itemData.image) {
      formData.append('image', itemData.image);
    }

    try {
      await axios.put(`${BASE_URL}/admin/items/${itemId}`, formData);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <main>
      <h1>Update Item</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={itemData.name}
            onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={itemData.description}
            onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setItemData({ ...itemData, image: e.target.files[0] })}
          />
        </div>
        <button type="submit">Update Item</button>
      </form>
    </main>
  );
};

export default Update_Item;
