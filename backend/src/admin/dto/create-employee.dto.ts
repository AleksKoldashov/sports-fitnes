import { Role } from '@prisma/client';

// создания сотрудника (прямое создание)
export class CreateEmployeeDto {
  email: string;
  password: string;
  role: Role; // TRAINER, MANAGER, HR, DIRECTOR
  firstName: string;
  lastName: string;
  patronymic?: string;

  // Поля для тренера
  specialty?: string;
  experience?: number;

  // Поля для менеджера
  department?: string;
  phone?: string;

  // Поля для HR
  phoneHr?: string;

  // Поля для директора (пусто, только ФИО)
}
