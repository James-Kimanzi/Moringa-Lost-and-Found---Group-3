

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Lostitems from './Homepage/Lostitems';
import Report from './Homepage/Report';
import Returned from './Homepage/Returned';


import LoginForm from './components/login.jsx';
import SignupForm from './components/signup.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx'
import { PasswordResetRequest, PasswordResetConfirm } from './components/PasswordReset.jsx'


function App() {
  return (
    <div>
      {/* <NavBar/> */}
      <Navbar />
      <Routes>
     <Route path='/' element={<Lostitems />} />
        <Route path='/report' element={<Report />} />
        <Route path='/returned' element={<Returned />} />
        <Route path="/" element={<Navigate to="/login" replace />} />     
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/password_reset/request" element={<PasswordResetRequest />} />
        <Route path="/password_reset/reset/:token" element={<PasswordResetConfirm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App

