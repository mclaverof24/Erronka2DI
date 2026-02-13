export interface Bezeroa {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  home_client: boolean;
  info: string | null;
  appoinments?: any[];
  users?: {
    id: number;
    username: string;
    email: string;
    rol: string;
    info: string | null;
  };
}
