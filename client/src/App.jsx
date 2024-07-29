

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Lostitems from './Homepage/Lostitems';
import Report from './Homepage/Report';
import Returned from './Homepage/Returned';
import Footer from './Footer/Footer';

import LoginForm from './components/login.jsx';
import SignupForm from './components/signup.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
     <Route path='/' element={<Lostitems />} />
        <Route path='/report' element={<Report />} />
        <Route path='/returned' element={<Returned />} />
        <Route path="/" element={<Navigate to="/login" replace />} />     
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
      <Footer />
    </div>
  );
}



export default App

