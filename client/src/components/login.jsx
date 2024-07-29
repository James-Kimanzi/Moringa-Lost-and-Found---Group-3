import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import illustration from '../assets/illustration.svg';
import '../Login.css';


const BASE_URL = 'http://127.0.0.1:5000';

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', role: 'user' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('No network');
            }
            return response.json();
          })
          .then(data => {
            console.log(data)
            if (data.email) {
              localStorage.setItem('email', data.email);
              localStorage.setItem('role', values.role);
              localStorage.setItem('userId',data.id);
              if (values.role === 'Admin') {
                navigate('/Admin/Lost Reports');
              } else {
                navigate('/Lost Items');
              } 
            } else {
              alert(data.message || 'Login failed');
            }
            setSubmitting(false);
          })
          .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
        <div className='outer-div'>
            <div className='welcome-logo-div'>
                <img src={logo} className="logo-login" alt="logo" />
                <h1 className='purple-header1'>Lost Something?</h1>
                <h2>let us know and we will look around</h2>
            </div>
      
            <div className='main-login-div'>

                <div className='illustration-div'>
                    <img src={illustration} className="illustration" alt="illustration" />
                </div>           

                <Form className="login-form">
                                            
                        <div className='login-div'>
                            <h3 className='login-welcome'>Welcome to</h3>
                            <h2 className='login-name'>Moringa Lost & Found</h2>

                            <div>
                                <label htmlFor="role">Role</label>
                                <Field as="select" name="role">
                                <option value="user">User</option>
                                <option value="Admin">Admin</option>
                                </Field>
                            </div>
                            
                            <div>
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="email" />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" />
                                <ErrorMessage name="password" component="div" className="error" />
                            </div>

                            <button type="submit" disabled={isSubmitting} onClick={handleLogin}>
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>

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
