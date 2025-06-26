import api from './api';
import { ServiceModel } from '../types';

export const getAllServices = () => api.get<ServiceModel[]>('/Services');
export const createService = (service: Omit<ServiceModel, 'id'>) => api.post('/Services', service);
export const deleteService = (id: number) => api.delete(`/Services/${id}`);