import React, { useEffect, useState } from 'react';
import {
  getAllCustomers,
  deleteCustomer,
} from '../services/customerService';
import { CustomerModel } from '../types';
import '../styles/CustomerList.css';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await getAllCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCustomer(id);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="customer-list">
      <h2>רשימת לקוחות</h2>
      <table>
        <thead>
          <tr>
            <th>שם</th>
            <th>טלפון</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>
                <button onClick={() => handleDelete(c.id)}>🗑️ מחיקה</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
