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





  return (
   
    <div className='returned-items-container'>
      <h2>Returned Items</h2>
      {items.length > 0 ? (
        items.map(item => (
         <div className="home-return">
           
              <div key={item.id} className="outer-item-container">
              <div className="inner-item-container">
                <div className="lost-item-name">
                  <span className='container-span-left'>Lost Item</span>
                  <span className='container-span-right'>{item.item_name}</span>
                </div>
                <div className="lost-item-details">
                  <span className='container-span-left'>Description</span>
                  <span className='container-span-right'>{item.description}</span>
                </div>
                <div className="lost-item-reward">
                  <span className='container-span-left'>Reward</span>
                  <span className='container-span-right'>${item.reward}</span>
                </div>
                <div className="lost-item-date">
                  <span className='container-span-left'>Date Reported</span>
                  <span className='container-span-right'>{item.date_reported}</span>
                </div>
              </div>
              
            </div>
            </div>
           
          
          
          
        ))
      ) : (
        <p>No returned items.</p>
      )}
       
      
    </div>
 
  );
};

export default Returned;
