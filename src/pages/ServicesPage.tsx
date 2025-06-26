import React from 'react';
import ServiceList from '../components/ServiceList';
import '../styles/Page.css';

const ServicesPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>ניהול שירותים</h1>
      <ServiceList />
    </div>
  );
};

export default ServicesPage;
