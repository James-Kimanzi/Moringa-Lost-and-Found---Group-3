import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components.css';

// const BASE_URL = 'http://127.0.0.1:5000';
const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const List_Returned_Items = () => {
  const [returnedItems, setReturnedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchReturnedItems(currentPage);
  }, [currentPage]);

  const fetchReturnedItems = async (page) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/list_returned_items`, { params: { page } });
      setReturnedItems(response.data.returned_items);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching returned items:', error);
    }
  };

  return (
    <main>
      <h1>Returned Items</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Item Description</th>
            <th>Date Returned</th>
          </tr>
        </thead>
        <tbody>
          {returnedItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.date_returned}</td>
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

export default List_Returned_Items;
