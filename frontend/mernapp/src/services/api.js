// src/services/api.js
import axios from 'axios';

const api = axios.create({
 baseURL: 'http://localhost:5000/api',
});

export const authenticate = async (email, password) => {
 try {
    const response = await api.post('/authenticate', { email, password });
    return response.data;
 } catch (error) {
    throw error;
 }
};

export const getUserProfile = async (userId) => {
 try {
    const response = await api.get(`/profile/${userId}`);
    return response.data;
 } catch (error) {
    throw error;
 }
};

export const registerUser = async (email, password) => {
 try {
    const response = await api.post('/register', { email, password });
    return response.data;
 } catch (error) {
    throw error;
 }
};

export const updateUserProfile = async (userId, profile) => {
 try {
    const response = await api.put(`/profile/${userId}`, profile);
    return response.data;
 } catch (error) {
    throw error;
 }
};

export const logout = async () => {
 try {
    const response = await api.post('/logout');
    return response.data;
 } catch (error) {
    throw error;
 }
};
