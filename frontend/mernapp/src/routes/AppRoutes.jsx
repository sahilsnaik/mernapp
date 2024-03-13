// src/routes/AppRoutes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import EmployeeList from '../components/EmployeeList/EmployeeList';

export const AppRoutes = () => {
 return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/employees" element={<EmployeeList />} />
      <Route path="/" element={<div>Welcome to the Employee Management System</div>} />
    </Routes>
 );
};
