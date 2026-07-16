import { apiClient } from '@/shared';
import { IEmployeesResponse } from '@/shared/types/IEmployeesResponse';

export const emploeesApi = {
  getEmployees: () => {
    return apiClient.get<IEmployeesResponse>('/admin/employees');
  },
};
