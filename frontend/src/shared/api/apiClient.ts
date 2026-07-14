import { useAuthStore } from '@features/auth/model/useAuthStore';
import axios from 'axios';

// Базовый URL вашего бэкенда
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик запросов: автоматически добавляет токен
apiClient.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Перехватчик ответов: обрабатывает ошибки 401 (неавторизован)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Если токен протух — разлогиниваем
      useAuthStore.getState().logout();
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);
