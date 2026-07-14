import { ROLES } from '@/shared';

// Используем квадратные скобки вокруг свойства ROLES.DIRECTOR
export const NAVIGATION = {
  [ROLES.DIRECTOR]: [
    { path: '/admin', label: 'Главная', icon: '📊' },
    { path: 'workouts', label: 'Сотрудники', icon: '💪' },
    { path: '/admin/setting', label: 'Настройки', icon: '⚙️' },
  ],
  [ROLES.CLUB_MEMBER]: [
    { path: 'dashboard', label: 'Главная', icon: '📊' },
    { path: 'workouts', label: 'Тренировки', icon: '💪' },
    { path: 'nutrition', label: 'План питания', icon: '🍏' },
    { path: 'analytics', label: 'Статистика', icon: '📈' },
    { path: 'settings', label: 'Настройки', icon: '⚙️' },
  ],
  [ROLES.TRAINER]: [
    { path: 'dashboard', label: 'Главная', icon: '📊' },
    { path: 'workouts', label: 'Тренировки', icon: '💪' },
    { path: 'nutrition', label: 'План питания', icon: '🍏' },
    { path: 'analytics', label: 'Статистика', icon: '📈' },
    { path: 'settings', label: 'Настройки', icon: '⚙️' },
  ],
  [ROLES.MANAGER]: [
    { path: 'dashboard', label: 'Главная', icon: '📊' },
    { path: 'workouts', label: 'Тренировки', icon: '💪' },
    { path: 'nutrition', label: 'План питания', icon: '🍏' },
    { path: 'analytics', label: 'Статистика', icon: '📈' },
    { path: 'settings', label: 'Настройки', icon: '⚙️' },
  ],
  [ROLES.HR]: [
    { path: 'dashboard', label: 'Главная', icon: '📊' },
    { path: 'workouts', label: 'Тренировки', icon: '💪' },
    { path: 'nutrition', label: 'План питания', icon: '🍏' },
    { path: 'analytics', label: 'Статистика', icon: '📈' },
    { path: 'settings', label: 'Настройки', icon: '⚙️' },
  ],
};

export const PROFIL = {
  [ROLES.DIRECTOR]: 'Директор',
  [ROLES.CLUB_MEMBER]: 'Член клуба',
  [ROLES.TRAINER]: 'Тренер',
  [ROLES.MANAGER]: 'Менеджер',
  [ROLES.HR]: 'HR',
};
