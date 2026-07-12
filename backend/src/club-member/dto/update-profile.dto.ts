import { FitnessLevel } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  // Если передаётся userId, то обновляем профиль этого пользователя
  @IsOptional()
  @IsNumber()
  userId?: number;

  // Поля для обновления
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  vk?: string;

  @IsOptional()
  @IsString()
  telegram?: string;

  @IsOptional()
  @IsEnum(FitnessLevel)
  fitnessLevel?: FitnessLevel;

  @IsOptional()
  @IsString()
  nutritionPlan?: string;
}
