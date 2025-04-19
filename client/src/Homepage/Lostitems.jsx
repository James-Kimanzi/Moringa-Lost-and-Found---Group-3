import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Lostitems = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5500/api/lost')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setItems(data);
        setFilteredItems(data); // Initially, show all items
      })
      .catch(err => setError(`Error fetching items: ${err.message}`));
  }, []);

  useEffect(() => {
    // Filter items based on the search query
    const lowercasedQuery = searchQuery.toLowerCase();
    const newFilteredItems = items
      .filter(item => item.item_name.toLowerCase().includes(lowercasedQuery))
      .sort((a, b) => a.item_name.toLowerCase().indexOf(lowercasedQuery) - b.item_name.toLowerCase().indexOf(lowercasedQuery));
    setFilteredItems(newFilteredItems);
  }, [searchQuery, items]);


  const handleReturn = (itemId) => {
    fetch(`http://localhost:3000/api/mark-returned/${itemId}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setItems(prevItems => prevItems.filter(item => item.id !== itemId)); // Remove item from list
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  };
  const handleDelete = (itemId) => {
    fetch(`http://localhost:3000/api/lost/${itemId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        setItems(prevItems => prevItems.filter(item => item.id !== itemId)); // Update state to remove deleted item
        setFilteredItems(prevItems => prevItems.filter(item => item.id !== itemId)); // Also update filtered items
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className='body-container'>
      <div className="section-one">
        <div className="section-one-left">
          <div className="profile-user">
            <div className="profile-circle">
              <FontAwesomeIcon icon={faUser} style={{ color: "#1b1c1d", fontSize: "35px" }} />
            </div>
            <div className="user-details">
              <h3>Brian Mwangi</h3>
              <p>user</p>
            </div>
          </div>
          <div className="search-inventory">
            <label className="search-label">Search for Lost Item In The Inventory</label>
            <div className="search-input-container">
              <input
                type="search"
                placeholder="Search for items"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
             
            </div>
          </div>
        </div>

        <div className="report-items">
          <NavLink
            to="/report"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <p>Report</p>
          </NavLink>
        </div>
      </div>

      <div className="inventory">
        <h2>Inventory Of Lost Item</h2>
      </div>

      <div className="listing-lost-items">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
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
              <div className="view-button">
              <button onClick={() => handleReturn(item.id)}>Return</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                
              </div>
            </div>
          ))
        ) : (
          <p>No lost items reported.</p>
        )}
      </div>
    </div>
  );
};

export default Lostitems;
