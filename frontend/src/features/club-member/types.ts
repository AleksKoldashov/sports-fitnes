import { TRole } from '@/shared';
import { IPagination } from '@/shared/types/IPagination';

export interface IClubMember {
  id: number;
  userId: number;
  email: string;
  role: TRole;
  firstName: string;
  lastName: string;
  patronymic: string | null; // отчество часто бывает опциональным
  age: number | null; // возраст может быть не указан
  phone: string | null;
  vk: string | null;
  telegram: string | null;
  fitnessLevel: string | null; // уровень подготовки (например, 'BEGINNER', 'ADVANCED')
  nutritionPlan: string | null; // план питания (json строка, текст или id плана)
  membershipStatus: string; // статус абонемента ('ACTIVE', 'EXPIRED', 'FROZEN')
  membershipExpiresAt: string | null; // дата окончания абонемента (Date или string, если из JSON)
  trainerId: string | null; // ID привязанного тренера
  trainerName: string | null; // ФИО тренера одной строкой
  avatarUrl: string | null; // ссылка на аватарку
  name: string;
}

export interface IClubMemberResponse {
  data: IClubMember[];
  pagination: IPagination;
}
