// לקוח
export interface CustomerModel {
  customerId: number;
  fullName: string;
  phoneNumber: string;
  notes?: string;
}

// עובדת
export interface EmployeeModel {
  employeeId: number;
  name: string;
  role: string;
  workDays: string;
  startHour: string; // HH:mm
  endHour: string;   // HH:mm
}

// שירות
export interface ServiceModel {
  serviceId: number;
  serviceName: string;
  durationMinutes: number;
}

// תור
export interface AppointmentModel {
  appointmentId: number;
  employeeId: number;
  customerId: number;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:mm
  cancellationFee?: number;
  serviceIds: number[];
}
