import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';
import logo from '../assets/logo.svg';
import illustration from '../assets/illustration.svg';
import '../Login.css';

const BASE_URL = 'http://127.0.0.1:5000';

const SignupForm = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        name: '',
        phone_number: '',
        company: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
        role: Yup.string().oneOf(['user', 'Admin']).required('Required'),
        name: Yup.string().required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        fetch(`${BASE_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.name, // Adjust based on backend expectations
            email: values.email,
            password: values.password,
            confirm_password: values.confirmPassword,
            role: values.role,
            phone_number: values.phone_number,
            company: values.company,
          }),
        })
          .then(response => response.json()) // Parse JSON response
          .then(data => {
            if (data.message) {
              alert('Signup successful, please login');
              navigate('/login');
            } else {
              alert(data.message || 'Signup failed');
            }
            setSubmitting(false);
          })
          .catch(error => {
            console.error('Error occurred:', error);
            alert(`An error occurred: ${error.message}. Please try again.`);
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
                  <label htmlFor="name">Name</label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <Field name="name" type="text" placeholder="Enter your full name" />
                  </div>
                  <ErrorMessage name="name" component="div" className="error" />
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
                  <label htmlFor="phone_number">Phone Number</label>
                  <div className="input-wrapper">
                    <FaPhone className="input-icon" />
                    <Field name="phone_number" type="text" placeholder="Enter your phone number" />
                  </div>
                  <ErrorMessage name="phone_number" component="div" className="error" />
                </div>

                <div className="input-group">
                  <label htmlFor="company">Company</label>
                  <div className="input-wrapper">
                    <FaBuilding className="input-icon" />
                    <Field name="company" type="text" placeholder="Enter your company (optional)" />
                  </div>
                  <ErrorMessage name="company" component="div" className="error" />
                </div>

                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <Field name="password" type={isPasswordVisible ? "text" : "password"} placeholder="Enter your password" />
                    <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                      {isPasswordVisible ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="error" />
                </div>

                <div className="input-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <Field name="confirmPassword" type={isConfirmPasswordVisible ? "text" : "password"} placeholder="Confirm your password" />
                    <button type="button" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                      {isConfirmPasswordVisible ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="error" />
                </div>

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing up...' : 'Sign Up'}
                </button>

                <div>
                  <Link to="/login" className="link">Already have an account? Login</Link>
                </div>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default SignupForm;
