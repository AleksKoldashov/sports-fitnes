import {
  AdminPage,
  ClubMemberProfile,
  DashboardPage,
  FeedPage,
  LandingPage,
  ManagerDashboardPage,
} from '@/pages';
import { AdminSetting } from '@/pages/admin/AdminSetting';
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
        <Route element={<AppLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/club-member" element={<ClubMemberProfile />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/setting" element={<AdminSetting />} />
          </Route>

          <Route element={<TrainerRoute />}>
            <Route path="/trainer/dashboard" element={<DashboardPage />} />
            <Route
              path="/manager/dashboard"
              element={<ManagerDashboardPage />}
            />
          </Route>
        </Route>

        <Route path="*" element={<div>404 - Страница не найдена</div>} />
      </Routes>
    </BrowserRouter>
  );
};
