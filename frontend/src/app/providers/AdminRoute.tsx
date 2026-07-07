import { useAuthStore } from '@features/auth/model/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

export const AdminRoute = () => {
  const { user } = useAuthStore();

  if (!user || (user.role !== 'HR' && user.role !== 'DIRECTOR')) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
