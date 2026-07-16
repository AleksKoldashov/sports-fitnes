import { DetailEmployee } from '@/features/employees/ui/DetailEmployee';
import { texts } from '@/shared';
import { TableColumn } from '@/ui';
import { Employee } from '../types';

export const COLUMNS_EMPLOYEES: TableColumn<Employee>[] = [
  {
    key: 'name',
    title: texts.title.fioEmployee,
  },
  {
    key: 'role',
    title: texts.title.role,
  },
  {
    key: 'createdAt',
    title: texts.title.dateAdded,
  },
  {
    key: 'actions', // Для кнопок можно указать любой уникальный ключ, которого нет в данных
    title: texts.title.details,
    // Кастомный рендер: выводим интерактивную кнопку действия
    render: (_, record) => <DetailEmployee employee={record} />,
  },
];
