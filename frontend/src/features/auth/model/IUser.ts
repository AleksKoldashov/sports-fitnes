import { TRole } from '@/shared/types/TRole';

export interface IUser {
  id: number;
  email: string;
  role: TRole;
}
