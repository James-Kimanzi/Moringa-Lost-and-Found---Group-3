import React, { useState, useEffect } from 'react';
import './Return.css';

const Returned = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({ item_name: '', description: '', reward: '', date_reported: '' });

  useEffect(() => {
    fetch('http://localhost:3000/api/returned-items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(err => setError(`Error fetching returned items: ${err.message}`));
  }, []);

  const handleDelete = (itemId) => {
    fetch(`http://localhost:3000/api/returned-items/${itemId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setItems(prevItems => prevItems.filter(item => item.id !== itemId)); // Update state to remove deleted item
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  };

  const handleUpdate = () => {
    if (!editItem) return;

    fetch(`http://localhost:3000/api/returned-items/${editItem}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem),
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        setItems(prevItems => prevItems.map(item => (item.id === editItem ? updatedItem : item))); // Update state
        setEditItem(null);
        setUpdatedItem({ item_name: '', description: '', reward: '', date_reported: '' });
      })
      .catch(error => {
        console.error('Error:', error.message);
        setError(`Error updating item: ${error.message}`);
      });
  };

  const handleEditClick = (item) => {
    setEditItem(item.id);
    setUpdatedItem({
      item_name: item.item_name,
      description: item.description,
      reward: item.reward,
      date_reported: item.date_reported,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem(prev => ({ ...prev, [name]: value }));
  };

  const handleReturnToLost = (itemId) => {
    fetch(`http://localhost:3000/api/return-to-lost/${itemId}`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setItems(prevItems => prevItems.filter(item => item.id !== itemId)); // Remove item from the returned items list
      })
      .catch(error => {
        console.error('Error:', error.message);
        setError(`Error returning item: ${error.message}`);
      });
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className='returned-items-container'>
      <h2>Returned Items</h2>
      {items.length > 0 ? (
        items.map(item => (
          <div key={item.id} className="item-container">
            <div className="item-details">
              <div className="item-name">{item.item_name}</div>
              <div className="item-description">{item.description}</div>
              <div className="item-reward">${item.reward}</div>
              <div className="item-date">{item.date_reported}</div>
            </div>
            <div className="item-actions">
              <button onClick={() => handleEditClick(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
              <button onClick={() => handleReturnToLost(item.id)}>Return to Lost Items</button>
            </div>
          </div>
        ))
      ) : (
        <p>No returned items.</p>
      )}

      {editItem && (
        <div className="edit-form">
          <h3>Update Item</h3>
          <input
            type="text"
            name="item_name"
            value={updatedItem.item_name}
            onChange={handleInputChange}
            placeholder="Item Name"
          />
          <input
            type="text"
            name="description"
            value={updatedItem.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <input
            type="number"
            name="reward"
            value={updatedItem.reward}
            onChange={handleInputChange}
            placeholder="Reward"
          />
          <input
            type="date"
            name="date_reported"
            value={updatedItem.date_reported}
            onChange={handleInputChange}
            placeholder="Date Reported"
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditItem(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Returned;
