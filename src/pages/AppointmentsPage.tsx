import React from 'react';
import AppointmentList from '../components/AppointmentList';
import '../styles/Page.css';

const AppointmentsPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>ניהול תורים</h1>
      <AppointmentList />
    </div>
  );
};

export default AppointmentsPage;
