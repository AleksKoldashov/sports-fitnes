import { apiClient } from '@/shared';
import { IApiResponse } from '@/shared/types';
import { ICreateEmployeePayload, IEmployeesResponse } from '../types';

export const emploeesApi = {
  /*Получение всего списка сотрудников */
  getEmployees: () => {
    return apiClient.get<IApiResponse<IEmployeesResponse>>('/admin/employees');
  },

  /*Создать сотрудника права директора */
  postEmployeeDirect: (payload: ICreateEmployeePayload) => {
    return apiClient.post('/admin/employees/direct', payload);
  },
};
