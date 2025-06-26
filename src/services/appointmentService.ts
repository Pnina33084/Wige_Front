import api from './api';
import { AppointmentModel } from '../types';

export interface AppointmentCreateModel {
  employeeId: number;
  customerId: number;
  appointmentDate: string;
  appointmentTime: string;
  cancellationFee?: number; // אופציונלי
  serviceIds: number[];
}

export const getAllAppointments = () => api.get<AppointmentModel[]>('/Appointments');
export const getAppointmentById = (id: number) => api.get<AppointmentModel>(`/Appointments/${id}`);
export const createAppointment = (appointment: AppointmentCreateModel) =>
  api.post('/Appointments', appointment);
export const updateAppointment = (id: number, appointment: AppointmentModel) =>
  api.put(`/Appointments/${id}`, appointment);
export const deleteAppointment = (id: number) =>
  api.delete(`/Appointments/${id}`);