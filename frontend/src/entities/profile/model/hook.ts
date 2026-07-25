import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';

export const useProfile = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await userApi.getProfile();

      return response.data;
    },
  });

  return {
    data,
    isError,
    isLoading,
    error,
  };
};
