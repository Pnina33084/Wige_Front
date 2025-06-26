import React from 'react';
import EmployeeList from '../components/EmployeeList';
import '../styles/Page.css';

const EmployeesPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>ניהול עובדות</h1>
      <EmployeeList />
    </div>
  );
};

export default EmployeesPage;
