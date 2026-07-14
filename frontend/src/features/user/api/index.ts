import { apiClient, IProfileResponse } from '@/shared';

export const userApi = {
  getProfile: () => {
    return apiClient.get<IProfileResponse>('/user/profile');
  },
};
