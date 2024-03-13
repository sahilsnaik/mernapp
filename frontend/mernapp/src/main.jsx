// src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import for React 18
import App from './App';
import './index.css';

// Use ReactDOM.createRoot() for React 18
const root = createRoot(document.getElementById('root'));

root.render(
 <React.StrictMode>
    <App />
 </React.StrictMode>
);
