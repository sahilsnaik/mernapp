// src/components/Employees.jsx
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const Employees = () => {
 const { currentUser } = useContext(AuthContext);
 const [employees, setEmployees] = useState([]);

 useEffect(() => {
    if (currentUser) {
      axios.get('/api/employees', { headers: { 'x-access-token': currentUser.token } })
        .then(response => {
          setEmployees(response.data);
        })
        .catch(error => {
          console.error('Failed to fetch employees:', error);
        });
    }
 }, [currentUser]);

 return (
    <div>
      {employees.map(employee => (
        <div key={employee._id}>
          <h3>{employee.f_Name}</h3>
          <p>{employee.f_Email}</p>
          {/* Add more employee details here */}
        </div>
      ))}
    </div>
 );
};

export default Employees;
