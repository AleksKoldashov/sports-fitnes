import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  email: string;

  @IsEnum(Role)
  role: Role;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  patronymic?: string;

  // ✅ Добавляем должность и грейд
  @IsNumber()
  @Type(() => Number)
  positionId: number;

  @IsNumber()
  @Type(() => Number)
  gradeId: number;

  // Поля для тренера
  @IsOptional()
  @IsString()
  specialty?: string;

  @IsOptional()
  @IsNumber()
  experience?: number;

  // Поля для менеджера
  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
