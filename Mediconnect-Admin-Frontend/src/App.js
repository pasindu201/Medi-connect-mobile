import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Mainview from './Mainview';
import Login from './Login';


function App() {

  // Protect the main view by checking the login status
  const ProtectedRoute = ({ element }) => {
    return localStorage.getItem('isLoggedIn') ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        {/* Route for the Login page */}
        <Route path="/" element={<Login />} />

        {/* Protect MainView by checking if the user is logged in */}
        <Route path="/main" element={<ProtectedRoute element={<Mainview />} />} />


        {/* Redirect any unknown path to the login page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
