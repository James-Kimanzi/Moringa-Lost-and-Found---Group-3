import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components.css';

// const BASE_URL = 'http://127.0.0.1:5000';
const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const List_Lost_Reports = () => {
  const [lostReports, setLostReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLostReports(currentPage);
  }, [currentPage]);

  const fetchLostReports = async (page) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/reports/lost`, { params: { page } });
      setLostReports(response.data.lost_reports);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching lost reports:', error);
    }
  };

  return (
    <main>
      <h1>Lost Reports</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>What was lost</th>
            <th>Description</th>
            <th>Date Lost</th>
            <th>Place Lost</th>
            <th>Contact</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {lostReports.map(report => (
            <tr key={report.id}>
              <td>{report.user_id}</td>
              <td>{report.item_name}</td>
              <td>{report.description}</td>
              <td>{report.date_lost}</td>
              <td>{report.place_lost}</td>
              <td>{report.contact}</td>
              <td>
                <a href={`/provide_comment/${report.item_id}`} className="btn">Comment</a>
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

export default List_Lost_Reports;