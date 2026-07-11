import { apiClient } from '@shared/api/apiClient';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IUser } from './IUser';
import { AUTH_STORAGE_KEY } from './auth.constants';

interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: IUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => {
        set({ user, token, isAuthenticated: true });
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        delete apiClient.defaults.headers.common['Authorization'];
      },
    }),
    { name: AUTH_STORAGE_KEY },
  ),
);
