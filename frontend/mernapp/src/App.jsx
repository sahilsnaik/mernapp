// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import EmployeeList from './components/EmployeeList/EmployeeList';
import ProfileUpdate from './components/ProfileUpdate/ProfileUpdate';
const App = () => {
 return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/update" element={<ProfileUpdate />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/" element={<div>Welcome to the Employee Management System</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
 );
};

export default App;
