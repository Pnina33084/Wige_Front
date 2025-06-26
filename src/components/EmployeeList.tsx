import React, { useEffect, useState } from 'react';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../services/employeeService';
import { EmployeeModel } from '../types';
import '../styles/EmployeeList.css';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [newEmployee, setNewEmployee] = useState<EmployeeModel>({ id: 0, name: '', role: '' });

  const fetchEmployees = async () => {
    const response = await getAllEmployees();
    setEmployees(response.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCreate = async () => {
    await createEmployee(newEmployee);
    fetchEmployees();
    setNewEmployee({ id: 0, name: '', role: '' });
  };

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  return (
    <div className="employee-container">
      <h2>עובדות</h2>

      <div className="form-section">
        <input
          type="text"
          placeholder="שם העובדת"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="תפקיד"
          value={newEmployee.role}
          onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
        />
        <button onClick={handleCreate}>הוספת עובדת</button>
      </div>

      <table className="employees-table">
        <thead>
          <tr>
            <th>מזהה</th>
            <th>שם</th>
            <th>תפקיד</th>
            <th>מחיקה</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.role}</td>
              <td>
                <button onClick={() => handleDelete(e.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
