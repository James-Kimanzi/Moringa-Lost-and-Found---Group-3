import React, { useState } from 'react';
import axios from 'axios';

// const BASE_URL = 'http://127.0.0.1:5000';
const BASE_URL = 'https://lost-and-found-api-81ox.onrender.com';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/password-reset/password-reset-request`, { email });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        // Server-side error
        if (error.response.status === 400) {
          setMessage('Bad Request: Please ensure your email is in the correct format.');
        } else if (error.response.status === 404) {
          setMessage('Not Found: The email address you provided is not registered.');
        } else if (error.response.status === 500) {
          setMessage('Server Error: There was an issue processing your request. Please try again later.');
        } else {
          setMessage(`Error: ${error.response.data.message || 'An unexpected error occurred.'}`);
        }
      } else if (error.request) {
        // Network error
        setMessage('Network Error: Unable to reach the server. Please check your internet connection.');
      } else {
        // Other errors
        setMessage(`Error: ${error.message || 'An unexpected error occurred.'}`);
      }
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};


const PasswordResetConfirm = () => {
  const { token } = useParams();  // Extract token from URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match. Please make sure both password fields are identical.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/password-reset/password-reset-confirm`, { token, password });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        // Server-side error
        if (error.response.status === 400) {
          setMessage('Bad Request: The password reset token may be invalid or expired.');
        } else if (error.response.status === 404) {
          setMessage('Not Found: The reset link may be incorrect or expired.');
        } else if (error.response.status === 500) {
          setMessage('Server Error: There was an issue processing your request. Please try again later.');
        } else {
          setMessage(`Error: ${error.response.data.message || 'An unexpected error occurred.'}`);
        }
      } else if (error.request) {
        // Network error
        setMessage('Network Error: Unable to reach the server. Please check your internet connection.');
      } else {
        // Other errors
        setMessage(`Error: ${error.message || 'An unexpected error occurred.'}`);
      }
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};


export { PasswordResetRequest, PasswordResetConfirm };




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import '../PasswordReset.css';

// const BASE_URL = 'http://127.0.0.1:5000';

// const PasswordResetRequest = () => {
//     const navigate = useNavigate();
//     const [emailSent, setEmailSent] = useState(false);
//     const [error, setError] = useState('');
  
//     return (
//       <div className="password-reset-container">
//         <h2>Password Reset</h2>
//         {!emailSent ? (
//           <Formik
//             initialValues={{ email: '' }}
//             validationSchema={Yup.object({
//               email: Yup.string().email('Invalid email address').required('Email is required'),
//             })}
//             onSubmit={(values, { setSubmitting }) => {
//               fetch(`${BASE_URL}/password_reset/request`, {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(values),
//               })
//                 .then(response => {
//                   if (response.ok) {
//                     return response.json();
//                   } else {
//                     return response.text().then(text => {
//                       throw new Error(text || 'An error occurred.');
//                     });
//                   }
//                 })
//                 .then(data => {
//                   setEmailSent(true);
//                   setError(''); // Clear error message on successful request
//                 })
//                 .catch(error => {
//                   console.error('Error:', error);
//                   setError(error.message || 'Unable to process the request. Please try again.');
//                 })
//                 .finally(() => {
//                   setSubmitting(false);
//                 });
//             }}
//           >
//             {({ isSubmitting }) => (
//               <Form className="password-reset-form">
//                 <div className="input-group">
//                   <label htmlFor="email">Email</label>
//                   <Field name="email" type="email" placeholder="Enter your email" />
//                   <ErrorMessage name="email" component="div" className="error" />
//                 </div>
//                 {error && <div className="error">{error}</div>}
//                 <button type="submit" disabled={isSubmitting}>
//                   {isSubmitting ? 'Sending...' : 'Send Reset Link'}
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         ) : (
//           <p>If the email is registered, you will receive a password reset link.</p>
//         )}
//       </div>
//     );
//   };
  


// const PasswordResetConfirm = ({ token }) => {
// const navigate = useNavigate();
// const [error, setError] = useState('');

// return (
//     <div className="password-reset-container">
//     <h2>Reset Your Password</h2>
//     <Formik
//         initialValues={{ password: '', confirmPassword: '' }}
//         validationSchema={Yup.object({
//         password: Yup.string().required('Required'),
//         confirmPassword: Yup.string()
//             .oneOf([Yup.ref('password'), null], 'Passwords must match')
//             .required('Required'),
//         })}
//         onSubmit={(values, { setSubmitting }) => {
//         fetch(`${BASE_URL}/password_reset/reset/${token}`, {
//             method: 'POST',
//             headers: {
//             'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(values),
//         })
//             .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 return response.text().then(text => {
//                 throw new Error(text || 'An error occurred.');
//                 });
//             }
//             })
//             .then(data => {
//             alert(data.message || 'Password has been reset successfully!');
//             navigate('/login');
//             setError(''); // Clear error message on successful reset
//             })
//             .catch(error => {
//             console.error('Error:', error);
//             setError(error.message || 'Unable to process the request. Please try again.');
//             })
//             .finally(() => {
//             setSubmitting(false);
//             });
//         }}
//     >
//         {({ isSubmitting }) => (
//         <Form className="password-reset-form">
//             <div className="input-group">
//             <label htmlFor="password">New Password</label>
//             <Field name="password" type="password" placeholder="Enter new password" />
//             <ErrorMessage name="password" component="div" className="error" />
//             </div>
//             <div className="input-group">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <Field name="confirmPassword" type="password" placeholder="Confirm new password" />
//             <ErrorMessage name="confirmPassword" component="div" className="error" />
//             </div>
//             {error && <div className="error">{error}</div>}
//             <button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? 'Resetting...' : 'Reset Password'}
//             </button>
//         </Form>
//         )}
//     </Formik>
//     </div>
// );
// };
  


// export { PasswordResetRequest, PasswordResetConfirm };
