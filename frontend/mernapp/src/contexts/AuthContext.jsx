// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { authenticate, registerUser, logout } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [currentUser, setCurrentUser] = useState(null);

 useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify the token and set the current user
      // This step might need adjustment based on your backend implementation
      setCurrentUser({ token });
    }
 }, []);

 const login = async (email, password) => {
    try {
      const response = await authenticate(email, password);
      localStorage.setItem('token', response.token);
      setCurrentUser({ token: response.token });
    } catch (error) {
      console.error('Login failed:', error);
    }
 };

 const register = async (email, password) => {
    try {
      const response = await registerUser(email, password);
      localStorage.setItem('token', response.token);
      setCurrentUser({ token: response.token });
    } catch (error) {
      console.error('Registration failed:', error);
    }
 };

 const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
 };

 return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
 );
};
