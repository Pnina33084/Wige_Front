export interface CustomerModel {
  id: number; // עדיף שיהיה חובה
  name: string;
  phone: string;
}

export interface EmployeeModel {
  id: number;
  name: string;
  role: string;
}

export interface ServiceModel {
  id: number;
  name: string;
  duration: number;
  price: number;
}

export interface AppointmentModel {
  appointmentId: number;
  employeeId: number;
  customerId: number;
  appointmentDate: string;
  appointmentTime: string;
  cancellationFee?: number;
  serviceIds: number[];
}
