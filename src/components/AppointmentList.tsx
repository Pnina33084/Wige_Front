import React, { useEffect, useState } from 'react';
import {
  getAllAppointments,
  createAppointment,
  // deleteAppointment - הוסר
} from '../services/appointmentService';
import { AppointmentModel, CustomerModel, EmployeeModel, ServiceModel } from '../types';
import { getAllCustomers } from '../services/customerService';
import { getAllEmployees } from '../services/employeeService';
import { getAllServices } from '../services/serviceService';
import '../styles/AppointmentList.css';

// מודל ליצירת תור חדש (לא כולל appointmentId)
interface NewAppointment {
  employeeId: number;
  customerId: number;
  appointmentDate: string;
  appointmentTime: string;
  serviceId: number;
  cancellationFee?: number;
}

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentModel[]>([]);
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [newAppointment, setNewAppointment] = useState<NewAppointment>({
    employeeId: 0,
    customerId: 0,
    appointmentDate: '',
    appointmentTime: '',
    serviceId: 0,
  });

  // טען רשימות מזהים קיימים
  useEffect(() => {
    fetchAppointments();
    getAllCustomers().then(res => setCustomers(res.data));
    getAllEmployees().then(res => setEmployees(res.data));
    getAllServices().then(res => setServices(res.data));
  }, []);

  const fetchAppointments = async () => {
    const response = await getAllAppointments();
    setAppointments(response.data);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newAppointment.employeeId ||
      !newAppointment.customerId ||
      !newAppointment.serviceId
    ) {
      alert('יש לבחור עובדת, לקוח ושירות קיימים!');
      return;
    }
    await createAppointment({
      employeeId: newAppointment.employeeId,
      customerId: newAppointment.customerId,
      appointmentDate: newAppointment.appointmentDate,
      appointmentTime: newAppointment.appointmentTime,
      serviceIds: [newAppointment.serviceId],
    });
    fetchAppointments();
    setNewAppointment({
      employeeId: 0,
      customerId: 0,
      appointmentDate: '',
      appointmentTime: '',
      serviceId: 0,
    });
  };

  // פונקציית מחיקה הוסרה

  return (
    <div className="appointments-container">
      <h2>תורים</h2>
      {/* טופס הוספת תור */}
      <form onSubmit={handleCreate}>
        <div className="form-row">
          <label>
            תאריך:
            <input
              type="date"
              value={newAppointment.appointmentDate}
              onChange={(e) => setNewAppointment({ ...newAppointment, appointmentDate: e.target.value })}
              required
            />
          </label>
          <label>
            שעה:
            <input
              type="time"
              value={newAppointment.appointmentTime}
              onChange={(e) => setNewAppointment({ ...newAppointment, appointmentTime: e.target.value })}
              required
            />
          </label>
          <label>
            לקוח:
            <select
              value={newAppointment.customerId}
              onChange={e => setNewAppointment({ ...newAppointment, customerId: Number(e.target.value) })}
              required
            >
              <option value={0}>בחר לקוח</option>
              {customers.map(c => (
                <option key={c.customerId} value={c.customerId}>{c.fullName}</option>
              ))}
            </select>
          </label>
          <label>
            שירות:
            <select
              value={newAppointment.serviceId}
              onChange={e => setNewAppointment({ ...newAppointment, serviceId: Number(e.target.value) })}
              required
            >
              <option value={0}>בחר שירות</option>
              {services.map(s => (
                <option key={s.serviceId} value={s.serviceId}>{s.serviceName}</option>
              ))}
            </select>
          </label>
          <label>
            עובדת:
            <select
              value={newAppointment.employeeId}
              onChange={e => setNewAppointment({ ...newAppointment, employeeId: Number(e.target.value) })}
              required
            >
              <option value={0}>בחר עובדת</option>
              {employees.map(emp => (
                <option key={emp.employeeId} value={emp.employeeId}>{emp.name}</option>
              ))}
            </select>
          </label>
          <button type="submit">הוספת תור</button>
        </div>
      </form>

      <table className="appointments-table">
        <thead>
          <tr>
            <th>מזהה</th>
            <th>תאריך</th>
            <th>שעה</th>
            <th>לקוח</th>
            <th>שירות</th>
            <th>עובדת</th>
            {/* עמודת מחיקה הוסרה */}
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.appointmentId}>
              <td>{a.appointmentId}</td>
              <td>{a.appointmentDate}</td>
              <td>{a.appointmentTime}</td>
              <td>{a.customerId}</td>
              <td>{a.serviceIds && a.serviceIds.join(', ')}</td>
              <td>{a.employeeId}</td>
              {/* כפתור מחיקה הוסר */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
