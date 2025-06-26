import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import AppointmentsPage from './pages/AppointmentsPage';
import CustomersPage from './pages/CustomersPage';
import EmployeesPage from './pages/EmployeesPage';
import ServicesPage from './pages/ServicesPage';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul style={{ display: 'flex', gap: 15 }}>
          <li><Link to="/">תורים</Link></li>
          <li><Link to="/customers">לקוחות</Link></li>
          <li><Link to="/employees">עובדים</Link></li>
          <li><Link to="/services">שירותים</Link></li>
        </ul>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<AppointmentsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
