import React from 'react';
import CustomerList from '../components/CustomerList';
import '../styles/Page.css';

const CustomersPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>ניהול לקוחות</h1>
      <CustomerList />
    </div>
  );
};

export default CustomersPage;
