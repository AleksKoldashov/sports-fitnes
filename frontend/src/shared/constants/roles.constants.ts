import type { TRole } from '@shared/types/TRole';

export const ROLES = {
  CLUB_MEMBER: 'CLUB_MEMBER' as const,
  TRAINER: 'TRAINER' as const,
  MANAGER: 'MANAGER' as const,
  HR: 'HR' as const,
  DIRECTOR: 'DIRECTOR' as const,
} as const satisfies Record<TRole, TRole>;

export const ROLE_REDIRECTS: Record<TRole, string> = {
  CLUB_MEMBER: '/club-member',
  TRAINER: '/trainer/dashboard',
  MANAGER: '/manager/dashboard',
  HR: '/admin',
  DIRECTOR: '/admin',
};
