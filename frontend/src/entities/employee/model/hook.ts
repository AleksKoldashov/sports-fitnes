import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { emploeesApi } from '../api';

export const useEmployees = () => {
  const queryClient = useQueryClient();

  const {
    data: employees,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const response = await emploeesApi.getEmployees();

      return response.data;
    },
  });

  const mutationCreateEmploeeyDirect = useMutation({
    mutationFn: emploeesApi.postEmployeeDirect,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

  return {
    employees,
    isLoading,
    isError,
    mutationCreateEmploeeyDirect,
  };
};
