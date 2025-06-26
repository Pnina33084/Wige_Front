import React, { useEffect, useState } from 'react';
import {
  getAllEmployees,
  createEmployee,
  // deleteEmployee - הוסר
} from '../services/employeeService';
import { EmployeeModel } from '../types';
import '../styles/EmployeeList.css';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    workDays: '',
    startHour: '',
    endHour: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await getAllEmployees();
    setEmployees(response.data);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.role || !newEmployee.workDays || !newEmployee.startHour || !newEmployee.endHour) {
      alert('יש למלא את כל השדות');
      return;
    }
    await createEmployee(newEmployee);
    setNewEmployee({ name: '', role: '', workDays: '', startHour: '', endHour: '' });
    fetchEmployees();
  };

  // פונקציית מחיקה הוסרה

  return (
    <div>
      <h2>רשימת עובדות</h2>
      <form onSubmit={handleCreate} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="שם"
          value={newEmployee.name}
          onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="תפקיד"
          value={newEmployee.role}
          onChange={e => setNewEmployee({ ...newEmployee, role: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="ימי עבודה (למשל: א,ג,ה)"
          value={newEmployee.workDays}
          onChange={e => setNewEmployee({ ...newEmployee, workDays: e.target.value })}
          required
        />
        <input
          type="time"
          placeholder="שעת התחלה"
          value={newEmployee.startHour}
          onChange={e => setNewEmployee({ ...newEmployee, startHour: e.target.value })}
          required
        />
        <input
          type="time"
          placeholder="שעת סיום"
          value={newEmployee.endHour}
          onChange={e => setNewEmployee({ ...newEmployee, endHour: e.target.value })}
          required
        />
        <button type="submit">הוסף עובדת</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>שם</th>
            <th>תפקיד</th>
            <th>ימי עבודה</th>
            <th>שעת התחלה</th>
            <th>שעת סיום</th>
            {/* <th>מחיקה</th> */}
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.employeeId}>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>{emp.workDays}</td>
              <td>{emp.startHour}</td>
              <td>{emp.endHour}</td>
              {/* <td>
                <button onClick={() => handleDelete(emp.employeeId)}>🗑️</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
