import type { TAuthResponse } from '@features/auth/model';
import { apiClient } from '@shared/api/apiClient';

export interface IRegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  age: number;
}

export interface ILoginData {
  email: string;
  password: string;
}

export const authApi = {
  register: (data: IRegisterData) =>
    apiClient.post<TAuthResponse>('/auth/register', data),

  login: (data: ILoginData) =>
    apiClient.post<TAuthResponse>('/auth/login', data),
};
