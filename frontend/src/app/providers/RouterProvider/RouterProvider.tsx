import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import {
  ClubMemberProfile,
  DashboardPage,
  FeedPage,
  LandingPage,
  ManagerDashboardPage,
} from '@/pages';
import { AdminEmployess, AdminPage, AdminSetting } from '@/pages/admin';
import { AdminClubMember } from '@/pages/admin/AdminClubMember';
import { EmployeesTable } from '@/widgets/employees-table';
import { EmploymentForm } from '@/widgets/employment-form';

import { AppLayout } from '../../layout/app-layout';
import { AdminRoute } from '../AdminRoute';
import { ProtectedRoute } from '../ProtectedRoute';
import { TrainerRoute } from '../TrainerRoute';

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
            {/* Роуты сотрудников */}
            <Route path="/admin/employess" element={<AdminEmployess />}>
              <Route index element={<Navigate to="table" replace />} />
              <Route path="table" element={<EmployeesTable />} />
              <Route path="employment-form" element={<EmploymentForm />} />
            </Route>
            {/* Роуты членов клубы */}
            <Route path="/admin/club-member" element={<AdminClubMember />} />
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
