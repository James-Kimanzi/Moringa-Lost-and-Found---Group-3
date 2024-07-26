import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import illustration from '../assets/illustration.svg';
import '../Login.css';

const BASE_URL = 'http://localhost:5000';

const SignupForm = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        role: 'user',
        name: '',
        phone_number: '',
        company: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
        role: Yup.string().oneOf(['user', 'Admin']).required('Required'),
        name: Yup.string().required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        fetch(`${BASE_URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            role: values.role,
            name: values.name,
            phone_number: values.phone_number,
            company: values.company,
          }),
        })
          .then(response => {
            console.log('Response status:', response.status);
            return response.json();
          })
          .then(data => {
            console.log('Response data:', data);
            if (data.token) {
              localStorage.setItem('email', data.email);
              localStorage.setItem('role', values.role);
              alert('Signup successful, please login');
              navigate('/login');
            } else {
              alert(data.error || 'Signup failed');
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
      {({ isSubmitting, values }) => (
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
                  <ErrorMessage name="role" component="div" className="error" />
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
                <div>
                  <label htmlFor="name">Name</label>
                  <Field name="name" type="text" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
                {values.role === 'Admin' && (
                  <>
                    <div>
                      <label htmlFor="phone_number">Phone Number</label>
                      <Field name="phone_number" type="text" />
                      <ErrorMessage name="phone_number" component="div" className="error" />
                    </div>
                    <div>
                      <label htmlFor="company">Company</label>
                      <Field name="company" type="text" />
                      <ErrorMessage name="company" component="div" className="error" />
                    </div>
                  </>
                )}
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing up...' : 'Sign Up'}
                </button>
                <div>
                  <Link to="/login" className="link">Already have an account? Log in</Link>
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
