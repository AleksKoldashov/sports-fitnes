import { useMemo } from 'react';

import { Employee } from '@/features/employees/types';

import { useEmployees } from '@/entities/employee';

import { ROLES_NAME } from '@/shared/config';
import { converterDate } from '@/shared/lib/time';

import { Loader, Table } from '@/ui';

import { COLUMNS_EMPLOYEES } from '../config/columns';

export const EmployeesTable = () => {
  const { employees, isError, isLoading } = useEmployees();

  const employeesData: Employee[] = useMemo(() => {
    if (!employees?.data) return [];

    return employees.data.map((user) => ({
      id: `${user.id}`,
      name: `${user.profile.firstName} ${user.profile.lastName} `,
      role: ROLES_NAME[user.role],
      createdAt: converterDate(user.createdAt),
      details: user,
    }));
  }, [employees]);

  if (isLoading) return <Loader />;

  if (isError) return <>ошибка</>;

  return (
    <>
      <Table
        columns={COLUMNS_EMPLOYEES}
        data={employeesData}
        rowKey={(employee) => employee.id}
      />
    </>
  );
};
