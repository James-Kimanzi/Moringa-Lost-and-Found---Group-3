import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './components/login.jsx';
import SignupForm from './components/signup.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />     
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={Logo} className="logo react" alt="React logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={illustration} className="logo react" alt="React logo" />
//         </a>        <a href="https://react.dev" target="_blank">
//           <img src={background} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App