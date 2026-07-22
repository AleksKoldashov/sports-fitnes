import { apiClient } from '@/shared';
import { IEmployeesResponse } from '../types';

export const emploeesApi = {
  getEmployees: () => {
    return apiClient.get<IEmployeesResponse>('/admin/employees');
  },
};
