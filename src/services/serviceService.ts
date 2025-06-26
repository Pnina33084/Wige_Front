import api from './api';
import { ServiceModel } from '../types';

export const getAllServices = () => api.get<ServiceModel[]>('/Services');
export const getServiceById = (id: number) => api.get<ServiceModel>(`/Services/${id}`);
export const createService = (service: Omit<ServiceModel, 'serviceId'>) =>
  api.post('/Services', service);
export const updateService = (id: number, service: ServiceModel) => api.put(`/Services/${id}`, service);
export const deleteService = (id: number) => api.delete(`/Services/${id}`);