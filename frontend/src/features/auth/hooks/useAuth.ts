import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi, ILoginData, IRegisterData } from '../api';
import { ROLE_REDIRECTS } from '../model/auth.constants';
import { useAuthStore } from '../model/useAuthStore';

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: IRegisterData) => authApi.register(data),
    onSuccess: (response) => {
      const { user, access_token } = response.data;
      useAuthStore.getState().login(user, access_token);
      navigate(ROLE_REDIRECTS[user.role]);
    },
    onError: (error: any) => {
      // Проверяем, есть ли response
      if (error.response) {
        console.error('Ошибка регистрации (response):', error.response.data);
      } else if (error.request) {
        console.error('Ошибка регистрации (request):', error.request);
      } else {
        console.error('Ошибка регистрации (unknown):', error.message);
      }
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ILoginData) => authApi.login(data),
    onSuccess: (response) => {
      const { user, access_token } = response.data;
      useAuthStore.getState().login(user, access_token);
      console.log('user', user);
      const redirectPath = ROLE_REDIRECTS[user.role];
      navigate(redirectPath);
    },
    onError: (error: any) => {
      console.error('Ошибка входа:', error.response?.data?.message);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    useAuthStore.getState().logout();
    queryClient.clear();
    navigate('/');
  };

  return logout;
};

export const useAuth = () => {
  const { user, isAuthenticated } = useAuthStore();
  return { user, isAuthenticated };
};
