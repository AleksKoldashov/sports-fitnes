import { Button, Flex, Input, Select } from '@/ui';
import { useState } from 'react';
import { FORM_EMPLOYEE } from '../const';

export const EmploymentForm = () => {
  const [valueRole, setValueRole] = useState('');

  const handleCreateEmployee = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    // const formData = new FormData(event.currentTarget);
    // const payload = FORM_EMPLOYEE.map((value) => ({
    //   [value.name]: formData.get(value.name),
    // }));

    console.log('payload', { role: valueRole, ...payload });
  };

  return (
    <form onSubmit={handleCreateEmployee}>
      <Flex direction="column" gap="12" align="start" padding="10x5" max>
        <Select
          options={[{ value: 'TRAINER', label: 'Тренер' }]}
          onChange={(e) => {
            setValueRole(e);
          }}
          value={valueRole}
          label="Выберите должность"
        />
        {FORM_EMPLOYEE.map((field) => (
          <Input {...field} required />
        ))}

        <Button type="submit">принять на работу</Button>
      </Flex>
    </form>
  );
};
