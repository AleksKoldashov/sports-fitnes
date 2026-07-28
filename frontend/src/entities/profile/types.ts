import { TRole } from '@/shared/config';

export interface IClubMemberProfile {
  id: number;
  firstName: string;
  lastName: string;
  patronymic?: string;
  age: number;
  phone?: string;
  vk?: string;
  telegram?: string;
  fitnessLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'PRO';
  nutritionPlan?: string;
  membershipStatus?: 'TRIAL' | 'ACTIVE' | 'EXPIRED';
  membershipExpiresAt?: string;
  trainerId?: number;
}

export interface IDirectorProfile {
  id: number;
  firstName: string;
  lastName: string;
  patronymic?: string;
}

export interface IHrProfile {
  id: number;
  firstName: string;
  lastName: string;
  patronymic?: string;
  phone?: string;
  isActive: boolean;
}

export interface ITrainerProfile {
  id: number;
  firstName: string;
  lastName: string;
  patronymic?: string;
  specialty: string;
  experience: number;
  rating?: number;
  isActive: boolean;
}

export type TPersonCard =
  | IClubMemberProfile
  | ITrainerProfile
  | IHrProfile
  | IDirectorProfile;

export interface IProfileResponse {
  id: number;
  email: string;
  role: TRole;
  createdAt: string;
  updatedAt: string;
  person_card: TPersonCard;
}
