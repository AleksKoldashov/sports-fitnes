import { texts } from '@/shared';
import { Avatar, TableColumn } from '@/ui';
import { FITNESS_LEVEL_LABELS } from '../const';
import { IClubMember } from '../types';
import { DetailClubMember } from '../ui/DetailClubMember';

export const COLUMNS_CLUB_MEMBERS: TableColumn<IClubMember>[] = [
  {
    key: 'avatarUrl',
    title: texts.title.avatar,
    // `url` автоматически станет типом `string | null` (взят из поля avatarUrl объекта record)
    // `record` станет строго типом `ClubMemberItem`
    render: (url, record) => (
      <Avatar src={url || undefined} alt={record.name} />
    ),
  },
  {
    key: 'name',
    title: texts.title.fioEmployee,
  },
  {
    key: 'fitnessLevel',
    title: texts.title.fitnessLevel,
    render: (fitnessLevel) => <>{FITNESS_LEVEL_LABELS[fitnessLevel]}</>,
  },
  {
    key: 'age',
    title: texts.title.dateAdded,
  },
  {
    key: 'actions', // Для кнопок можно указать любой уникальный ключ, которого нет в данных
    title: texts.title.details,
    // Кастомный рендер: выводим интерактивную кнопку действия
    render: (_, record) => <DetailClubMember clubMember={record} />,
  },
];
