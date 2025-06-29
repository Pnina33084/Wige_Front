import React, { useEffect, useState } from 'react';
import {
  getAllServices,
  createService,
  deleteService,
} from '../services/serviceService';
import { ServiceModel } from '../types';
import '../styles/ServiceList.css';

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [newService, setNewService] = useState({
    serviceName: '',
    durationMinutes: 0,
  });

  const fetchServices = async () => {
    try {
      const response = await getAllServices();
      setServices(response.data);
    } catch (err) {
      console.error('שגיאה בטעינת שירותים', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.serviceName || !newService.durationMinutes) {
      alert('יש למלא את כל השדות');
      return;
    }
    try {
      await createService(newService);
      setNewService({ serviceName: '', durationMinutes: 0 });
      fetchServices();
    } catch (err) {
      console.error('שגיאה ביצירת שירות', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteService(id);
      fetchServices();
    } catch (err) {
      console.error('שגיאה במחיקת שירות', err);
    }
  };

  return (
    <div className="services-container">
      <div className="services-title">שירותים</div>
      <form onSubmit={handleCreate} className="services-form">
        <label>
          שם השירות:
          <input
            type="text"
            placeholder="הכנס שם שירות"
            value={newService.serviceName}
            onChange={(e) => setNewService({ ...newService, serviceName: e.target.value })}
            required
          />
        </label>
        <label>
          משך (בדקות):
          <input
            type="number"
            placeholder="0"
            value={newService.durationMinutes}
            onChange={(e) => setNewService({ ...newService, durationMinutes: Number(e.target.value) })}
            required
            min={1}
          />
        </label>
        <button type="submit">הוספת שירות</button>
      </form>
      <table className="services-table">
        <thead>
          <tr>
            <th>שם שירות</th>
            <th>משך (דקות)</th>
          </tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s.serviceId}>
              <td>{s.serviceName}</td>
              <td>{s.durationMinutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceList;
