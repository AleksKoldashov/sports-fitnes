import { Tabs } from '@/ui';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { TABS_EMPLOYEES } from '../config/tabs';

export const AdminEmployess = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  return (
    <div>
      <Tabs
        items={TABS_EMPLOYEES}
        activeId={pathname}
        onTabChange={(path) => navigate(path)}
        position="rigth"
      />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
