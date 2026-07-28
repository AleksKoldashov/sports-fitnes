import { TRole } from '@/shared/config';

export interface Employee {
  id: string;
  name: string;
  role: string;
  createdAt: string;
  details: any;
}

export interface IEmployeesResponse {
  id: number;
  email: string;
  role: TRole;
  createdAt: string;
  updatedAt: string;
  profile: ProfileEmployee;
}

export interface ProfileEmployee {
  firstName: string;
  lastName: string;
  patronymic: string;
  specialty?: string;
  experience?: number;
  phone?: string;
}

// 1. Описываем структуру одного рабочего дня для гибкого графика
export interface DaySchedule {
  start: string; // Формат "ЧЧ:ММ"
  end: string; // Формат "ЧЧ:ММ"
  isDayOff: boolean; // Флаг выходного дня
}

// 2. Описываем структуру полной недели
export interface WeeklySchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

// 3. Базовые поля, которые есть у любого сотрудника при создании
interface BaseEmployeeData {
  firstName: string;
  lastName: string;
  patronymic: string | null;
  password: string;
  positionId: number;
  gradeId: number;
}

// 4. Вариант 1: Фиксированный график (как у Ивана)
interface FixedEmployeeDto extends BaseEmployeeData {
  scheduleType: 'FIXED';
  startTime: string;
  endTime: string;
  workSchedule?: null; // Поля по дням недели тут быть не должно
}

// 5. Вариант 2: Гибкий график (как у Анны)
interface FlexibleEmployeeDto extends BaseEmployeeData {
  scheduleType: 'FLEXIBLE';
  workSchedule: WeeklySchedule;
  startTime?: null; // Общего времени старта тут нет
  endTime?: null;
}

// 6. Финальный тип, который автоматически переключает проверку полей в зависимости от scheduleType
export type ICreateEmployeePayload = FixedEmployeeDto | FlexibleEmployeeDto;
