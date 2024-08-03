import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components.css';

const BASE_URL = 'http://127.0.0.1:5000';
// const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const View_Claims = () => {
  const [claims, setClaims] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchClaims(currentPage);
  }, [currentPage]);

  const fetchClaims = async (page) => {
    try {
      const response = await axios.get(`${BASE_URL}/view_claims`, { params: { page } });
      setClaims(response.data.claims);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  return (
    <main>
      <h1>View Claims</h1>
      <table>
        <thead>
          <tr>
            <th>Claim ID</th>
            <th>Item ID</th>
            <th>User ID</th>
            <th>Claim Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {claims.map(claim => (
            <tr key={claim.id}>
              <td>{claim.id}</td>
              <td>{claim.item_id}</td>
              <td>{claim.user_id}</td>
              <td>{claim.claim_reason}</td>
              <td>{claim.status}</td>
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

export default View_Claims;
