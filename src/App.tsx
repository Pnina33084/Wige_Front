import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AppointmentsPage from './pages/AppointmentsPage';
import CustomersPage from './pages/CustomersPage';
import EmployeesPage from './pages/EmployeesPage';
import ServicesPage from './pages/ServicesPage';
import HomePage from './pages/HomePage'; // Import HomePage component
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Add route for HomePage */}
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
