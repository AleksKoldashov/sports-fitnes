import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Типы
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'CLUB_MEMBER' | 'TRAINER' | 'HR' | 'DIRECTOR';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// Создаём стор с persist (сохраняет состояние в localStorage)
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => {
        set({ user, token, isAuthenticated: true });
        // Автоматически подставляем токен в Axios (настроим позже)
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        // Удаляем токен из Axios
        // delete axios.defaults.headers.common['Authorization'];
      },
    }),
    {
      name: 'auth-storage', // Ключ в localStorage
    },
  ),
);
