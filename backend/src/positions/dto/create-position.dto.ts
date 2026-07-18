import { Role } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreatePositionDto {
  @IsString()
  name: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  ratePerTraining?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  salesCommission?: number;
}
