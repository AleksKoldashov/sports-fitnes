import { apiClient } from '@/shared';
import { IProfileResponse } from '../types';

export const userApi = {
  getProfile: () => {
    return apiClient.get<IProfileResponse>('/user/profile');
  },
};
