import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../found_reports.css';
import { getAuthToken } from '../authUtils';

const BASE_URL = 'http://127.0.0.1:5000';

const FoundReports = () => {
  const [reports, setReports] = useState([]);
  const [modalData, setModalData] = useState({ action: '', reportId: null });
  const [formData, setFormData] = useState({
    amount: '',
    datePaid: '',
    description: '',
    payerUsername: ''
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get(`${BASE_URL}/report/list_found_reports`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (Array.isArray(response.data)) {
          setReports(response.data);
        } else {
          setError('Unexpected data format received');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('Unauthorized. Please log in.');
          window.location.href = '/login';
        } else {
          setError('Failed to fetch reports');
        }
      }
    };
    fetchReports();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModalOpen = async (action, reportId) => {
    setModalData({ action, reportId });
    if (action === 'Comment') {
      try {
        const token = getAuthToken();
        const response = await axios.get(`${BASE_URL}/report/comments/${reportId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (Array.isArray(response.data)) {
          setComments(response.data);
        } else {
          setError('Unexpected data format received for comments');
        }
      } catch (error) {
        setError('Failed to fetch comments');
      }
    }
  };

  const handleModalClose = () => {
    setModalData({ action: '', reportId: null });
    setFormData({
      amount: '',
      datePaid: '',
      description: '',
      payerUsername: ''
    });
    setSuccessMessage('');
    setError(null);
  };

  const validateForm = () => {
    if (modalData.action === 'Comment' && !formData.description) {
      setError('Comment is required');
      return false;
    }
    if ((modalData.action === 'Offer Reward' || modalData.action === 'Pay Reward' || modalData.action === 'Receive Reward') && !formData.amount) {
      setError('Amount is required');
      return false;
    }
    if ((modalData.action === 'Pay Reward' || modalData.action === 'Receive Reward') && !formData.datePaid) {
      setError('Date is required');
      return false;
    }
    if (modalData.action === 'Receive Reward' && !formData.payerUsername) {
      setError('Payer username is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { action, reportId } = modalData;
    const urlMap = {
      'Claim': `${BASE_URL}/report/initiate_claim/${reportId}`,
      'Offer Reward': `${BASE_URL}/report/offer_reward/${reportId}`,
      'Pay Reward': `${BASE_URL}/report/pay_reward/${reportId}`,
      'Receive Reward': `${BASE_URL}/report/receive_reward/${reportId}`,
      'Comment': `${BASE_URL}/report/comments/provide/${reportId}`
    };

    try {
      const token = getAuthToken();
      const response = await axios.post(urlMap[action], {
        ...formData,
        datePaid: action === 'Pay Reward' || action === 'Receive Reward' ? new Date(formData.datePaid).toISOString().split('T')[0] : formData.datePaid
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 200) {
        setSuccessMessage(`${action} successful`);
        handleModalClose();
        // Refresh the reports list after the action
        const result = await axios.get(`${BASE_URL}/report/list_found_reports`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (Array.isArray(result.data)) {
          setReports(result.data);
        } else {
          setError('Unexpected data format received');
        }
      } else {
        setError(`${action} failed`);
      }
    } catch (error) {
      if (error.response) {
        setError(`${action} failed: ${error.response.data.message}`);
      } else {
        setError(`${action} failed`);
      }
    }
  };

  return (
    <main>
      <h1>Found Reports</h1>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <table>
        <thead>
          <tr>
            <th>What was found</th>
            <th>Additional Info</th>
            <th>Date Found</th>
            <th>Place Found</th>
            <th>Claim</th>
            <th>Offer Reward</th>
            <th>Pay Reward</th>
            <th>Receive Reward</th>
            <th>Return Item</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(reports) && reports.length > 0 ? (
            reports.map(report => (
              <tr key={report.id}>
                <td>{report.item_name}</td>
                <td>{report.description}</td>
                <td>{new Date(report.date_found).toLocaleDateString()}</td>
                <td>{report.place_found}</td>
                <td><button onClick={() => handleModalOpen('Claim', report.id)}>Claim</button></td>
                <td><button onClick={() => handleModalOpen('Offer Reward', report.id)}>Offer Reward</button></td>
                <td><button onClick={() => handleModalOpen('Pay Reward', report.id)}>Pay Reward</button></td>
                <td><button onClick={() => handleModalOpen('Receive Reward', report.id)}>Receive Reward</button></td>
                <td><button onClick={() => handleModalOpen('Return', report.id)}>Return</button></td>
                <td><button onClick={() => handleModalOpen('Comment', report.id)}>Comment</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No reports available</td>
            </tr>
          )}
        </tbody>
      </table>

      {modalData.action && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            {modalData.action === 'Comment' && (
              <>
                <h1>Comment</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="description">Comment:</label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-control"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn">Submit</button>
                </form>
                <section className="comments-section">
                  <h2>Comments</h2>
                  {comments.length > 0 ? (
                    comments.map(comment => (
                      <div className="comment" key={comment.id}>
                        <div className="comment-header">
                          <span className="comment-username">{comment.user ? comment.user.username : 'Unknown'}</span>
                          <span className="comment-timestamp">{new Date(comment.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="comment-content">
                          {comment.content}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No comments yet. Be the first to comment!</p>
                  )}
                </section>
              </>
            )}

            {modalData.action === 'Claim' && (
              <>
                <h1>Initiate Claim</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="description">What proof do you have that this Item is yours?</label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-control"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit">Claim</button>
                </form>
              </>
            )}

            {modalData.action === 'Offer Reward' && (
              <>
                <h1>Offer Reward</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      className="form-control"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit">Offer Reward</button>
                </form>
              </>
            )}

            {modalData.action === 'Pay Reward' && (
              <>
                <h1>Pay Reward</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      className="form-control"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="datePaid">Date Paid:</label>
                    <input
                      id="datePaid"
                      name="datePaid"
                      type="date"
                      className="form-control"
                      value={formData.datePaid}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit">Pay Reward</button>
                </form>
              </>
            )}

            {modalData.action === 'Receive Reward' && (
              <>
                <h1>Receive Reward</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      className="form-control"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="datePaid">Date Received:</label>
                    <input
                      id="datePaid"
                      name="datePaid"
                      type="date"
                      className="form-control"
                      value={formData.datePaid}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="payerUsername">Payer Username:</label>
                    <input
                      id="payerUsername"
                      name="payerUsername"
                      type="text"
                      className="form-control"
                      value={formData.payerUsername}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit">Receive Reward</button>
                </form>
              </>
            )}

            {modalData.action === 'Return' && (
              <>
                <h1>Return Item</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="description">Description of Return:</label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-control"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit">Return Item</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default FoundReports;
