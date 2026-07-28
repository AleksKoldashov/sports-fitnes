import { ROLE_REDIRECTS as ROLE_REDIRECTS_MAP } from '@shared/config/roles';

export const AUTH_STORAGE_KEY = 'auth-storage';

export const AUTH_ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  ADMIN: '/admin',
  TRAINER: '/trainer/dashboard',
  MANAGER: '/manager/dashboard',
  CLUB_MEMBER: '/club-member',
} as const;

export const ROLE_REDIRECTS = ROLE_REDIRECTS_MAP;
