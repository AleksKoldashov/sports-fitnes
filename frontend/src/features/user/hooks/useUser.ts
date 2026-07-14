import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';

export const useProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      const response = await userApi.getProfile();

      return response.data;
    },
  });
};
