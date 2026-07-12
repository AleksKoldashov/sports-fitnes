import { FitnessLevel } from '@prisma/client';
export declare class UpdateProfileDto {
    userId?: number;
    phone?: string;
    vk?: string;
    telegram?: string;
    fitnessLevel?: FitnessLevel;
    nutritionPlan?: string;
}
