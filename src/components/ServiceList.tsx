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
  // אין צורך ב-id ביצירת שירות חדש
  const [newService, setNewService] = useState<Omit<ServiceModel, 'id'>>({ name: '', duration: 0, price: 0 });

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

  const handleCreate = async () => {
    try {
      await createService(newService);
      setNewService({ name: '', duration: 0, price: 0 });
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
    <div className="service-container">
      <h2>שירותים</h2>

      <div className="form-section">
        <input
          type="text"
          placeholder="שם השירות"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="משך (בדקות)"
          value={newService.duration}
          onChange={(e) => setNewService({ ...newService, duration: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="מחיר"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
        />
        <button onClick={handleCreate}>הוספת שירות</button>
      </div>

      <table className="services-table">
        <thead>
          <tr>
            <th>מזהה</th>
            <th>שם</th>
            <th>משך</th>
            <th>מחיר</th>
            <th>מחיקה</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.duration} דק'</td>
              <td>{s.price} ₪</td>
              <td>
                <button onClick={() => handleDelete(s.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceList;
