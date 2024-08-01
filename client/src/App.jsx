import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Lostitems from './Homepage/Lostitems';
import Report from './Homepage/Report';
import Returned from './Homepage/Returned';


import LoginForm from './components/login.jsx';
import SignupForm from './components/signup.jsx';
import Logout from './components/logout.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import FoundReports from './components/FoundReports.jsx';
import { PasswordResetRequest, PasswordResetConfirm } from './components/PasswordReset.jsx';


function App() {
  return (
    <div>
      <NavBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />     
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/password_reset/request" element={<PasswordResetRequest />} />
        <Route path="/password_reset/reset/:token" element={<PasswordResetConfirm />} />

        <Route path="/foundreports" element={<FoundReports />} />
        
        {/* <Route path="/foundreports" element={<PrivateRoute><FoundReports /></PrivateRoute>} /> */}
        <Route path="/lostitems" element={<PrivateRoute><Lostitems /></PrivateRoute>} />
        <Route path="/report" element={<PrivateRoute><Report /></PrivateRoute>} />
        <Route path="/returned" element={<PrivateRoute><Returned /></PrivateRoute>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App

