import { TRole } from '@/shared/config';

export interface Employee {
  id: string;
  name: string;
  role: string;
  createdAt: string;
  details: any;
}

export interface Daum {
  id: number;
  email: string;
  role: TRole;
  createdAt: string;
  updatedAt: string;
  profile: ProfileEmployee;
}

export interface ProfileEmployee {
  firstName: string;
  lastName: string;
  patronymic: string;
  specialty?: string;
  experience?: number;
  phone?: string;
}
