import { COLUMNS_EMPLOYEES } from '@/features/employees/config/columns';
import { Employee, IEmployeesResponse } from '@/features/employees/types';
import { ROLES_NAME } from '@/shared';
import { converterDate } from '@/shared/lib/time';

import { Table } from '@/ui';
import { useMemo } from 'react';

export const EmployeesTable = ({ data, pagination }: IEmployeesResponse) => {
  const employeesData: Employee[] = useMemo(() => {
    return data.map((user) => ({
      id: `${user.id}`,
      name: `${user.profile.firstName} ${user.profile.lastName} `,
      role: ROLES_NAME[user.role],
      createdAt: converterDate(user.createdAt),
      details: user,
    }));
  }, []);

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
