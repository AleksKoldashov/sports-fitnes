import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString, Min } from 'class-validator';

export class CreateEmployeeDto {
  // Личные данные
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  patronymic?: string;

  // @IsEmail()
  // email: string;

  @IsString()
  password: string;

  // Должность и грейд
  @IsNumber()
  @Type(() => Number) // <-- преобразуем строку в число
  positionId: number;

  @IsNumber()
  @Type(() => Number) // <-- преобразуем строку в число
  gradeId: number;

  // Зарплата (опционально)
  @IsOptional()
  @IsNumber()
  @Min(0)
  currentSalary?: number;

  // График работы
  @IsString()
  scheduleType: 'FIXED' | 'FLEXIBLE';

  // Для FIXED: просто время
  @IsOptional()
  @IsString()
  startTime?: string; // "09:00"

  @IsOptional()
  @IsString()
  endTime?: string; // "18:00"

  // Для FLEXIBLE: детальный график по дням
  @IsOptional()
  @IsObject()
  workSchedule?: {
    monday?: { start: string; end: string; isDayOff: boolean };
    tuesday?: { start: string; end: string; isDayOff: boolean };
    wednesday?: { start: string; end: string; isDayOff: boolean };
    thursday?: { start: string; end: string; isDayOff: boolean };
    friday?: { start: string; end: string; isDayOff: boolean };
    saturday?: { start: string; end: string; isDayOff: boolean };
    sunday?: { start: string; end: string; isDayOff: boolean };
  };
}
