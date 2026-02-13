export interface AppointmentService {
  id: number;
  comment: string;
  info: string | null;
}

export interface Zita {
  id: number;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  seat: number;
  comment: string;
  info: string | null;
  appoinments_services: AppointmentService[];
}
