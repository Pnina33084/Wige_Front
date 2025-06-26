import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AppointmentList from './components/AppointmentList';
import CustomerList from './components/CustomerList';
import EmployeeList from './components/EmployeeList';
import ServiceList from './components/ServiceList';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="appointments" element={<AppointmentList />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route path="services" element={<ServiceList />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
