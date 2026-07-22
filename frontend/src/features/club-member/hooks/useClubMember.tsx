import { useQuery } from '@tanstack/react-query';
import { clubMemberApi } from '../api';

export const useClubMember = () => {
  return useQuery({
    // здесь будешь менять когда добавим пагинацию
    queryKey: ['club-member', 'all'],
    queryFn: async () => {
      const response = await clubMemberApi.getClubMember();

      return response.data;
    },
  });
};
