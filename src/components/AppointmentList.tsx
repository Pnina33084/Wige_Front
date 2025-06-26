import React, { useEffect, useState } from 'react';
import {
  getAllAppointments,
  createAppointment,
  deleteAppointment,
} from '../services/appointmentService';
import { AppointmentModel } from '../types';
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
  const [newAppointment, setNewAppointment] = useState<NewAppointment>({
    employeeId: 1, // כאן לשים מזהה עובד קיים ב-DB
    customerId: 1, // אפשר גם כאן לשים מזהה לקוח קיים
    appointmentDate: '',
    appointmentTime: '',
    serviceId: 1, // אפשר גם כאן לשים מזהה שירות קיים
    // cancellationFee: 0,
  });

  const fetchAppointments = async () => {
    const response = await getAllAppointments();
    setAppointments(response.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAppointment({
      employeeId: newAppointment.employeeId,
      customerId: newAppointment.customerId,
      appointmentDate: newAppointment.appointmentDate,
      appointmentTime: newAppointment.appointmentTime,
      serviceIds: [newAppointment.serviceId], // מערך מזהים
      // cancellationFee: newAppointment.cancellationFee,
    });
    fetchAppointments();
    setNewAppointment({
      employeeId: 0,
      customerId: 0,
      appointmentDate: '',
      appointmentTime: '',
      serviceId: 0,
      // cancellationFee: 0,
    });
  };

  const handleDelete = async (id: number) => {
    await deleteAppointment(id);
    fetchAppointments();
  };

  return (
    <div className="appointments-container">
      <h2>תורים</h2>
      {/* דוגמה לטופס הוספת תור */}
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
            מזהה לקוח:
            <input
              type="number"
              placeholder="הכניסו מזהה לקוח"
              value={newAppointment.customerId}
              onChange={(e) => setNewAppointment({ ...newAppointment, customerId: Number(e.target.value) })}
              required
            />
          </label>
          <label>
            מזהה שירות:
            <input
              type="number"
              placeholder="הכניסו מזהה שירות"
              value={newAppointment.serviceId}
              onChange={(e) => setNewAppointment({ ...newAppointment, serviceId: Number(e.target.value) })}
              required
            />
          </label>
          <label>
            מזהה עובדת:
            <input
              type="number"
              placeholder="הכניסו מזהה עובדת"
              value={newAppointment.employeeId}
              onChange={(e) => setNewAppointment({ ...newAppointment, employeeId: Number(e.target.value) })}
              required
            />
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
            <th>מחיקה</th>
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
              <td>
                <button onClick={() => handleDelete(a.appointmentId)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
