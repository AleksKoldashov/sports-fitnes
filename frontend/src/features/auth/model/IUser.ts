import { TRole } from '@/shared/config';

export interface IUser {
  id: number;
  email: string;
  role: TRole;
}
