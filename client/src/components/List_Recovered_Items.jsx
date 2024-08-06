import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components.css';

// const BASE_URL = 'http://127.0.0.1:5000';
// const BASE_URL = 'http://127.0.0.1:5200';
const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const List_Recovered_Items = () => {
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRecoveredItems(currentPage);
  }, [currentPage]);

  const fetchRecoveredItems = async (page) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/list_recovered_items`, { params: { page } });
      setRecoveredItems(response.data.recovered_items);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching recovered items:', error);
    }
  };

  return (
    <main>
      <h1>Recovered Items</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Item Description</th>
            <th>Date Recovered</th>
          </tr>
        </thead>
        <tbody>
          {recoveredItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.date_recovered}</td>
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

export default List_Recovered_Items;
