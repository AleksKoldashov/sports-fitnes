import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateGradeDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  baseSalary: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  bonusRate?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
