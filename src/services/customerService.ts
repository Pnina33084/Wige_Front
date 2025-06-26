import api from './api';
import { CustomerModel } from '../types';

export const getAllCustomers = () => api.get<CustomerModel[]>('/Customers');
export const getCustomerById = (id: number) => api.get<CustomerModel>(`/Customers/${id}`);
export const createCustomer = (customer: Omit<CustomerModel, 'customerId'>) =>
  api.post('/Customers', customer);
export const updateCustomer = (id: number, customer: CustomerModel) => api.put(`/Customers/${id}`, customer);
export const deleteCustomer = (id: number) => api.delete(`/Customers/${id}`);