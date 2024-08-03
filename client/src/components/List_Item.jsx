import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components.css';

// const BASE_URL = 'http://127.0.0.1:5000';
const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const List_Item = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const fetchItems = async (page) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/list_items`, { params: { page } });
      setItems(response.data.items);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${BASE_URL}/admin/items/${itemId}`);
      fetchItems(currentPage);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <main>
      <h1>List of Items</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Item Description</th>
            <th>Returned Status</th>
            <th>Recovered Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.is_returned ? 'Yes' : 'No'}</td>
              <td>{item.is_recovered ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        )}
        <span>Page {currentPage} of {totalPages}</span>
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        )}
      </div>
    </main>
  );
};

export default List_Item;
