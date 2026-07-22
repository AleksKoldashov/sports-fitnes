import { apiClient } from '@/shared';
import { IClubMemberResponse } from '../types';

export const clubMemberApi = {
  getClubMember: () => {
    return apiClient.get<IClubMemberResponse>('club-member/all');
  },
};
