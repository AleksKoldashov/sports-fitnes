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
