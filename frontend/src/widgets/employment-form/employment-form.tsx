import { useEmployees } from '@/entities/employee';
import { Button, Flex, Input, Select } from '@/ui';
import { RadioGroup } from '@/ui/RadioGroup/RadioGroup';
import { TimePicker } from '@/ui/TimePicker/TimePicker';
import { useState } from 'react';
import { FORM_EMPLOYEE } from './config/form';

// Выносим опции в константы
const SCHEDULE_OPTIONS = [
  { value: 'FIXED', label: 'Пятидневная рабочая неделя' },
  { value: 'FLEXIBLE', label: 'Гибкий график' },
];

export const EmploymentForm = () => {
  const { mutationCreateEmploeeyDirect } = useEmployees();

  const [schedule, setSchedule] = useState('FIXED');

  const [valueRole, setValueRole] = useState('');

  const [time, setTime] = useState<string>(''); // Хранит строку вроде "18:30"

  const handleCreateEmployee = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    // const formData = new FormData(event.currentTarget);
    // const payload = FORM_EMPLOYEE.map((value) => ({
    //   [value.name]: formData.get(value.name),
    // }));
    // mutationCreateEmploeeyDirect.mutateAsync({
    //   firstName: 'Иван',
    //   lastName: 'Петров',
    //   patronymic: 'Иванович',
    //   password: '123456',
    //   positionId: 1,
    //   gradeId: 2,
    //   scheduleType: 'FIXED',
    //   startTime: '09:00',
    //   endTime: '18:00',
    // });
    console.log('payload', { role: valueRole, ...payload });
  };

  const handleWorkNeed = (value: string) => {
    console.log(value);
  };

  console.log('schedule', schedule);

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
        <RadioGroup
          name="scheduleType"
          label="График работы"
          options={SCHEDULE_OPTIONS}
          value={schedule}
          onChange={setSchedule}
        />
        {schedule === 'FLEXIBLE' && (
          <>
            <TimePicker
              label="Время начала"
              value={time}
              onChange={setTime}
              minuteStep={15} // Шаг выбора минут кратен 15 (00, 15, 30, 45)
            />
          </>
        )}
        <Button type="submit">принять на работу</Button>
      </Flex>
    </form>
  );
};
