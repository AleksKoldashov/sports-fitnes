import {
  AdminPage,
  ClubMemberProfile,
  DashboardPage,
  FeedPage,
  LandingPage,
  ManagerDashboardPage,
} from '@/pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminRoute } from '../AdminRoute';
import { ProtectedRoute } from '../ProtectedRoute';
import { TrainerRoute } from '../TrainerRoute';
import { AppLayout } from './ui/AppLayout';

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/club-member" element={<ClubMemberProfile />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>

        <Route element={<TrainerRoute />}>
          <Route path="/trainer/dashboard" element={<DashboardPage />} />
          <Route path="/manager/dashboard" element={<ManagerDashboardPage />} />
        </Route>

        <Route path="*" element={<div>404 - Страница не найдена</div>} />
      </Routes>
    </BrowserRouter>
  );
};
