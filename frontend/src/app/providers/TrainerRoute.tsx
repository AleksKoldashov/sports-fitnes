import { useAuthStore } from '@/features/auth';
import { Navigate, Outlet } from 'react-router-dom';

export const TrainerRoute = () => {
  const { user } = useAuthStore();

  if (!user || (user.role !== 'TRAINER' && user.role !== 'MANAGER')) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
