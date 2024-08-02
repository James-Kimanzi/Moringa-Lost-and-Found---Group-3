// src/components/SignUp.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { FaUser, FaLock, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';
import logo from '../assets/logo.svg';
import illustration from '../assets/illustration.svg';
import '../Login.css';

const BASE_URL = 'http://127.0.0.1:5555';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    role: 'user',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert('Passwords do not match!');
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post(`${BASE_URL}/auth/register`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      
      <div className='outer-div'>
        <div className='welcome-logo-div'>
          <img src={logo} className="logo-login" alt="logo" />
          <h1 className='purple-header1'>Lost Something?</h1>
          <h2>Let us know and we will look around</h2>
        </div>
        
        <div className='main-login-div'>
          <div className='illustration-div'>
            <img src={illustration} className="illustration" alt="illustration" />
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className='login-div'>
              <h3 className='login-welcome'>Welcome to</h3>
              <h2 className='login-name'>Moringa Lost & Found</h2>
              <h3 className='login-welcome'>SignUp Form</h3>

              <div className="input-group">
                <label htmlFor="role">Role</label>
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="user">Regular User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="username">Full Name</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input type="text" name="username" placeholder="Enter your full name" required onChange={handleChange} />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input type="email" name="email" placeholder="Enter your email" required onChange={handleChange} />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input type={isPasswordVisible ? "text" : "password"} name="password" placeholder="Enter your password" required onChange={handleChange} />
                  <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    {isPasswordVisible ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="confirm_password">Confirm Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input type={isConfirmPasswordVisible ? "text" : "password"} name="confirm_password" placeholder="Confirm your password" required onChange={handleChange} />
                  <button type="button" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                    {isConfirmPasswordVisible ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>

              <div>
                <Link to="/login" className="link">Already have an account? Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

