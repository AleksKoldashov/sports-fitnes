import { useEmployees } from '@/entities/employee';
import { Button, Flex, Input, Select } from '@/ui';
import { useState } from 'react';
import { FORM_EMPLOYEE } from './config/form';

export const EmploymentForm = () => {
  const { mutationCreateEmploeeyDirect } = useEmployees();

  const [valueRole, setValueRole] = useState('');

  const handleCreateEmployee = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    // const formData = new FormData(event.currentTarget);
    // const payload = FORM_EMPLOYEE.map((value) => ({
    //   [value.name]: formData.get(value.name),
    // }));
    mutationCreateEmploeeyDirect.mutateAsync({
      firstName: 'Иван',
      lastName: 'Петров',
      patronymic: 'Иванович',
      password: '123456',
      positionId: 1,
      gradeId: 2,
      scheduleType: 'FIXED',
      startTime: '09:00',
      endTime: '18:00',
    });
    console.log('payload', { role: valueRole, ...payload });
  };

  return (
    <form onSubmit={handleCreateEmployee}>
      <Flex direction="column" gap="12" align="start" padding="10x5" max>
        <Select
          options={[
            { value: 'TRAINER', label: 'Тренер по фитнесу' },
            { value: 'TRAINER', label: 'Тренер по футболу' },
            { value: 'TRAINER', label: 'Тренер по боксу' },
            { value: 'TRAINER', label: 'Тренер по пилатесу' },
            { value: 'MANAGER', label: 'Менеджер по продажам' },
            { value: 'MANAGER', label: 'Менеджер по управлению персоналом' },
          ]}
          onChange={(e) => {
            setValueRole(e);
          }}
          value={valueRole}
          label="Выберите должность"
        />
        {FORM_EMPLOYEE.map((field) => (
          <Input {...field} required key={field.id} />
        ))}

        <Button type="submit">принять на работу</Button>
      </Flex>
    </form>
  );
};
