import React, { useEffect, useState } from 'react';
import {
  getAllCustomers,
  deleteCustomer,
  createCustomer,
} from '../services/customerService';
import { CustomerModel } from '../types';
import '../styles/CustomerList.css';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [newCustomer, setNewCustomer] = useState({ fullName: '', phoneNumber: '', notes: '' });

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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.fullName || !newCustomer.phoneNumber) {
      alert('יש למלא שם מלא וטלפון');
      return;
    }
    try {
      await createCustomer(newCustomer);
      setNewCustomer({ fullName: '', phoneNumber: '', notes: '' });
      fetchCustomers();
    } catch (error) {
      alert('שגיאה בהוספת לקוח');
    }
  };

  return (
    <div className="customer-list">
      <h2>רשימת לקוחות</h2>
      <form onSubmit={handleCreate} className="customer-form">
        <label>
          שם מלא:
          <input
            type="text"
            placeholder="הכנס שם מלא"
            value={newCustomer.fullName}
            onChange={e => setNewCustomer({ ...newCustomer, fullName: e.target.value })}
            required
          />
        </label>
        <label>
          טלפון:
          <input
            type="text"
            placeholder="הכנס טלפון"
            value={newCustomer.phoneNumber}
            onChange={e => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
            required
          />
        </label>
        <label>
          הערות (לא חובה):
          <input
            type="text"
            placeholder="הערות"
            value={newCustomer.notes}
            onChange={e => setNewCustomer({ ...newCustomer, notes: e.target.value })}
          />
        </label>
        <button type="submit">הוסף לקוח</button>
      </form>
      <table className="customer-table">
        <thead>
          <tr>
            <th>שם מלא</th>
            <th>טלפון</th>
            <th>הערות</th>
            {/* <th>פעולות</th> */}
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.customerId}>
              <td>{c.fullName}</td>
              <td>{c.phoneNumber}</td>
              <td>{c.notes}</td>
              {/* <td>
                <button onClick={() => handleDelete(c.customerId)}>🗑️ מחיקה</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
