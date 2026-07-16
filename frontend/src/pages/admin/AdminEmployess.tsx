import { TABS_EMPLOYEES } from '@/features/employees/const';
import { useEmployees } from '@/features/employees/hooks/useEmployees';
import { EmployeesTable } from '@/features/employees/ui/EmployeesTable';
import { EmploymentForm } from '@/features/employees/ui/EmploymentForm';
import { Loader, Tabs } from '@/ui';
import { useState } from 'react';

export const AdminEmployess = () => {
  const { data, isLoading, isError, error } = useEmployees();

  const [tab, setTab] = useState('1');

  if (isLoading) return <Loader />;
  if (isError) return <>{error.message}</>;
  if (!data) return <>Список сотрудников пуст</>;

  return (
    <div>
      <Tabs
        items={TABS_EMPLOYEES}
        activeId={tab}
        onTabChange={setTab}
        position="rigth"
      />
      <div>
        {tab === '1' && (
          <EmployeesTable data={data.data} pagination={data.pagination} />
        )}
        {tab === '2' && <EmploymentForm />}
      </div>
    </div>
  );
};
