import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/logo.svg';
import illustration from '../assets/illustration.svg';
import '../Login.css';
import { setAuthToken, removeAuthToken } from '../authUtils'; // Import utility functions

const BASE_URL = 'http://127.0.0.1:5000';

const LoginForm = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Set initial values based on localStorage if available
  const initialValues = {
    email: localStorage.getItem('email') || '',
    password: localStorage.getItem('password') || '',
    role: 'user'
  };

  useEffect(() => {
    // Retrieve saved email and password from localStorage
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    if (savedEmail && savedPassword) {
      setRememberMe(true);
    }
  }, []);

  const handleRememberMe = (values) => {
    // Save or remove email and password based on "Remember Me" checkbox
    if (rememberMe) {
      localStorage.setItem('email', values.email);
      localStorage.setItem('password', values.password);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // Send login request to backend
        fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(response => response.json()) // Handle response as JSON
          .then(data => {
            if (data.token) { // Assuming the response includes a token
              setAuthToken(data.token); // Store token using authUtils
              localStorage.setItem('email', values.email); // Store email if needed
              localStorage.setItem('role', values.role); // Store role
              localStorage.setItem('userId', data.userId); // Store userId

              handleRememberMe(values);

              // Redirect based on role
              if (values.role === 'Admin') {
                navigate(values.role === 'Admin' ? '/admin_dashboard' : '/foundreports');
              } else {
                navigate('/foundreports'); // Adjust as needed
              }
            } else {
              alert(data.message || 'Login failed');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            alert(error.message || 'An error occurred. Please try again.');
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
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
            <Form className="login-form">
              <div className='login-div'>
                <h3 className='login-welcome'>Welcome to</h3>
                <h2 className='login-name'>Moringa Lost & Found</h2>

                <div className="input-group">
                  <label htmlFor="role">Role</label>
                  <Field as="select" name="role">
                    <option value="user">User</option>
                    <option value="Admin">Admin</option>
                  </Field>
                </div>
                
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-wrapper">
                    <FaEnvelope className="input-icon" />
                    <Field name="email" type="email" placeholder="Enter your email" />
                  </div>
                  <ErrorMessage name="email" component="div" className="error" />
                </div>

                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <Field name="password" type={isPasswordVisible ? "text" : "password"} placeholder="Enter your password" />
                    <button className='password-hide-show' type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                      {isPasswordVisible ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="error" />
                </div>

                <div className="input-group remember-me">
                  <Field type="checkbox" name="rememberMe" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            
                <div className="forgot-password-link">
                  <Link to="/password_reset/request" className="link">Forgot Password?</Link>
                </div>

                <div>
                  <Link to="/signup" className="link">Are you new here? Sign up</Link>
                </div>

              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
