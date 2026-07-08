import { AdminPanelPage } from '@/pages/adminPanel/AdminPanelPage';
import { FeedPage } from '@/pages/feed/FeedPage';
import { LandingPage } from '@/pages/landing/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminRoute } from '../AdminRoute';
import { ProtectedRoute } from '../ProtectedRoute';
import { AppLayout } from './ui/AppLayout';

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/feed" element={<FeedPage />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin-panel" element={<AdminPanelPage />} />
        </Route>

        <Route path="*" element={<div>404 - Страница не найдена</div>} />
      </Routes>
    </BrowserRouter>
  );
};
