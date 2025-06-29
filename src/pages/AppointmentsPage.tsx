import React, { useState } from "react";
import Select from "react-select";
import AppointmentList from "../components/AppointmentList";
import "../styles/Page.css";

const customers = [
  { id: 1, name: "שרה כהן" },
  { id: 2, name: "דנה לוי" },
];
const services = [
  { id: 1, name: "פאה" },
  { id: 2, name: "תספורת" },
];
const employees = [
  { id: 1, name: "רונית" },
  { id: 2, name: "אורית" },
];

const AppointmentsPage: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);

  return (
    <div className="page-container">
      <h1>ניהול תורים</h1>
      <form>
        {/* ...שדות תאריך ושעה... */}
        <div style={{ margin: "1rem 0" }}>
          <label>לקוח:</label>
          <Select
            options={customers.map((c) => ({
              value: c.id,
              label: c.name,
            }))}
            value={customers
              .map((c) => ({ value: c.id, label: c.name }))
              .find((opt) => opt.value === selectedCustomer)}
            onChange={(option) => setSelectedCustomer(option ? option.value : null)}
            placeholder="בחר או חפש לקוח"
            isClearable
            isRtl
          />
        </div>
        <div style={{ margin: "1rem 0" }}>
          <label>שירות:</label>
          <Select
            options={services.map((s) => ({
              value: s.id,
              label: s.name,
            }))}
            value={services
              .map((s) => ({ value: s.id, label: s.name }))
              .find((opt) => opt.value === selectedService)}
            onChange={(option) => setSelectedService(option ? option.value : null)}
            placeholder="בחר או חפש שירות"
            isClearable
            isRtl
          />
        </div>
        <div style={{ margin: "1rem 0" }}>
          <label>עובדת:</label>
          <Select
            options={employees.map((e) => ({
              value: e.id,
              label: e.name,
            }))}
            value={employees
              .map((e) => ({ value: e.id, label: e.name }))
              .find((opt) => opt.value === selectedEmployee)}
            onChange={(option) => setSelectedEmployee(option ? option.value : null)}
            placeholder="בחר או חפש עובדת"
            isClearable
            isRtl
          />
        </div>
        {/* ...שאר הטופס... */}
      </form>
      <AppointmentList />
    </div>
  );
};

export default AppointmentsPage;
