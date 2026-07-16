import { useQuery } from '@tanstack/react-query';
import { emploeesApi } from '../api';

export const useEmployees = () => {
  return useQuery({
    queryKey: ['admin', 'employees'],
    queryFn: async () => {
      const response = await emploeesApi.getEmployees();

      return response.data;
    },
  });
};
