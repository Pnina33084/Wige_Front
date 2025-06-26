import api from './api';
import { EmployeeModel } from '../types';

export const getAllEmployees = () => api.get<EmployeeModel[]>('/Employees');
export const getEmployeeById = (id: number) => api.get<EmployeeModel>(`/Employees/${id}`);
export const createEmployee = (employee: Omit<EmployeeModel, 'employeeId'>) =>
  api.post('/Employees', employee);
export const updateEmployee = (id: number, employee: EmployeeModel) => api.put(`/Employees/${id}`, employee);
export const deleteEmployee = (id: number) => api.delete(`/Employees/${id}`);