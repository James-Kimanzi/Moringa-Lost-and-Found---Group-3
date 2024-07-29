import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Lostitems from './Homepage/Lostitems';
import Report from './Homepage/Report';
import Returned from './Homepage/Returned';
import Footer from './Footer/Footer';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        
        <Route path='/' element={<Lostitems />} />
        <Route path='/report' element={<Report />} />
        <Route path='/returned' element={<Returned />} />
      </Routes>
     {/* <Footer/> */}
    </div>
  )
}

export default App