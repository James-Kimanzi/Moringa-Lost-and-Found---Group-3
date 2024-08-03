import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import SignUpForm from './components/SignUp';
import LoginForm from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import SubmitFoundReport from './components/SubmitFoundReport';
import FoundReports from './components/FoundReports';
import Footer from './components/Footer.jsx';
import Add_Comment from './components/Add_Comment';
import Add_Item from './components/Add_Item';
import Initiate_Claim from './components/Initiate_Claim';
import List_Item from './components/List_Item';
import List_Lost_Reports from './components/List_Lost_Reports';
import List_Recovered_Items from './components/List_Recovered_Items';
import List_Returned_Items from './components/List_Returned_Items';
import Lost_Report from './components/Lost_Report';
import Offer_Reward from './components/Offer_Reward';
import Pay_Reward from './components/Pay_Reward';
import Receive_Reward from './components/Receive_Reward';
import Rewards_Offered from './components/Rewards_Offered';
import Rewards_Received from './components/Rewards_Received';
import Update_Item from './components/Update_Item';
import View_Claims from './components/View_Claims';
import View_Found_Reports from './components/View_Found_Reports';
import View_Lost_Reports from './components/View_Lost_Reports';
import './components/components.css';

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/report/found" element={<SubmitFoundReport />} />
        <Route path="/report/list-found-reports" element={<FoundReports />} />
        <Route path="/add-comment/:itemId" element={<Add_Comment />} />
        <Route path="/add-item" element={<Add_Item />} />
        <Route path="/initiate-claim/:itemId" element={<Initiate_Claim />} />
        <Route path="/list-item" element={<List_Item />} />
        <Route path="/list-lost-reports" element={<List_Lost_Reports />} />
        <Route path="/list-recovered-items" element={<List_Recovered_Items />} />
        <Route path="/list-returned-items" element={<List_Returned_Items />} />
        <Route path="/lost-report" element={<Lost_Report />} />
        <Route path="/offer-reward/:itemId" element={<Offer_Reward />} />
        <Route path="/pay-reward/:rewardId" element={<Pay_Reward />} />
        <Route path="/receive-reward/:rewardId" element={<Receive_Reward />} />
        <Route path="/rewards-offered" element={<Rewards_Offered />} />
        <Route path="/rewards-received" element={<Rewards_Received />} />
        <Route path="/update-item/:itemId" element={<Update_Item />} />
        <Route path="/view-claims" element={<View_Claims />} />
        <Route path="/view-found-reports" element={<View_Found_Reports />} />
        <Route path="/view-lost-reports" element={<View_Lost_Reports />} />
        <Route path="/" element={<Navigate to="/login" />} /> {/* Default route */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;




// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import SignUpForm from './components/SignUp';
// import LoginForm from './components/Login';
// import AdminDashboard from './components/AdminDashboard';
// import UserDashboard from './components/UserDashboard';
// import SubmitFoundReport from './components/SubmitFoundReport';
// import FoundReports from './components/FoundReports';
// import Footer from './components/Footer.jsx'

// const App = () => {
//   return (
//     <div>
//       <NavBar />
//       <Routes>
//         <Route path="/register" element={<SignUpForm />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/user/dashboard" element={<UserDashboard />} />
//         <Route path="/report/found" element={<SubmitFoundReport />} />
//         <Route path="/report/list-found-reports" element={<FoundReports />} />
//         <Route path="/" element={<Navigate to="/login" />} /> {/* Default route */}
//       </Routes>
//       <Footer />
//     </div>
//   );
// };

// export default App;







// import { AuthProvider } from './AuthContext';
// import PrivateRoute from './PrivateRoute';

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './Navbar/Navbar';
// import Lostitems from './Homepage/Lostitems';
// import Report from './Homepage/Report';
// import Returned from './Homepage/Returned';


// import LoginForm from './components/login.jsx';
// import SignupForm from './components/signup.jsx';
// import Logout from './components/logout.jsx';
// import NavBar from './components/NavBar.jsx';
// import Footer from './components/Footer.jsx';
// import FoundReports from './components/FoundReports.jsx';
// import { PasswordResetRequest, PasswordResetConfirm } from './components/PasswordReset.jsx';


// function App() {
//   return (
//     <div>
//       <NavBar />
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" replace />} />     
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/signup" element={<SignupForm />} />
//         <Route path="/logout" element={<Logout />} />
//         <Route path="/password_reset/request" element={<PasswordResetRequest />} />
//         <Route path="/password_reset/reset/:token" element={<PasswordResetConfirm />} />

//         <Route path="/foundreports" element={<FoundReports />} />
        
//         {/* <Route path="/foundreports" element={<PrivateRoute><FoundReports /></PrivateRoute>} /> */}
//         <Route path="/lostitems" element={<PrivateRoute><Lostitems /></PrivateRoute>} />
//         <Route path="/report" element={<PrivateRoute><Report /></PrivateRoute>} />
//         <Route path="/returned" element={<PrivateRoute><Returned /></PrivateRoute>} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// }

// export default App

