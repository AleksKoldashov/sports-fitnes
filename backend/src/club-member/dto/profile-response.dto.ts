export class ProfileResponseDto {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  age: number;
  phone?: string;
  vk?: string;
  telegram?: string;
  fitnessLevel?: string;
  nutritionPlan?: string;
  membershipStatus?: string;
  membershipExpiresAt?: Date;
  trainerId?: number;
  trainerName?: string;
}
